import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync, ResendEVMTransactionAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:re
 * Docs => https://docs.lmnl.app/docs/consolidate-transaction
 * Note : EVM base Transaction only
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
            coin:CoinsEnum.eth, // Define your Coin here
            walletId:310, // Define your coin Wallet Id here
            allToken:true  // Specify if your coin is EVM base otherwise do not include this property.
        });

        if(walletInstance?.ParentChain==="EVM"){

            // Step 3: Resend EVM Transaction.
            await ResendEVMTransactionAsync({
                walletInstance:walletInstance,
                walletIdList:[310],
                sleepInMilliseconds:60000  //1 Min
            });

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