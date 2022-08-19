import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { LiminalAuthAsync } from "../../../../../Helpers/LiminalAuth";
import { SendManyTransactionAsync } from "../../../../../Helpers/SendManyTransaction";
import { WalletInstanceAsync } from "../../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:tfnc
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
            coin:CoinsEnum.eth, // Define your Coin here
            walletId:310 // Define your coin wallet Id
        });

        // Step 3 : Send Transaction
        let sequenceId:string=Guid.create().toString();
        console.log("sequenceId =>", sequenceId);

        let transactionResponse=await SendManyTransactionAsync({
            walletInstance:walletInstance,
            recipientsData:{
                recipients:[
                    {
                        address:"0x7f17bE241F88530DA74F035E8b74125fFEDeA98D",
                        amount:0.00001,
                        //data:""  //=> If you are using XRP
                    },

                ],
                sequenceId:sequenceId,
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