import wallet from "../../turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("9kPydm89QEcE4aJ3SV2zEcS6HiCmD8ozHJcHkmRtEtcQ");
// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mintAuthority: signer,
      mint: mint,
    };

    // ...existing code...
    let data: DataV2Args = {
      name: "Spoiderman",
      symbol: "SPD",
      // replace the URL below with the raw/url to your hosted spiderman.json
      uri: "https://res.cloudinary.com/dvxar933p/raw/upload/v1760015026/spiderman_gwlteg.json",
      sellerFeeBasisPoints: 500, // 5%
      creators: null,
      collection: null,
      uses: null,
    };
    // ...existing code...

    let args: CreateMetadataAccountV3InstructionArgs = {
      data: data,
      isMutable: true,
      collectionDetails: null,
    };

    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    let result = await tx.sendAndConfirm(umi);
    console.log(bs58.encode(result.signature));
    // 3itKciW4mnra2DfjMkWkostB8kyJ2meU5bu68KkMYCRirCbFZoxMYAzESDyXjNEeNgN6j91ZTFXRGM6ZpHLh8Sep
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
