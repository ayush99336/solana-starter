import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../../turbin3-wallet.json";
import { get } from "prompt";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("9kPydm89QEcE4aJ3SV2zEcS6HiCmD8ozHJcHkmRtEtcQ");

(async () => {
  try {
    // Create an ATA
    console.log(`Creating ATA for ${keypair.publicKey.toBase58()}`);
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair, // payer
      mint, // mint
      keypair.publicKey // owner
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);

    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair,
      1_000_000n
    );
    console.log(`Minted 1000000 units = 1 tokens to ${ata.address.toBase58()}`);
    console.log(`Your mint txid: ${mintTx}`);

    // Creating ATA for 9gXWuNuZR34uCvmqR2prGEQ22p9KxcmDhBywd7P1a7yf
    // Your ata is: 5VrE5jcm6tMp4X3ytpCEpt4Kz93GcBtmSfqh5JfrvLKi
    // Minted 1000000 tokens to 5VrE5jcm6tMp4X3ytpCEpt4Kz93GcBtmSfqh5JfrvLKi
    // Your mint txid: 54hvX3RxNaX7jLkCdaoaStUtzbHQN1et4ZswbsckN1MuE7QR5TmLB2Ws3NLv5BWot1rrW55WDQvYoUzmAmdKraCP
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
