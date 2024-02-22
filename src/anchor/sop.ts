export type Sop = {
  "version": "0.1.0",
  "name": "sop",
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
      "name": "createProfileCollection",
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
          "name": "newLut",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "addressLookupTableProgram",
          "isMut": false,
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
        },
        {
          "name": "recentSlot",
          "type": "u64"
        }
      ]
    },
    {
      "name": "mintProfileDistribution",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
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
          "name": "parentProfileState",
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
      "args": []
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
      "name": "mintOffer",
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
          "name": "userOfferAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "offerMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offerEdition",
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
      "name": "fakeIdState",
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
          },
          {
            "name": "recentSlot",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "FirstError",
      "msg": "first erorr"
    },
    {
      "code": 6001,
      "name": "AlreadySet",
      "msg": "Value assing already"
    },
    {
      "code": 6002,
      "name": "OnlyOwnerCanCall",
      "msg": "This method can only be called by onwer"
    },
    {
      "code": 6003,
      "name": "UnknownNft",
      "msg": "Unknown NFT"
    },
    {
      "code": 6004,
      "name": "InvalidNftHolder",
      "msg": "Invalid Nft holder"
    },
    {
      "code": 6005,
      "name": "GenesisNftAlreadyMinted",
      "msg": "Genesis nft already created"
    },
    {
      "code": 6006,
      "name": "ActivationTokenNotFound",
      "msg": "Activation token not found"
    },
    {
      "code": 6007,
      "name": "ActivationTokenAlreadyInitialize",
      "msg": "Activation Token already initialize"
    },
    {
      "code": 6008,
      "name": "OnlyProfileHolderAllow",
      "msg": "Only Profile Holder can call"
    },
    {
      "code": 6009,
      "name": "NotEnoughTokenToMint",
      "msg": "Not have enough token to mint"
    },
    {
      "code": 6010,
      "name": "ProfileIdMissMatch",
      "msg": "Profile ID missmatch"
    }
  ]
};

export const IDL: Sop = {
  "version": "0.1.0",
  "name": "sop",
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
      "name": "createProfileCollection",
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
          "name": "newLut",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "addressLookupTableProgram",
          "isMut": false,
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
        },
        {
          "name": "recentSlot",
          "type": "u64"
        }
      ]
    },
    {
      "name": "mintProfileDistribution",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
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
          "name": "parentProfileState",
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
      "args": []
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
      "name": "mintOffer",
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
          "name": "userOfferAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "offerMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offerEdition",
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
      "name": "fakeIdState",
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
          },
          {
            "name": "recentSlot",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "FirstError",
      "msg": "first erorr"
    },
    {
      "code": 6001,
      "name": "AlreadySet",
      "msg": "Value assing already"
    },
    {
      "code": 6002,
      "name": "OnlyOwnerCanCall",
      "msg": "This method can only be called by onwer"
    },
    {
      "code": 6003,
      "name": "UnknownNft",
      "msg": "Unknown NFT"
    },
    {
      "code": 6004,
      "name": "InvalidNftHolder",
      "msg": "Invalid Nft holder"
    },
    {
      "code": 6005,
      "name": "GenesisNftAlreadyMinted",
      "msg": "Genesis nft already created"
    },
    {
      "code": 6006,
      "name": "ActivationTokenNotFound",
      "msg": "Activation token not found"
    },
    {
      "code": 6007,
      "name": "ActivationTokenAlreadyInitialize",
      "msg": "Activation Token already initialize"
    },
    {
      "code": 6008,
      "name": "OnlyProfileHolderAllow",
      "msg": "Only Profile Holder can call"
    },
    {
      "code": 6009,
      "name": "NotEnoughTokenToMint",
      "msg": "Not have enough token to mint"
    },
    {
      "code": 6010,
      "name": "ProfileIdMissMatch",
      "msg": "Profile ID missmatch"
    }
  ]
};
