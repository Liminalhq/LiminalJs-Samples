import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { LiminalAuthAsync } from "../../../../../Helpers/LiminalAuth";
import { SendManyTransactionAsync } from "../../../../../Helpers/SendManyTransaction";
import { WalletInstanceAsync } from "../../../../../Helpers/WalletInstance";
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
            walletId:310,
            allToken:true,
            tokenOptions:{
                tokenName:"bat",
                tokenAddress:"0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99"
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
                        address:"0x7f17bE241F88530DA74F035E8b74125fFEDeA98D",
                        amount:0.00001
                    }
                ],
                sequenceId:sequenceId
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