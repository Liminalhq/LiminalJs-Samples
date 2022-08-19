import { CoinsEnum, LiminalEnvironment, LiminalJs, TransferTransactionRequestResult, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync } from "../../../../Helpers/LiminalAuth";
import { TransactionStatusAsync } from "../../../../Helpers/TransactionStatus";
import { WalletInstanceAsync } from "../../../../Helpers/WalletInstance";
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

        let transactionStatusResult:TransferTransactionRequestResult=await TransactionStatusAsync({
            walletInstance:walletInstance,
            sequenceId:transactionSequenceId
        });

        console.log("Transaction Status JSON =>",JSON.stringify(transactionStatusResult));

        // Get Transaction Status
        let statusLiteral={
            1:'Pending',
            2:'Broadcasted',
            4:'Confirmed',
            5:'Cancelled',
            6:'Failed'
        }
        console.log("Transaction Status =>",statusLiteral[transactionStatusResult?.status]);

        // Get Transaction Hash
        console.log("Transaction Hash =>",transactionStatusResult?.identifier);
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