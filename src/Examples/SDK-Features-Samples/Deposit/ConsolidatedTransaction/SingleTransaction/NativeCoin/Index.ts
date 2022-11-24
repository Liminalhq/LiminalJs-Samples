import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { ConsolidatedTransactionAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId, env, tsmCred } from "../../../../../../Settings";


/**
 * Run Command => npm run start:stn
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

        let transactionResponse=await ConsolidatedTransactionAsync({
            walletInstance:walletInstance,
            tsmCred:tsmCred,
            consolidateOptions:{
                targetAddress: "0xC92745038c520446d1fb88c84Da268A22cfFDEB8", // Define Your Target Address Here
                fromAddress:"0x094FD2125d2ECE9e7BE6F4a5415A2e3Ab182920b"
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