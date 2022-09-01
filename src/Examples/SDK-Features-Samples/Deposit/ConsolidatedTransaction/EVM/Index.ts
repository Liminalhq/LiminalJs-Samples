import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { ConsolidatedTransactionAsync } from "../../../../../Helpers/ConsolidateTransaction";
import { LiminalAuthAsync } from "../../../../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env, tsmCred } from "../../../../../Settings";


/**
 * Run Command => npm run start:ct-evm
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
            coin:CoinsEnum.eth, // Define Your Coin here
            walletId:1609 // Define Your Coin Wallet Id Here
        });

        // Step 3: Consolidate Send Transaction

        let transactionResponse:any[]=await ConsolidatedTransactionAsync({
            walletInstance:walletInstance,
            tsmCred:tsmCred,
            consolidateOptions:{
                targetAddress: "0xC92745038c520446d1fb88c84Da268A22cfFDEB8" // Define Your Target Address Here
            },
            callBackSequenceId:()=> {
                
                let guid:string=Guid.create().toString()

                console.log(`guiId => ${guid}`)
                return guid;
            }
        });

        console.log(`Transaction Response => ${JSON.stringify(transactionResponse)}`);

        
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