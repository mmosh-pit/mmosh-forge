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

<<<<<<< HEAD
go to src/anchor/web3Consts.ts and update variable with given value

=======
create .env and update variable with given value

> > > > > > > f5bf2a3623eaaa4117cb48ca3210c4d085bee4ce

```ini
NEXT_PUBLIC_OPOS_TOKEN=6vgT7gxtF8Jdu7foPDZzdHxkwYFX9Y1jvgpxP8vH2Apw
NEXT_PUBLIC_ROOT_PROFILE=DA8ZEAcwZdzBzqrcr5N9vEvvSbBhmrdvpp6V4wksM6eG
NEXT_PUBLIC_GENESIS_PROFILE=EF3i2vbtTfCCezvWV6zFrjXMC9WfxHbsvLxd4gs288Pt
NEXT_PUBLIC_ROOT_COLLECTION=F3kdMzMSfgKoSJgtCqJrFQNhmtSQtPBJ8t3uxWKxmayi
NEXT_PUBLIC_APP_PROFILE_COLLECTION=DwzoFFz2PVuJ3NtsCWYn1Kwwbxf5VfbTtxZfTMt2cDLx
NEXT_PUBLIC_BADGE_COLLECTION=75WUuYaA9rwpkmGfsC4c26E4CqvDu1DiLcG7NTZyHLpm
NEXT_PUBLIC_PASS_COLLECTION=5qLuvrfiJoDAR4DnJV62HPvPpMjZxwuBU4BZLvUrfTUh
NEXT_PUBLIC_APP_COMMON_LUT=8MykuxNrQe1aukV7V2YcqMHGT3RDKqGkCwjQWdzZqkdj

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a62a0519097b7ef3ea1de11c29aafeabc7c2243a68be2fabf2454360833308d3

```

## Mainnet Program configuration

Go to src/anchor/web3Consts.ts and update variable with given value

```ini
  NEXT_PUBLIC_OPOS_TOKEN=FwfrwnNVLGyS8ucVjWvyoRdFDpTY8w6ACMAxJ4rqGUSS
  NEXT_PUBLIC_ROOT_PROFILE=DA8ZEAcwZdzBzqrcr5N9vEvvSbBhmrdvpp6V4wksM6eG
  NEXT_PUBLIC_GENESIS_PROFILE=5hZvipJh93EimpyipmhuvFPTMVGcgj2rJks5cDDu48ts
  NEXT_PUBLIC_ROOT_COLLECTION=8rKVgAH9DsQcumJrfLYotCDj8EP4VL5JAFNBrQHMDozh
  NEXT_PUBLIC_APP_PROFILE_COLLECTION=2QfznyyKJWvLnLienCeFW4wZxRb6Mx2ByhRdgZGQCp9u
  NEXT_PUBLIC_BADGE_COLLECTION=4HLgkPg5hsoW2Yymv3PXhQhjZRBcovwTZCaiFe4ZHUoA
  NEXT_PUBLIC_PASS_COLLECTION=8UhitpWzAvjefzbnE5KReCnMNqeYFCxw3gn8VYHqAJxk
  NEXT_PUBLIC_APP_COMMON_LUT=AA9yA5hFkmALURXB8ESB288fAkxmEzs6n5QfvYr3hxty

```

## LICENSE

Copyright 2022 Scoby Society

Licensed under the GNU License, Version 3.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

https://www.gnu.org/licenses/agpl-3.0.en.html

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
