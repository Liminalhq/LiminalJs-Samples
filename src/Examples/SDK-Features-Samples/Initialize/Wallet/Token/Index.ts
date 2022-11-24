import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync,WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../../Settings";


/**
 * Run Command => npm run start:start:wt
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
            walletId:3520, // Define Your Coin Wallet Id Here
            allToken:true,
            tokenOptions:{ // Define Your Token
                tokenName: "dai",
                tokenAddress: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60"
            }
        });

        if(walletInstance!=undefined){
            console.log(`Wallet instance created`);
        }
        else
        {
            console.log(`Something went wrong.`);
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