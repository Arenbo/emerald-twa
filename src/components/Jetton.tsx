import { Address } from "@ton/core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";

export function Jetton() {
  const {wallet} = useTonConnect()
//   const jettonWalletAddress = '';
//   const balance = 0;
  const {jettonWalletAddress, balance, mint} = useJettonContract();

  return (
    <div title="Jetton">
        <h3>Jetton</h3>
        <div>
          Wallet
          <p>{ wallet ? Address.parse(wallet as string).toString() : "Loading..."}</p>
        </div>
        <div>
          Jetton Wallet
          <p>{jettonWalletAddress ? jettonWalletAddress : "Loading..."}</p>
        </div>
        <div>
          Balance
          <p>{balance ?? "Loading..."}</p>
        </div>
        <button onClick={mint}>
          Mint jettons
        </button>
    </div>
  );
}
