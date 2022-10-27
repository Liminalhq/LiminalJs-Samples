import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { LiminalAuthAsync } from "../../../../../Helpers/LiminalAuth";
import { SendManyTransactionAsync } from "../../../../../Helpers/SendManyTransaction";
import { WalletInstanceAsync } from "../../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env, tsmCred } from "../../../../../Settings";


/**
 * Run Command => npm run start:dst
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
            coin:CoinsEnum.eth, // Define Your Coin here
            walletId:1609 // Define Your Coin Wallet Id Here
        });

        // Step 3: Data Send Transaction 
        let sequenceId:string=Guid.create().toString();
        console.log("sequenceId =>", sequenceId);

        let transactionResponse=await SendManyTransactionAsync({
            walletInstance:walletInstance,
            recipientsData:{
                recipients:[
                    {
                        address:"0x20572e4c090f15667cF7378e16FaD2eA0e2f3EfF",
                        amount:0.00001,
                        data:"0x1249c58b"
                    },

                ],
                fromAddress:"0xC92745038c520446d1fb88c84Da268A22cfFDEB8",
                gasLimit:240000,
                sequenceId:sequenceId,
                tsmCreds:tsmCred
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