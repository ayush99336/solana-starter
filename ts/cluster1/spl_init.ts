import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "../../turbin3-wallet.json"; // 9gXWuNuZR34uCvmqR2prGEQ22p9KxcmDhBywd7P1a7yf

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here
    // const mint = ???
    const mint = await createMint(
      connection, // connection
      keypair, // payer
      keypair.publicKey, // mint authority
      null, // freeze authority (optional)
      6 // decimals
    );
    console.log(`Mint Address: ${mint.toBase58()}`);

    console.log(`Mint created successfully! with {decimals: 6} at ${mint}`);
    // Mint Address: 9kPydm89QEcE4aJ3SV2zEcS6HiCmD8ozHJcHkmRtEtcQ
    // Mint created successfully! with {decimals: 6} at 9kPydm89QEcE4aJ3SV2zEcS6HiCmD8ozHJcHkmRtEtcQ
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
