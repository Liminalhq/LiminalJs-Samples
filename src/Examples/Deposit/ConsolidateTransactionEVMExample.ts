import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../Helpers/WalletInstance";
import { ConsolidateTransactionAsync } from "../../Integration/ConsolidateTransactionEVM";
import { clientId, clientSecretId, depositWalletId, env, targetAddress, tsmCred } from "../../Settings";

/**
 * Run Command : npm run start:ct
 */

export const main=async():Promise<void>=>{

    try
    {
        // Step 1: Auth
        let liminalJs:LiminalJs=await LiminalAuthAsync({
            liminalOptions:{
                clientId:clientId,
                clientSecret: clientSecretId
            },
            env:LiminalEnvironment[env]
        });

        // Native Coin Consolidate Transaction
        // Step 2: Get Wallet Instance
        let walletInstance:Wallet=await WalletInstanceAsync({
            liminalJs:liminalJs,
            coin:CoinsEnum.eth,
            walletId:Number(depositWalletId)
        });

        // Step 3: Consolidate Send Transaction
        ConsolidateTransactionAsync({
            walletInstance:walletInstance,
            targetAddress:targetAddress,
            tsmCred:tsmCred
        });

        // Token Consolidate Transaction
        // let walletInstance:Wallet=await WalletInstanceAsync({
        //     liminalJs:liminalJs,
        //     coin:CoinsEnum.eth,
        //     walletId:Number(depositWalletId),
        //     tokenOptions:{
        //         tokenName:"bat",
        //         tokenAddress:"0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99"
        //     }
        // });

        // // Step 3: Consolidate Send Transaction
        // ConsolidateTransactionAsync({
        //     walletInstance:walletInstance,
        //     targetAddress:targetAddress,
        //     tsmCred:tsmCred,
        // });
    }
    catch(ex)
    {
        throw ex;
    }
}

main()
.then(()=> console.log("Script Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
})