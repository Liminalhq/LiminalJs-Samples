import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync, TransactionStatusAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId } from "../../../../Settings";


/**
 * Run Command => npm run start:ts
 * Docs => https://docs.lmnl.app/docs/transaction-status
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
            env:LiminalEnvironment.test
        });

        // Step 2: Get Wallet Instance
        let walletInstance:Wallet=await WalletInstanceAsync({
            liminalJs:liminalJs,
            coin:CoinsEnum.eth, // Define your coin here
            walletId:310, // Define your coin wallet id here
            allToken:true  // Specify if your coin is EVM or TRON base otherwise do not include this property.
        });

        // Step 3: Get Transaction Status by Sequence Id
        // Get sequenceId from your DB which you want to check the transaction status
        let transactionSequenceId="56310902-57b6-c7a7-1891-e7874a5a6d44";

        let transactionStatusResult=await TransactionStatusAsync({
            walletInstance:walletInstance,
            sequenceId:transactionSequenceId
        });

        if(transactionStatusResult?.success===true){

            console.log("Transaction Status JSON =>",JSON.stringify(transactionStatusResult));

            // Get Transaction Status
            let statusLiteral={
                1:'Pending',
                2:'Broadcasted',
                4:'Confirmed',
                5:'Cancelled',
                6:'Failed'
            }
            console.log("Transaction Status =>",statusLiteral[transactionStatusResult?.data?.status]);

            // Get Transaction Hash
            console.log("Transaction Hash =>",transactionStatusResult?.data?.identifier);

        }
        else
        {
            console.log(`Error Transaction Status => ${transactionStatusResult?.message}`);
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