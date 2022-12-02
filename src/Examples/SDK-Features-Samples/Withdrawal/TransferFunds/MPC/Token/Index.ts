import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync, SendManyTransactionAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId, env, tsmCred } from "../../../../../../Settings";

/**
 * Run Command => npm run start:tft-mpc
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
            coin:CoinsEnum.sol, // Define your Coin here
            walletId:3466, // Define your coin wallet Id
            allToken:true,
            tokenOptions:{
                tokenName:"Testtoken",
                tokenAddress:"bfc7197e735d2748024be222ed510a23d8682e9f912769e6d922a276"
            }
        });

        // Step 3 : Send Transaction
        let sequenceId:string=Guid.create().toString();
        console.log("sequenceId =>", sequenceId);

        let transactionResponse=await SendManyTransactionAsync({
            walletInstance:walletInstance,
            recipientsData:{
                recipients:[
                    {
                        address:"3xZrNy2CdZ5yVoX9eSinrVuxWVH8t8ezp3eyCRGsrUNM",
                        amount:0.01,
                        //data:""  //=> If you are using XRP
                    },

                ],
                sequenceId:sequenceId,
                tsmCreds:tsmCred
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