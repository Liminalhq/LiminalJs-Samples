import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GetTransferTransactionAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:gt
 * Docs => https://docs.lmnl.app/docs/get-transfers
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
            walletId:310, // Define your coin wallet id here
            allToken:true  // Specify if your coin is EVM or TRON base otherwise do not include this property.
        });

        // Step 3: Get Transaction Transfers data by passing sequence id
        let transactionSequenceId="56310902-57b6-c7a7-1891-e7874a5a6d44"; // Define your transaction sequence Id

        let transferTransactionResult=await GetTransferTransactionAsync({
            walletInstance:walletInstance,
            sequenceId:transactionSequenceId
        });

        if(transferTransactionResult?.success===true){

            console.log("Transfer Transaction Result =>",JSON.stringify(transferTransactionResult.data));
        }
        else
        {
            console.log(`Error => Transfer Transaction Result => ${transferTransactionResult?.message}`);
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