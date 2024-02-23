This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Depoyment steps

## Env configuration
```ini
# This line is ignored since it's a comment
MONGO_URI=<- Mongo db connection string
NEXT_PUBLIC_APP_MAIN_URL=https://mmosh:app <- mmosh app main url
NEXT_PUBLIC_SHDW_PRIVATE= <- shadow storage private key
```

## Network configuration

1. Open src/app/components/WalletConnector.tsx
2. update getNetwork function based on network

For Mainnet
```ini
    const getNetwork = () => {
        return WalletAdapterNetwork.Mainnet;
     }
```

For Devnet
```ini
    const getNetwork = () => {
        return WalletAdapterNetwork.Devnet;
     }
```

3. update rpc url in src/anchor/web3Config.json based on network

For Mainnet
```ini
"rpcURL": "https://api.mainnet-beta.solana.com"
```

For Devnet
```ini
"rpcURL": "https://api.devnet.solana.com"
```


## Devnet Program configuration

go to src/anchor/web3Consts.ts and update variable with given value
```ini
  oposToken: new web3.PublicKey("6vgT7gxtF8Jdu7foPDZzdHxkwYFX9Y1jvgpxP8vH2Apw"),
  rootProfile: new web3.PublicKey(
    "85YaBFhbwuqPiRVNrXdMJwdt1qjdxbtypGcFBc6Tp7qA",
  ),
  genesisProfile: new web3.PublicKey(
    "J2tFYfnM4t8XMcaMsR2WyUhaNrkJ26pwKZGq2J9T7rQL",
  ),
  commonLut: new web3.PublicKey("5D3XazMMpBcQb8FLxTWMB7WoWzU1YeVP3usekchp1xLu"),

```


## Mainnet Program configuration

Go to src/anchor/web3Consts.ts and update variable with given value
```ini
  oposToken: new web3.PublicKey("FwfrwnNVLGyS8ucVjWvyoRdFDpTY8w6ACMAxJ4rqGUSS"),
  rootProfile: new web3.PublicKey(
    "85YaBFhbwuqPiRVNrXdMJwdt1qjdxbtypGcFBc6Tp7qA",
  ),
  genesisProfile: new web3.PublicKey(
    "HLU5hoeXDqn9QSL6qFsPqi2dHXsTmsioYcuNd1CWbedB",
  ),
  commonLut: new web3.PublicKey("A1y1BoDXB5bph8nkiD1oBQb1BksxtSCbzxjH8gwuFf2Q"),

```