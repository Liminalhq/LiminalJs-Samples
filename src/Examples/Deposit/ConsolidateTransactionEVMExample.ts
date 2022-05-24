import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { ConsolidatedTransactionAsync } from "../../Helpers/ConsolidateTransaction";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../Helpers/WalletInstance";
import { clientId, clientSecretId, tsmCred } from "../../Settings";


export const main=async():Promise<void>=>{

    try
    {
        // Step 1: Auth
        let liminalJs:LiminalJs=await LiminalAuthAsync({
            liminalOptions:{
                clientId:clientId,
                clientSecret: clientSecretId
            },
            env:LiminalEnvironment.test
        });

        // Step 2: Get Wallet Instance
        let walletInstance:Wallet=await WalletInstanceAsync({
            liminalJs:liminalJs,
            coin:CoinsEnum.eth,
            walletId:0
        });

        // Step 3: Consolidate Send Transaction

        let transactionResponse:any[]=await ConsolidatedTransactionAsync({
            walletInstance:walletInstance,
            tsmCred:tsmCred,
            consolidateOptions:{
                targetAddress: "YOUR_TARGET_ADDRESS"
            },
            callBackSequenceId:()=> {
                
                let guid:string=Guid.create().toString()

                console.log(`guiId => ${guid}`)
                return guid;
            }
        });

        console.log("Transaction Response =>",JSON.stringify(transactionResponse));

        
    }
    catch(ex)
    {
        throw ex;
    }
}

main()
.then(()=> console.log("Script Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
})