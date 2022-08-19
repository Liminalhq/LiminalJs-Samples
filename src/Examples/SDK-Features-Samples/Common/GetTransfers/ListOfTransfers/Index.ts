import { CoinsEnum, LiminalEnvironment, LiminalJs, TransferTransactionWrapper, Wallet } from "@lmnl/liminaljs";
import { GetTransferTransactionListAsync } from "../../../../../Helpers/GetTransferTransaction";
import { LiminalAuthAsync } from "../../../../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:gtlp
 * Docs => https://docs.lmnl.app/docs/transfers
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
            coin:CoinsEnum.eth, // Specify your coin here
            walletId:310, // Specify your coin wallet id here
            allToken:true  // Specify if your coin is EVM or TRON base otherwise do not include this property.
        });

        // Step 3: Get list of Transaction Transfers data
        let transferTransactionResult:TransferTransactionWrapper[]=await GetTransferTransactionListAsync({
            walletInstance:walletInstance,
            pagination:{
                pageNumber:1,
                pageSize:50
            }
        });

        console.log(`Transfer Transaction Result => ${JSON.stringify(transferTransactionResult)}`);
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