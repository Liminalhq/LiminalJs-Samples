import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync, PushRefillTransactionAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
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
        let response=await PushRefillTransactionAsync({
            walletInstance:walletInstance
        });

        if (response.success) {
            //request successful
            console.log(`Push Refill Transaction Response => ${response?.data}`);
        } else {
            console.log(`Error Push Refill Transaction Response : ${response?.message}`);
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