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

create .env  and update variable with given value
```ini
NEXT_PUBLIC_OPOS_TOKEN=6vgT7gxtF8Jdu7foPDZzdHxkwYFX9Y1jvgpxP8vH2Apw
NEXT_PUBLIC_ROOT_PROFILE=DA8ZEAcwZdzBzqrcr5N9vEvvSbBhmrdvpp6V4wksM6eG
NEXT_PUBLIC_GENESIS_PROFILE=5iDkjEmsEvGi3hUrRk19UFJUBNRzDZLA5hUdXujtMY3A
NEXT_PUBLIC_ROOT_COLLECTION=7VgnWBvH6m6tFqjQuhTQSzhLjG6YxEzwBA17meJgqbD1
NEXT_PUBLIC_APP_PROFILE_COLLECTION=6LSk9Eozrf4XxW68WqTuRaFUHxN6ChwuZ5GWgLcuQSCm
NEXT_PUBLIC_BADGE_COLLECTION=4mAserfrmL4eGRnGDsZMsm8hRqqSdKDXcNDZ5mFQDQZJ
NEXT_PUBLIC_PASS_COLLECTION=DBRZcZaNCEL241JGvt3VtKhPTEnY7DdegQPpEXLsU2qn
NEXT_PUBLIC_APP_COMMON_LUT=2T4ZrPa9ixzygBHtJ2nVqYQBnqHUjejFA5MSL8EziN1U

```


## Mainnet Program configuration

create .env  and update variable with given value
```ini
```