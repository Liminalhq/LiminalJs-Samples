import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { LiminalAuthAsync } from "../../../../../Helpers/LiminalAuth";
import { SendManyTransactionAsync } from "../../../../../Helpers/SendManyTransaction";
import { WalletInstanceAsync } from "../../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:tfg
 * Docs => https://docs.lmnl.app/docs/sendmany
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
            walletId:457 // Define your coin wallet Id here
        });

        // Step 3 : Send Transaction

        let sequenceId:string=Guid.create().toString();
        console.log("sequenceId =>", sequenceId);

        let transactionResponse=await SendManyTransactionAsync({
            walletInstance:walletInstance,
            recipientsData:{
                recipients:[
                    {
                        address:"0x499d11e0b6eac7c0593d8fb292dcbbf815fb29ae",
                        amount:0,
                        data: "0x095ea7b300000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                    }
                ],
                sequenceId:sequenceId
            },
            submitOption:{
                comment:"testing"
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
.then(()=> console.log("Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
})