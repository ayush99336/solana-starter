import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../../turbin3-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("9kPydm89QEcE4aJ3SV2zEcS6HiCmD8ozHJcHkmRtEtcQ");

// Recipient address
const to = new PublicKey("G7MTCM2S1W6ufPhYLjodUyRZLBFbPz91CXd5C63aWoqV");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const ata = await getOrCreateAssociatedTokenAccount(
      connection, // connection
      keypair, // payer
      mint, // mint
      keypair.publicKey // owner
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection, // connection
      keypair, // payer
      mint, // mint
      to // owner
    );

    // Transfer the new token to the "toTokenAccount" we just created
    const txSignature = await transfer(
      connection, // connection
      keypair, // payer
      ata.address, // from (should be a token account)
      toTokenAccount.address, // to (should be a token account)
      keypair.publicKey, // owner of the from account
      50e6 // number of tokens to transfer
    );
    console.log(`Transfer transaction signature: ${txSignature}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
