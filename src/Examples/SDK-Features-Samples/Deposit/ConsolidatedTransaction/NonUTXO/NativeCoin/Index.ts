import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { ConsolidatedTransactionAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId, env, tsmCred } from "../../../../../../Settings";


/**
 * Run Command => npm run start:ct-nt
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
            walletId:3414 // Define Your Coin Wallet Id Here
        });

        // Step 3: Consolidate Send Transaction

        let transactionResponse=await ConsolidatedTransactionAsync({
            walletInstance:walletInstance,
            tsmCred:tsmCred,
            consolidateOptions:{
                targetAddress: "0x2e73f21c7ea4ef53bc17a5c06e0cf1a168b85464" // Define Your Target Address Here
            },
            callBackSequenceId:(consolidateTransactionData: any)=> {
                // Call Back Loop

                 // Get Consolidate Transaction Response
                 console.log(`Consolidation Transaction Response => ${JSON.stringify(consolidateTransactionData)}`);

                // Generate GuiD
                let guid:string=Guid.create().toString()

                console.log(`guiId => ${guid}`)
                return guid;
            }
        });

        if(transactionResponse?.success===true){
            console.log(`Transaction Response => ${JSON.stringify(transactionResponse?.data)}`);
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