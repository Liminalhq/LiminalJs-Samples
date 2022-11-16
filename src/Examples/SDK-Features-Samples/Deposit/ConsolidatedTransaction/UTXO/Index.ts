import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { ConsolidatedTransactionAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:ct-utxo
 * Docs => https://docs.lmnl.app/docs/consolidate-transaction
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
            coin:CoinsEnum.ltc, // Define your UTXO coin only here.
            walletId:296 // Define your UTXO coin Wallet Id here.
        });

        // Step 3: Consolidate Send Transaction
        let sequenceId:string=Guid.create().toString();

        let transactionResponse=await ConsolidatedTransactionAsync({
            walletInstance:walletInstance,
            sequenceId:sequenceId,
            consolidateOptions:{
                targetAddress:"MVXHL4BFiE1BFc98eDoL1wTSXtfcdcSLqj" // Define your Target Address here.
            }
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