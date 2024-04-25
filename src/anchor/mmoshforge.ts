export type Mmoshforge = {
  "version": "0.1.0",
  "name": "mmoshforge",
  "instructions": [
    {
      "name": "initMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MainStateInput"
          }
        }
      ]
    },
    {
      "name": "updateMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MainStateInput"
          }
        }
      ]
    },
    {
      "name": "updateMainStateOwner",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setCommonLut",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lut",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "resetMain",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createCollection",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentCollection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "collectionType",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateCollection",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentCollection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintGenesisProfile",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "subCollectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MintProfileByAdminInput"
          }
        }
      ]
    },
    {
      "name": "projectDistribution",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "grandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ggreatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "passDistribution",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "project",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "grandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ggreatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "profileDistribution",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "grandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ggreatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintProfileByAt",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userActivationTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentProfile",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uriHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintGenesisPass",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentMainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uriHash",
          "type": "string"
        },
        {
          "name": "input",
          "type": {
            "defined": "MainStateInput"
          }
        }
      ]
    },
    {
      "name": "mintPassByAt",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userActivationTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "project",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentMainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentProfile",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uriHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "initActivationToken",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userActivationTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "activationTokenState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationTokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileCollectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintActivationToken",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "minterProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationTokenState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "grandParentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ggreateGrandParentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "genesisProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentProfileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "grandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ggreatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initPassToken",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userActivationTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "project",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentMainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "activationTokenState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationTokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileCollectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "createPassToken",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "minterProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "project",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationTokenState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeSolStorageV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitializeSolStorageV0Args"
          }
        }
      ]
    },
    {
      "name": "buyWrappedSolV0",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "BuyWrappedSolV0Args"
          }
        }
      ]
    },
    {
      "name": "sellWrappedSolV0",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "SellWrappedSolV0Args"
          }
        }
      ]
    },
    {
      "name": "createCurveV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "curve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateCurveV0Args"
          }
        }
      ]
    },
    {
      "name": "initializeTokenBondingV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "curve",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "targetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "baseStorage",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyBaseRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyTargetRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellBaseRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellTargetRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitializeTokenBondingV0Args"
          }
        }
      ]
    },
    {
      "name": "closeTokenBondingV0",
      "accounts": [
        {
          "name": "refund",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "generalAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "targetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferReservesV0",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserveAuthority",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "TransferReservesV0Args"
          }
        }
      ]
    },
    {
      "name": "transferReservesNativeV0",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserveAuthority",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "TransferReservesV0Args"
          }
        }
      ]
    },
    {
      "name": "updateReserveAuthorityV0",
      "accounts": [
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveAuthority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateReserveAuthorityV0Args"
          }
        }
      ]
    },
    {
      "name": "updateCurveV0",
      "accounts": [
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "curveAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "curve",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateCurveV0Args"
          }
        }
      ]
    },
    {
      "name": "updateTokenBondingV0",
      "accounts": [
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "generalAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "targetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyBaseRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyTargetRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellBaseRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellTargetRoyalties",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateTokenBondingV0Args"
          }
        }
      ]
    },
    {
      "name": "buyV1",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "curve",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "targetMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "buyBaseRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "destination",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "buyTargetRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "clock",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceAuthority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "BuyV0Args"
          }
        }
      ]
    },
    {
      "name": "buyNativeV0",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "curve",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "targetMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "buyBaseRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "destination",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "buyTargetRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "clock",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "BuyV0Args"
          }
        }
      ]
    },
    {
      "name": "sellV1",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "curve",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "targetMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "sellBaseRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "source",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "sourceAuthority",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "sellTargetRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "clock",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "SellV0Args"
          }
        }
      ]
    },
    {
      "name": "sellNativeV0",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "curve",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "targetMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "sellBaseRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "source",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "sourceAuthority",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "sellTargetRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "clock",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "SellV0Args"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "mainState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "oposToken",
            "type": "publicKey"
          },
          {
            "name": "profileMintingCost",
            "type": "u64"
          },
          {
            "name": "invitationMintingCost",
            "type": "u64"
          },
          {
            "name": "mintingCostDistribution",
            "type": {
              "defined": "MintingCostDistribution"
            }
          },
          {
            "name": "tradingPriceDistribution",
            "type": {
              "defined": "TradingPriceDistribution"
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "totalMintedProfile",
            "type": "u64"
          },
          {
            "name": "profileCollection",
            "type": "publicKey"
          },
          {
            "name": "genesisProfile",
            "type": "publicKey"
          },
          {
            "name": "commonLut",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "activationTokenState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "parentProfile",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "collectionState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "genesisProfile",
            "type": "publicKey"
          },
          {
            "name": "collectionId",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "programStateV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wrappedSolMint",
            "type": "publicKey"
          },
          {
            "name": "solStorage",
            "type": "publicKey"
          },
          {
            "name": "mintAuthorityBumpSeed",
            "type": "u8"
          },
          {
            "name": "solStorageBumpSeed",
            "type": "u8"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "curveV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "definition",
            "type": {
              "defined": "PiecewiseCurve"
            }
          }
        ]
      }
    },
    {
      "name": "tokenBondingV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "targetMint",
            "type": "publicKey"
          },
          {
            "name": "generalAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "reserveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "curveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "baseStorage",
            "type": "publicKey"
          },
          {
            "name": "buyBaseRoyalties",
            "type": "publicKey"
          },
          {
            "name": "buyTargetRoyalties",
            "type": "publicKey"
          },
          {
            "name": "sellBaseRoyalties",
            "type": "publicKey"
          },
          {
            "name": "sellTargetRoyalties",
            "type": "publicKey"
          },
          {
            "name": "buyBaseRoyaltyPercentage",
            "docs": [
              "Percentage of purchases that go to royalties",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100"
            ],
            "type": "u32"
          },
          {
            "name": "buyTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellBaseRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "curve",
            "docs": [
              "The bonding curve to use"
            ],
            "type": "publicKey"
          },
          {
            "name": "mintCap",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "purchaseCap",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "goLiveUnixTime",
            "type": "i64"
          },
          {
            "name": "freezeBuyUnixTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "createdAtUnixTime",
            "type": "i64"
          },
          {
            "name": "buyFrozen",
            "type": "bool"
          },
          {
            "name": "sellFrozen",
            "type": "bool"
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          },
          {
            "name": "baseStorageBumpSeed",
            "type": "u8"
          },
          {
            "name": "targetMintAuthorityBumpSeed",
            "type": "u8"
          },
          {
            "name": "baseStorageAuthorityBumpSeed",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "reserveBalanceFromBonding",
            "type": "u64"
          },
          {
            "name": "supplyFromBonding",
            "type": "u64"
          },
          {
            "name": "ignoreExternalReserveChanges",
            "docs": [
              "Whether or not to ignore changes to base storage and target supply outside of the curve"
            ],
            "type": "bool"
          },
          {
            "name": "ignoreExternalSupplyChanges",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "profileState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lineage",
            "type": {
              "defined": "LineageInfo"
            }
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "activationToken",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "totalMintedSft",
            "type": "u64"
          },
          {
            "name": "totalMintedOffers",
            "type": "u64"
          },
          {
            "name": "lut",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MainStateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileMintingCost",
            "type": "u64"
          },
          {
            "name": "invitationMintingCost",
            "type": "u64"
          },
          {
            "name": "oposToken",
            "type": "publicKey"
          },
          {
            "name": "mintingCostDistribution",
            "type": {
              "defined": "MintingCostDistribution"
            }
          },
          {
            "name": "tradingPriceDistribution",
            "type": {
              "defined": "TradingPriceDistribution"
            }
          }
        ]
      }
    },
    {
      "name": "BuyWithBaseV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "minimumTargetAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BuyTargetAmountV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "maximumPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BuyV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyWithBase",
            "type": {
              "option": {
                "defined": "BuyWithBaseV0Args"
              }
            }
          },
          {
            "name": "buyTargetAmount",
            "type": {
              "option": {
                "defined": "BuyTargetAmountV0Args"
              }
            }
          }
        ]
      }
    },
    {
      "name": "BuyWrappedSolV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CreateCurveV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "definition",
            "type": {
              "defined": "PiecewiseCurve"
            }
          }
        ]
      }
    },
    {
      "name": "InitializeSolStorageV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintAuthorityBumpSeed",
            "type": "u8"
          },
          {
            "name": "solStorageBumpSeed",
            "type": "u8"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "InitializeTokenBondingV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyBaseRoyaltyPercentage",
            "docs": [
              "Percentage of purchases that go to the founder",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100"
            ],
            "type": "u32"
          },
          {
            "name": "buyTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellBaseRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "goLiveUnixTime",
            "type": "i64"
          },
          {
            "name": "freezeBuyUnixTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "mintCap",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "purchaseCap",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "generalAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "reserveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "curveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "buyFrozen",
            "type": "bool"
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          },
          {
            "name": "sellFrozen",
            "type": "bool"
          },
          {
            "name": "ignoreExternalReserveChanges",
            "docs": [
              "Whether or not to ignore changes to base storage and target supply outside of the curve"
            ],
            "type": "bool"
          },
          {
            "name": "ignoreExternalSupplyChanges",
            "type": "bool"
          },
          {
            "name": "initialReservesPad",
            "docs": [
              "* Allow starting a curve from a later reserve/supply ratio of ignor reserve and supply changes.\n   *\n   * This allows for things like the LBC where you don't need to provide any initial liquidity"
            ],
            "type": "u64"
          },
          {
            "name": "initialSupplyPad",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "minimumPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellWrappedSolV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "all",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "TransferReservesV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateCurveV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "curveAuthority",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateReserveAuthorityV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newReserveAuthority",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateTokenBondingV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "generalAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "buyBaseRoyaltyPercentage",
            "docs": [
              "Percentage of purchases that go to the founder",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100"
            ],
            "type": "u32"
          },
          {
            "name": "buyTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellBaseRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "buyFrozen",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "TimeCurveV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "offset",
            "type": "i64"
          },
          {
            "name": "curve",
            "type": {
              "defined": "PrimitiveCurve"
            }
          },
          {
            "name": "buyTransitionFees",
            "type": {
              "option": {
                "defined": "TransitionFeeV0"
              }
            }
          },
          {
            "name": "sellTransitionFees",
            "type": {
              "option": {
                "defined": "TransitionFeeV0"
              }
            }
          }
        ]
      }
    },
    {
      "name": "TransitionFeeV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "percentage",
            "type": "u32"
          },
          {
            "name": "interval",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "LineageInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "parent",
            "type": "publicKey"
          },
          {
            "name": "grandParent",
            "type": "publicKey"
          },
          {
            "name": "greatGrandParent",
            "type": "publicKey"
          },
          {
            "name": "ggreatGrandParent",
            "type": "publicKey"
          },
          {
            "name": "generation",
            "type": "u64"
          },
          {
            "name": "totalChild",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "MintingCostDistribution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "parent",
            "type": "u16"
          },
          {
            "name": "grandParent",
            "type": "u16"
          },
          {
            "name": "greatGrandParent",
            "type": "u16"
          },
          {
            "name": "ggreatGrandParent",
            "type": "u16"
          },
          {
            "name": "genesis",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "TradingPriceDistribution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seller",
            "type": "u16"
          },
          {
            "name": "parent",
            "type": "u16"
          },
          {
            "name": "grandParent",
            "type": "u16"
          },
          {
            "name": "greatGrandParent",
            "type": "u16"
          },
          {
            "name": "genesis",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "MintProfileByAdminInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "lineage",
            "type": {
              "defined": "LineageInfo"
            }
          },
          {
            "name": "parentMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "MintPassByAtInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uriHash",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "MintProfileByAtInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uriHash",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "PrimitiveCurve",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ExponentialCurveV0",
            "fields": [
              {
                "name": "c",
                "type": "u128"
              },
              {
                "name": "b",
                "type": "u128"
              },
              {
                "name": "pow",
                "type": "u8"
              },
              {
                "name": "frac",
                "type": "u8"
              }
            ]
          },
          {
            "name": "TimeDecayExponentialCurveV0",
            "fields": [
              {
                "name": "c",
                "type": "u128"
              },
              {
                "name": "k1",
                "type": "u128"
              },
              {
                "name": "k0",
                "type": "u128"
              },
              {
                "name": "interval",
                "type": "u32"
              },
              {
                "name": "d",
                "type": "u128"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "PiecewiseCurve",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TimeV0",
            "fields": [
              {
                "name": "curves",
                "type": {
                  "vec": {
                    "defined": "TimeCurveV0"
                  }
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "MyError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "FirstError"
          },
          {
            "name": "AlreadySet"
          },
          {
            "name": "OnlyOwnerCanCall"
          },
          {
            "name": "UnknownNft"
          },
          {
            "name": "InvalidNftHolder"
          },
          {
            "name": "GenesisNftAlreadyMinted"
          },
          {
            "name": "ActivationTokenNotFound"
          },
          {
            "name": "ActivationTokenAlreadyInitialize"
          },
          {
            "name": "OnlyProfileHolderAllow"
          },
          {
            "name": "NotEnoughTokenToMint"
          },
          {
            "name": "ProfileIdMissMatch"
          }
        ]
      }
    },
    {
      "name": "InnerUint",
      "type": {
        "kind": "alias",
        "value": "u128"
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NoMintAuthority",
      "msg": "Target mint must have an authority"
    },
    {
      "code": 6001,
      "name": "InvalidMintAuthority",
      "msg": "Target mint must have an authority that is a pda of this program"
    },
    {
      "code": 6002,
      "name": "InvalidBaseStorageAuthority",
      "msg": "Invalid base storage authority pda or seed did not match canonical seed for base storage authority"
    },
    {
      "code": 6003,
      "name": "NoAuthority",
      "msg": "Token bonding does not have an authority"
    },
    {
      "code": 6004,
      "name": "ArithmeticError",
      "msg": "Error in precise number arithmetic"
    },
    {
      "code": 6005,
      "name": "PriceTooHigh",
      "msg": "Buy price was higher than the maximum buy price. Try increasing max_price or slippage configuration"
    },
    {
      "code": 6006,
      "name": "PriceTooLow",
      "msg": "Sell price was lower than the minimum sell price. Try decreasing min_price or increasing slippage configuration"
    },
    {
      "code": 6007,
      "name": "MintSupplyTooLow",
      "msg": "Cannot sell more than the target mint currently has in supply"
    },
    {
      "code": 6008,
      "name": "SellDisabled",
      "msg": "Sell is not enabled on this bonding curve"
    },
    {
      "code": 6009,
      "name": "NotLiveYet",
      "msg": "This bonding curve is not live yet"
    },
    {
      "code": 6010,
      "name": "PassedMintCap",
      "msg": "Passed the mint cap"
    },
    {
      "code": 6011,
      "name": "OverPurchaseCap",
      "msg": "Cannot purchase that many tokens because of purchase cap"
    },
    {
      "code": 6012,
      "name": "BuyFrozen",
      "msg": "Buy is frozen on this bonding curve, purchases not allowed"
    },
    {
      "code": 6013,
      "name": "WrappedSolNotAllowed",
      "msg": "Use token bonding wrapped sol via buy_wrapped_sol, sell_wrapped_sol commands. We may one day provide liquid staking rewards on this stored sol."
    },
    {
      "code": 6014,
      "name": "InvalidCurve",
      "msg": "The provided curve is invalid"
    },
    {
      "code": 6015,
      "name": "InvalidMint",
      "msg": "An account was provided that did not have the correct mint"
    },
    {
      "code": 6016,
      "name": "IgnoreExternalV1Only",
      "msg": "Ignoring external changes is only supported on v1 of buy and sell endpoints. Please upgrade your client"
    },
    {
      "code": 6017,
      "name": "InvalidPad",
      "msg": "Cannot pad token bonding without ignoring external reserve and supply changes. This is an advanced feature, incorrect use could lead to insufficient resreves to cover sells"
    }
  ]
};

export const IDL: Mmoshforge = {
  "version": "0.1.0",
  "name": "mmoshforge",
  "instructions": [
    {
      "name": "initMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MainStateInput"
          }
        }
      ]
    },
    {
      "name": "updateMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MainStateInput"
          }
        }
      ]
    },
    {
      "name": "updateMainStateOwner",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setCommonLut",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lut",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "resetMain",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createCollection",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentCollection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "collectionType",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateCollection",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentCollection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintGenesisProfile",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "subCollectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MintProfileByAdminInput"
          }
        }
      ]
    },
    {
      "name": "projectDistribution",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "grandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ggreatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "passDistribution",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "project",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "grandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ggreatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "profileDistribution",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "grandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ggreatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintProfileByAt",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userActivationTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentProfile",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uriHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintGenesisPass",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentMainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uriHash",
          "type": "string"
        },
        {
          "name": "input",
          "type": {
            "defined": "MainStateInput"
          }
        }
      ]
    },
    {
      "name": "mintPassByAt",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userActivationTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "project",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentMainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentProfile",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uriHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "initActivationToken",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userActivationTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "activationTokenState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationTokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileCollectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintActivationToken",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "minterProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationTokenState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "grandParentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ggreateGrandParentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "genesisProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "parentProfileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oposToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolderAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGgreatGrandParentProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentGenesisProfileHolder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "grandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "greatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ggreatGrandParentProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisProfileHolderOposAta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initPassToken",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userActivationTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "project",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentMainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "activationTokenState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationTokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profileCollectionAuthorityRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "parentCollectionEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "createPassToken",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "minterProfileAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "project",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "activationTokenState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "profileState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeSolStorageV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitializeSolStorageV0Args"
          }
        }
      ]
    },
    {
      "name": "buyWrappedSolV0",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "BuyWrappedSolV0Args"
          }
        }
      ]
    },
    {
      "name": "sellWrappedSolV0",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "SellWrappedSolV0Args"
          }
        }
      ]
    },
    {
      "name": "createCurveV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "curve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateCurveV0Args"
          }
        }
      ]
    },
    {
      "name": "initializeTokenBondingV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "curve",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "targetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "baseStorage",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyBaseRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyTargetRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellBaseRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellTargetRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitializeTokenBondingV0Args"
          }
        }
      ]
    },
    {
      "name": "closeTokenBondingV0",
      "accounts": [
        {
          "name": "refund",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "generalAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "targetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferReservesV0",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserveAuthority",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "TransferReservesV0Args"
          }
        }
      ]
    },
    {
      "name": "transferReservesNativeV0",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "reserveAuthority",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "TransferReservesV0Args"
          }
        }
      ]
    },
    {
      "name": "updateReserveAuthorityV0",
      "accounts": [
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveAuthority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateReserveAuthorityV0Args"
          }
        }
      ]
    },
    {
      "name": "updateCurveV0",
      "accounts": [
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "curveAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "curve",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateCurveV0Args"
          }
        }
      ]
    },
    {
      "name": "updateTokenBondingV0",
      "accounts": [
        {
          "name": "tokenBonding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "generalAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "targetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyBaseRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyTargetRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellBaseRoyalties",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellTargetRoyalties",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateTokenBondingV0Args"
          }
        }
      ]
    },
    {
      "name": "buyV1",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "curve",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "targetMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "buyBaseRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "destination",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "buyTargetRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "clock",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceAuthority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "BuyV0Args"
          }
        }
      ]
    },
    {
      "name": "buyNativeV0",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "curve",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "targetMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "buyBaseRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "destination",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "buyTargetRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "clock",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "BuyV0Args"
          }
        }
      ]
    },
    {
      "name": "sellV1",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "curve",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "targetMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "sellBaseRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "source",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "sourceAuthority",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "sellTargetRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "clock",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "SellV0Args"
          }
        }
      ]
    },
    {
      "name": "sellNativeV0",
      "accounts": [
        {
          "name": "common",
          "accounts": [
            {
              "name": "tokenBonding",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "curve",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "baseMint",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "targetMint",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "baseStorage",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "sellBaseRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "source",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "sourceAuthority",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "sellTargetRoyalties",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "clock",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wrappedSolMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "SellV0Args"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "mainState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "oposToken",
            "type": "publicKey"
          },
          {
            "name": "profileMintingCost",
            "type": "u64"
          },
          {
            "name": "invitationMintingCost",
            "type": "u64"
          },
          {
            "name": "mintingCostDistribution",
            "type": {
              "defined": "MintingCostDistribution"
            }
          },
          {
            "name": "tradingPriceDistribution",
            "type": {
              "defined": "TradingPriceDistribution"
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "totalMintedProfile",
            "type": "u64"
          },
          {
            "name": "profileCollection",
            "type": "publicKey"
          },
          {
            "name": "genesisProfile",
            "type": "publicKey"
          },
          {
            "name": "commonLut",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "activationTokenState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "parentProfile",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "collectionState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "genesisProfile",
            "type": "publicKey"
          },
          {
            "name": "collectionId",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "programStateV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wrappedSolMint",
            "type": "publicKey"
          },
          {
            "name": "solStorage",
            "type": "publicKey"
          },
          {
            "name": "mintAuthorityBumpSeed",
            "type": "u8"
          },
          {
            "name": "solStorageBumpSeed",
            "type": "u8"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "curveV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "definition",
            "type": {
              "defined": "PiecewiseCurve"
            }
          }
        ]
      }
    },
    {
      "name": "tokenBondingV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "targetMint",
            "type": "publicKey"
          },
          {
            "name": "generalAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "reserveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "curveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "baseStorage",
            "type": "publicKey"
          },
          {
            "name": "buyBaseRoyalties",
            "type": "publicKey"
          },
          {
            "name": "buyTargetRoyalties",
            "type": "publicKey"
          },
          {
            "name": "sellBaseRoyalties",
            "type": "publicKey"
          },
          {
            "name": "sellTargetRoyalties",
            "type": "publicKey"
          },
          {
            "name": "buyBaseRoyaltyPercentage",
            "docs": [
              "Percentage of purchases that go to royalties",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100"
            ],
            "type": "u32"
          },
          {
            "name": "buyTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellBaseRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "curve",
            "docs": [
              "The bonding curve to use"
            ],
            "type": "publicKey"
          },
          {
            "name": "mintCap",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "purchaseCap",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "goLiveUnixTime",
            "type": "i64"
          },
          {
            "name": "freezeBuyUnixTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "createdAtUnixTime",
            "type": "i64"
          },
          {
            "name": "buyFrozen",
            "type": "bool"
          },
          {
            "name": "sellFrozen",
            "type": "bool"
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          },
          {
            "name": "baseStorageBumpSeed",
            "type": "u8"
          },
          {
            "name": "targetMintAuthorityBumpSeed",
            "type": "u8"
          },
          {
            "name": "baseStorageAuthorityBumpSeed",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "reserveBalanceFromBonding",
            "type": "u64"
          },
          {
            "name": "supplyFromBonding",
            "type": "u64"
          },
          {
            "name": "ignoreExternalReserveChanges",
            "docs": [
              "Whether or not to ignore changes to base storage and target supply outside of the curve"
            ],
            "type": "bool"
          },
          {
            "name": "ignoreExternalSupplyChanges",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "profileState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lineage",
            "type": {
              "defined": "LineageInfo"
            }
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "activationToken",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "totalMintedSft",
            "type": "u64"
          },
          {
            "name": "totalMintedOffers",
            "type": "u64"
          },
          {
            "name": "lut",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "MainStateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileMintingCost",
            "type": "u64"
          },
          {
            "name": "invitationMintingCost",
            "type": "u64"
          },
          {
            "name": "oposToken",
            "type": "publicKey"
          },
          {
            "name": "mintingCostDistribution",
            "type": {
              "defined": "MintingCostDistribution"
            }
          },
          {
            "name": "tradingPriceDistribution",
            "type": {
              "defined": "TradingPriceDistribution"
            }
          }
        ]
      }
    },
    {
      "name": "BuyWithBaseV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "minimumTargetAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BuyTargetAmountV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "maximumPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BuyV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyWithBase",
            "type": {
              "option": {
                "defined": "BuyWithBaseV0Args"
              }
            }
          },
          {
            "name": "buyTargetAmount",
            "type": {
              "option": {
                "defined": "BuyTargetAmountV0Args"
              }
            }
          }
        ]
      }
    },
    {
      "name": "BuyWrappedSolV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CreateCurveV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "definition",
            "type": {
              "defined": "PiecewiseCurve"
            }
          }
        ]
      }
    },
    {
      "name": "InitializeSolStorageV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintAuthorityBumpSeed",
            "type": "u8"
          },
          {
            "name": "solStorageBumpSeed",
            "type": "u8"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "InitializeTokenBondingV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyBaseRoyaltyPercentage",
            "docs": [
              "Percentage of purchases that go to the founder",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100"
            ],
            "type": "u32"
          },
          {
            "name": "buyTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellBaseRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "goLiveUnixTime",
            "type": "i64"
          },
          {
            "name": "freezeBuyUnixTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "mintCap",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "purchaseCap",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "generalAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "reserveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "curveAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "buyFrozen",
            "type": "bool"
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          },
          {
            "name": "sellFrozen",
            "type": "bool"
          },
          {
            "name": "ignoreExternalReserveChanges",
            "docs": [
              "Whether or not to ignore changes to base storage and target supply outside of the curve"
            ],
            "type": "bool"
          },
          {
            "name": "ignoreExternalSupplyChanges",
            "type": "bool"
          },
          {
            "name": "initialReservesPad",
            "docs": [
              "* Allow starting a curve from a later reserve/supply ratio of ignor reserve and supply changes.\n   *\n   * This allows for things like the LBC where you don't need to provide any initial liquidity"
            ],
            "type": "u64"
          },
          {
            "name": "initialSupplyPad",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "minimumPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellWrappedSolV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "all",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "TransferReservesV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateCurveV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "curveAuthority",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateReserveAuthorityV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newReserveAuthority",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateTokenBondingV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "generalAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "buyBaseRoyaltyPercentage",
            "docs": [
              "Percentage of purchases that go to the founder",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100"
            ],
            "type": "u32"
          },
          {
            "name": "buyTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellBaseRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "sellTargetRoyaltyPercentage",
            "type": "u32"
          },
          {
            "name": "buyFrozen",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "TimeCurveV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "offset",
            "type": "i64"
          },
          {
            "name": "curve",
            "type": {
              "defined": "PrimitiveCurve"
            }
          },
          {
            "name": "buyTransitionFees",
            "type": {
              "option": {
                "defined": "TransitionFeeV0"
              }
            }
          },
          {
            "name": "sellTransitionFees",
            "type": {
              "option": {
                "defined": "TransitionFeeV0"
              }
            }
          }
        ]
      }
    },
    {
      "name": "TransitionFeeV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "percentage",
            "type": "u32"
          },
          {
            "name": "interval",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "LineageInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "parent",
            "type": "publicKey"
          },
          {
            "name": "grandParent",
            "type": "publicKey"
          },
          {
            "name": "greatGrandParent",
            "type": "publicKey"
          },
          {
            "name": "ggreatGrandParent",
            "type": "publicKey"
          },
          {
            "name": "generation",
            "type": "u64"
          },
          {
            "name": "totalChild",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "MintingCostDistribution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "parent",
            "type": "u16"
          },
          {
            "name": "grandParent",
            "type": "u16"
          },
          {
            "name": "greatGrandParent",
            "type": "u16"
          },
          {
            "name": "ggreatGrandParent",
            "type": "u16"
          },
          {
            "name": "genesis",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "TradingPriceDistribution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seller",
            "type": "u16"
          },
          {
            "name": "parent",
            "type": "u16"
          },
          {
            "name": "grandParent",
            "type": "u16"
          },
          {
            "name": "greatGrandParent",
            "type": "u16"
          },
          {
            "name": "genesis",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "MintProfileByAdminInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "lineage",
            "type": {
              "defined": "LineageInfo"
            }
          },
          {
            "name": "parentMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "MintPassByAtInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uriHash",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "MintProfileByAtInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uriHash",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "PrimitiveCurve",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ExponentialCurveV0",
            "fields": [
              {
                "name": "c",
                "type": "u128"
              },
              {
                "name": "b",
                "type": "u128"
              },
              {
                "name": "pow",
                "type": "u8"
              },
              {
                "name": "frac",
                "type": "u8"
              }
            ]
          },
          {
            "name": "TimeDecayExponentialCurveV0",
            "fields": [
              {
                "name": "c",
                "type": "u128"
              },
              {
                "name": "k1",
                "type": "u128"
              },
              {
                "name": "k0",
                "type": "u128"
              },
              {
                "name": "interval",
                "type": "u32"
              },
              {
                "name": "d",
                "type": "u128"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "PiecewiseCurve",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TimeV0",
            "fields": [
              {
                "name": "curves",
                "type": {
                  "vec": {
                    "defined": "TimeCurveV0"
                  }
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "MyError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "FirstError"
          },
          {
            "name": "AlreadySet"
          },
          {
            "name": "OnlyOwnerCanCall"
          },
          {
            "name": "UnknownNft"
          },
          {
            "name": "InvalidNftHolder"
          },
          {
            "name": "GenesisNftAlreadyMinted"
          },
          {
            "name": "ActivationTokenNotFound"
          },
          {
            "name": "ActivationTokenAlreadyInitialize"
          },
          {
            "name": "OnlyProfileHolderAllow"
          },
          {
            "name": "NotEnoughTokenToMint"
          },
          {
            "name": "ProfileIdMissMatch"
          }
        ]
      }
    },
    {
      "name": "InnerUint",
      "type": {
        "kind": "alias",
        "value": "u128"
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NoMintAuthority",
      "msg": "Target mint must have an authority"
    },
    {
      "code": 6001,
      "name": "InvalidMintAuthority",
      "msg": "Target mint must have an authority that is a pda of this program"
    },
    {
      "code": 6002,
      "name": "InvalidBaseStorageAuthority",
      "msg": "Invalid base storage authority pda or seed did not match canonical seed for base storage authority"
    },
    {
      "code": 6003,
      "name": "NoAuthority",
      "msg": "Token bonding does not have an authority"
    },
    {
      "code": 6004,
      "name": "ArithmeticError",
      "msg": "Error in precise number arithmetic"
    },
    {
      "code": 6005,
      "name": "PriceTooHigh",
      "msg": "Buy price was higher than the maximum buy price. Try increasing max_price or slippage configuration"
    },
    {
      "code": 6006,
      "name": "PriceTooLow",
      "msg": "Sell price was lower than the minimum sell price. Try decreasing min_price or increasing slippage configuration"
    },
    {
      "code": 6007,
      "name": "MintSupplyTooLow",
      "msg": "Cannot sell more than the target mint currently has in supply"
    },
    {
      "code": 6008,
      "name": "SellDisabled",
      "msg": "Sell is not enabled on this bonding curve"
    },
    {
      "code": 6009,
      "name": "NotLiveYet",
      "msg": "This bonding curve is not live yet"
    },
    {
      "code": 6010,
      "name": "PassedMintCap",
      "msg": "Passed the mint cap"
    },
    {
      "code": 6011,
      "name": "OverPurchaseCap",
      "msg": "Cannot purchase that many tokens because of purchase cap"
    },
    {
      "code": 6012,
      "name": "BuyFrozen",
      "msg": "Buy is frozen on this bonding curve, purchases not allowed"
    },
    {
      "code": 6013,
      "name": "WrappedSolNotAllowed",
      "msg": "Use token bonding wrapped sol via buy_wrapped_sol, sell_wrapped_sol commands. We may one day provide liquid staking rewards on this stored sol."
    },
    {
      "code": 6014,
      "name": "InvalidCurve",
      "msg": "The provided curve is invalid"
    },
    {
      "code": 6015,
      "name": "InvalidMint",
      "msg": "An account was provided that did not have the correct mint"
    },
    {
      "code": 6016,
      "name": "IgnoreExternalV1Only",
      "msg": "Ignoring external changes is only supported on v1 of buy and sell endpoints. Please upgrade your client"
    },
    {
      "code": 6017,
      "name": "InvalidPad",
      "msg": "Cannot pad token bonding without ignoring external reserve and supply changes. This is an advanced feature, incorrect use could lead to insufficient resreves to cover sells"
    }
  ]
};
