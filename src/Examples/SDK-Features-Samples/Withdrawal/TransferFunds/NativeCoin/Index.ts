import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync, SendManyTransactionAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:tfnc
 * Docs => https://docs.lmnl.app/docs/transfer-fund-native-coin
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
            walletId:3412 // Define your coin wallet Id
        });

        // Step 3 : Send Transaction
        let sequenceId:string=Guid.create().toString();
        console.log("sequenceId =>", sequenceId);

        let transactionResponse=await SendManyTransactionAsync({
            walletInstance:walletInstance,
            recipientsData:{
                recipients:[
                    {
                        address:"0x92BFFd4DC976c7781DE152DcE439a7C57740CE04",
                        amount:0.0001,
                        //data:""  //=> If you are using XRP
                    },

                ],
                sequenceId:sequenceId,
            }
        });

        if(transactionResponse?.success===true){
            console.log("Transaction Response =>",JSON.stringify(transactionResponse?.data));
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