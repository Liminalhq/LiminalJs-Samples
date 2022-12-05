import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { FanoutUnspentTransactionAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:fo
 * Docs =>https://docs.lmnl.app/docs/fanout-transaction
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
            coin:CoinsEnum.ltc, // Define Your Coin here
            walletId:296 // Define Your Coin Wallet id here
        });

        // Step 3: Fanout Transaction
        let sequenceId:string=Guid.create().toString();

        let transactionResponse=await FanoutUnspentTransactionAsync({
            walletInstance:walletInstance,
            sequenceId:sequenceId
        });

        if(transactionResponse?.success===true){
            console.log("Transaction Response =>",JSON.stringify(transactionResponse?.data));
        }
        else
        {
            console.log(`Error => Transaction Response => ${transactionResponse?.message}`);
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