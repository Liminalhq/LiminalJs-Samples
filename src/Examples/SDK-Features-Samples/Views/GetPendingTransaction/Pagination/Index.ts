import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GetPendingTransactionAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:ptp
 * Docs => https://docs.lmnl.app/docs/get-pending-transaction
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
            walletId:310 // Define your coin wallet id here.
        });

        // Step 3: Get Pending Transaction By Pagination
        let response=await GetPendingTransactionAsync({
            walletInstance:walletInstance,
            getPendingTransactionOptions:{
               pagination:{
                    pageNumber:1,
                    pageSize:10
               }
            } 
        });

        if(response.success){
            console.log("Response =>", JSON.stringify(response?.data?.transactionList));
        }
        else
        {
            console.log("Error => ", JSON.stringify(response.message));
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