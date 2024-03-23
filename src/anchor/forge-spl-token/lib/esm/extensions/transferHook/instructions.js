import { struct, u8 } from '@solana/buffer-layout';
import { TransactionInstruction } from '@solana/web3.js';
import { programSupportsExtensions, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '../../constants.js';
import { TokenUnsupportedInstructionError } from '../../errors.js';
import { addSigners } from '../../instructions/internal.js';
import { TokenInstruction } from '../../instructions/types.js';
import { publicKey } from '@solana/buffer-layout-utils';
import { createTransferCheckedInstruction } from '../../instructions/transferChecked.js';
import { createTransferCheckedWithFeeInstruction } from '../transferFee/instructions.js';
import { getMint } from '../../state/mint.js';
import { getExtraAccountMetaAddress, getExtraAccountMetas, getTransferHook, resolveExtraAccountMeta } from './state.js';
export var TransferHookInstruction;
(function (TransferHookInstruction) {
    TransferHookInstruction[TransferHookInstruction["Initialize"] = 0] = "Initialize";
    TransferHookInstruction[TransferHookInstruction["Update"] = 1] = "Update";
})(TransferHookInstruction || (TransferHookInstruction = {}));
/** The struct that represents the instruction data as it is read by the program */
export const initializeTransferHookInstructionData = struct([
    u8('instruction'),
    u8('transferHookInstruction'),
    publicKey('authority'),
    publicKey('transferHookProgramId'),
]);
/**
 * Construct an InitializeTransferHook instruction
 *
 * @param mint                  Token mint account
 * @param authority             Transfer hook authority account
 * @param transferHookProgramId Transfer hook program account
 * @param programId             SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
export function createInitializeTransferHookInstruction(mint, authority, transferHookProgramId, programId) {
    if (!programSupportsExtensions(programId)) {
        throw new TokenUnsupportedInstructionError();
    }
    const keys = [{ pubkey: mint, isSigner: false, isWritable: true }];
    const data = Buffer.alloc(initializeTransferHookInstructionData.span);
    initializeTransferHookInstructionData.encode({
        instruction: TokenInstruction.TransferHookExtension,
        transferHookInstruction: TransferHookInstruction.Initialize,
        authority,
        transferHookProgramId,
    }, data);
    return new TransactionInstruction({ keys, programId, data });
}
/** The struct that represents the instruction data as it is read by the program */
export const updateTransferHookInstructionData = struct([
    u8('instruction'),
    u8('transferHookInstruction'),
    publicKey('transferHookProgramId'),
]);
/**
 * Construct an UpdateTransferHook instruction
 *
 * @param mint                  Mint to update
 * @param authority             The mint's transfer hook authority
 * @param transferHookProgramId The new transfer hook program account
 * @param signers               The signer account(s) for a multisig
 * @param tokenProgramId        SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
export function createUpdateTransferHookInstruction(mint, authority, transferHookProgramId, multiSigners = [], programId = TOKEN_2022_PROGRAM_ID) {
    if (!programSupportsExtensions(programId)) {
        throw new TokenUnsupportedInstructionError();
    }
    const keys = addSigners([{ pubkey: mint, isSigner: false, isWritable: true }], authority, multiSigners);
    const data = Buffer.alloc(updateTransferHookInstructionData.span);
    updateTransferHookInstructionData.encode({
        instruction: TokenInstruction.TransferHookExtension,
        transferHookInstruction: TransferHookInstruction.Update,
        transferHookProgramId,
    }, data);
    return new TransactionInstruction({ keys, programId, data });
}
function deEscalateAccountMeta(accountMeta, accountMetas) {
    const maybeHighestPrivileges = accountMetas
        .filter((x) => x.pubkey === accountMeta.pubkey)
        .reduce((acc, x) => {
        if (!acc)
            return { isSigner: x.isSigner, isWritable: x.isWritable };
        return { isSigner: acc.isSigner || x.isSigner, isWritable: acc.isWritable || x.isWritable };
    }, undefined);
    if (maybeHighestPrivileges) {
        const { isSigner, isWritable } = maybeHighestPrivileges;
        if (!isSigner && isSigner !== accountMeta.isSigner) {
            accountMeta.isSigner = false;
        }
        if (!isWritable && isWritable !== accountMeta.isWritable) {
            accountMeta.isWritable = false;
        }
    }
    return accountMeta;
}
/**
 * Add extra accounts needed for transfer hook to an instruction
 *
 * @param connection      Connection to use
 * @param instruction     The transferChecked instruction to add accounts to
 * @param commitment      Commitment to use
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
export async function addExtraAccountsToInstruction(connection, instruction, mint, commitment, programId = TOKEN_PROGRAM_ID) {
    if (!programSupportsExtensions(programId)) {
        throw new TokenUnsupportedInstructionError();
    }
    const mintInfo = await getMint(connection, mint, commitment, programId);
    const transferHook = getTransferHook(mintInfo);
    if (transferHook == null) {
        return instruction;
    }
    const extraAccountsAccount = getExtraAccountMetaAddress(mint, transferHook.programId);
    const extraAccountsInfo = await connection.getAccountInfo(extraAccountsAccount, commitment);
    if (extraAccountsInfo == null) {
        return instruction;
    }
    const extraAccountMetas = getExtraAccountMetas(extraAccountsInfo);
    const accountMetas = instruction.keys;
    for (const extraAccountMeta of extraAccountMetas) {
        const accountMetaUnchecked = await resolveExtraAccountMeta(connection, extraAccountMeta, accountMetas, instruction.data, transferHook.programId);
        const accountMeta = deEscalateAccountMeta(accountMetaUnchecked, accountMetas);
        accountMetas.push(accountMeta);
    }
    accountMetas.push({ pubkey: transferHook.programId, isSigner: false, isWritable: false });
    accountMetas.push({ pubkey: extraAccountsAccount, isSigner: false, isWritable: false });
    return new TransactionInstruction({ keys: accountMetas, programId, data: instruction.data });
}
/**
 * Construct an transferChecked instruction with extra accounts for transfer hook
 *
 * @param connection            Connection to use
 * @param source                Source account
 * @param mint                  Mint to update
 * @param destination           Destination account
 * @param authority             The mint's transfer hook authority
 * @param amount                The amount of tokens to transfer
 * @param decimals              Number of decimals in transfer amount
 * @param multiSigners          The signer account(s) for a multisig
 * @param commitment            Commitment to use
 * @param programId             SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
export async function createTransferCheckedWithTransferHookInstruction(connection, source, mint, destination, authority, amount, decimals, multiSigners = [], commitment, programId = TOKEN_PROGRAM_ID) {
    const rawInstruction = createTransferCheckedInstruction(source, mint, destination, authority, amount, decimals, multiSigners, programId);
    const hydratedInstruction = await addExtraAccountsToInstruction(connection, rawInstruction, mint, commitment, programId);
    return hydratedInstruction;
}
/**
 * Construct an transferChecked instruction with extra accounts for transfer hook
 *
 * @param connection            Connection to use
 * @param source                Source account
 * @param mint                  Mint to update
 * @param destination           Destination account
 * @param authority             The mint's transfer hook authority
 * @param amount                The amount of tokens to transfer
 * @param decimals              Number of decimals in transfer amount
 * @param fee                   The calculated fee for the transfer fee extension
 * @param multiSigners          The signer account(s) for a multisig
 * @param commitment            Commitment to use
 * @param programId             SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
export async function createTransferCheckedWithFeeAndTransferHookInstruction(connection, source, mint, destination, authority, amount, decimals, fee, multiSigners = [], commitment, programId = TOKEN_PROGRAM_ID) {
    const rawInstruction = createTransferCheckedWithFeeInstruction(source, mint, destination, authority, amount, decimals, fee, multiSigners, programId);
    const hydratedInstruction = await addExtraAccountsToInstruction(connection, rawInstruction, mint, commitment, programId);
    return hydratedInstruction;
}
//# sourceMappingURL=instructions.js.map