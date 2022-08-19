import { CoinsEnum, LiminalEnvironment, LiminalJs, PushRefillTxResultWrapper, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync } from "../../../../Helpers/LiminalAuth";
import { PushRefillTransactionAsync } from "../../../../Helpers/PushRefillTransaction";
import { WalletInstanceAsync } from "../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:prt
 * Docs => https://docs.lmnl.app/docs/push-refill-transaction
 */


export const main=async():Promise<void>=>{

    try
    {
        // Step 1: Auth
        let liminalJs:LiminalJs=await LiminalAuthAsync({
            liminalOptions:{
                clientId:clientId,
                clientSecret:clientSecretId
            },
            env:LiminalEnvironment[env]
        });

        // Step 2: Get Wallet Instance
        let walletInstance:Wallet=await WalletInstanceAsync({
            liminalJs:liminalJs,
            coin:CoinsEnum.eth, // Define your coin here
            walletId:133 // Define your coin wallet here
        });

        // Step3 : Push Refill Transaction
        let response:PushRefillTxResultWrapper=await PushRefillTransactionAsync({
            walletInstance:walletInstance
        });

        if (response.success) {
            //request successful
        } else {
            //console.log("Request failed due to error:", response.message);
            console.log(`Error : ${response.responseError?.errorCode || response?.responseError?.message || response?.responseError?.data}`);
        }

        
    }
    catch(ex)
    {
        throw ex;
    }
}

main()
.then(()=> console.log("Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
})