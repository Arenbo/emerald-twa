// import { getHttpEndpoint } from '@orbs-network/ton-access';
// import { TonClient } from "@ton/ton";
// import { useAsyncInitialize } from './useAsyncInitialize';

// export function useTonClient() {
//   return useAsyncInitialize(
//     async () =>
//       new TonClient({
//         endpoint: await getHttpEndpoint({ network: 'testnet' }),
//       })
//   );
// }


import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

export function useTonClient() {
    const {network} = useTonConnect()

    return {
        client: useAsyncInitialize(async ()=>{
            if(!network) return;

            return new TonClient({
                endpoint: await getHttpEndpoint({
                    network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
                })
            })
        }, [network])
    }
}
