import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../Helpers/WalletInstance";
import { ConsolidateTransactionAsync } from "../../Integration/ConsolidateTransactionEVM";
import { clientId, clientSecretId, depositWalletId, env, targetAddress, tsmCred } from "../../Settings";


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