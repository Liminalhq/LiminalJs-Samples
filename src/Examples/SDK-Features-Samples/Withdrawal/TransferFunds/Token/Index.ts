import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync, SendManyTransactionAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId } from "../../../../../Settings";

/**
 * Run Command => npm run start:tft
 * Docs =>https://docs.lmnl.app/docs/sendmany-tokens
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
            coin:CoinsEnum.eth,
            walletId:3412,
            allToken:true,
            tokenOptions:{
                tokenName:"dai",
                tokenAddress:"0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60"
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
                        address:"0x92BFFd4DC976c7781DE152DcE439a7C57740CE04",
                        amount:0.0002
                    }
                ],
                sequenceId:sequenceId
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