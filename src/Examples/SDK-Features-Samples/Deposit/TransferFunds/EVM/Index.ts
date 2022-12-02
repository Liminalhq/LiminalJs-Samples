import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync, SendManyTransactionAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId, env, tsmCred } from "../../../../../Settings";


/**
 * Single Transaction using deposit Wallet
 * Run Command => npm run start:stdevm
 * Docs => https://docs.lmnl.app/docs/transfer-funds
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
            walletId:3414 // Define Your Coin Wallet Id Here
        });

        if(walletInstance?.ParentChain==="EVM"){

            // Step 3: Transfer funds from address to Destination address using Deposit Wallet
            let sequenceId:string=Guid.create().toString();
            console.log("sequenceId =>", sequenceId);

            let transactionResponse=await SendManyTransactionAsync({
                walletInstance:walletInstance,
                recipientsData:{
                    recipients:[
                        {
                            address:"0x2e73f21c7ea4ef53bc17a5c06e0cf1a168b85464",
                            amount:0.00001,
                            data:"0x"
                        },

                    ],
                    fromAddress:"0x92BFFd4DC976c7781DE152DcE439a7C57740CE04",
                    gasLimit:240000,
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
        else
        {
            console.log(`This function only support for the EVM chain only.`);
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