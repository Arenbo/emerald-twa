import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "@ton/core";
import { Mint, EmeraldJetton} from "../../build/EmeraldJetton/tact_EmeraldJetton";
import {JettonDefaultWallet} from "../../build/EmeraldJetton/tact_JettonDefaultWallet";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [balance, setBalance] = useState<string | null>()

    const jettonContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        const contract = EmeraldJetton.fromAddress(Address.parse("EQBfQBbr8MxFAiLPp_TxTX7CsMlykB40Oh3RDWitBAzAkMaI"))

        return client.open(contract) as OpenedContract<EmeraldJetton>
    }, [client, wallet])

    const jettonWalletContract = useAsyncInitialize(async()=>{
        if(!jettonContract || !client) return;

        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet!).toString())
        )

        return client.open(JettonDefaultWallet.fromAddress(jettonWalletAddress))
    }, [jettonContract, client])

    useEffect(()=>{
        async function getBalance() {
            if(!jettonWalletContract) return 
            setBalance(null)
            // const balance = (await jettonWalletContract.getGetWalletData()).balance
            const balance = 123
            setBalance(fromNano(balance))
            await sleep(5000)
            getBalance()
        }

        getBalance()

    }, [jettonWalletContract])

    // receiver: provider.sender().address as Address
    // let receiver = client!.provider.caller().address as Address;

    // let receiver = wallet;


    // let receiver_adr = wallet Address;
    // let receiver_adr = client?.provider;

    // const receiver_adr = Address.parse('EQCoqDe5bUxuV2GsL117soIjcVTbDaGtIScXwD4Mt92s19nJ');

    const receiver_adr = sender.address!;
    // const receiver_adr = Address.parse(wallet!);
    // const receiver_adr = Address.parse(wallet?.account?.address as string);

    // сделать отдельный файл с manifest и выложить на гитхаб

    console.log('useJettonContract receiver_adr', receiver_adr);
    if (receiver_adr) {
        console.log('useJettonContract receiver_adr string', receiver_adr.toString());        
    }

    // need to create a test in jetton contract and trying to send minted jetton
    // nikandr example
    // todolist jetton example?

    // если использовать задеплоиный через сервис где брать abi для него???
    // может есть туториалы где можно посмотреть код на гитхабе?

    // взять контракт func который лежит на сервисе запуска жетонов
    // написать для него часть обвязки для минта и трансфера
    // протестировать в тестах и в ui


    return {
        jettonWalletAddress: jettonWalletContract?.address.toString(),
        balance: balance,
        mint: () => {
            const message: Mint = {
                $$type: "Mint",
                amount: 150n,
                receiver: receiver_adr
            }

            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, message)
        }
    }
}