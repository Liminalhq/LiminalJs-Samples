import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { ConsolidatedTransactionAsync } from "../../../../Helpers/ConsolidateTransaction";
import { FanoutUnspentTransactionAsync } from "../../../../Helpers/FanoutUnspentTransaction";
import { LiminalAuthAsync } from "../../../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:fo
 * Docs => https://docs.lmnl.app/docs/fanout-transaction
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

        let transactionResponse:any=await FanoutUnspentTransactionAsync({
            walletInstance:walletInstance,
            sequenceId:sequenceId
        });

        console.log("Transaction Response =>",JSON.stringify(transactionResponse));
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