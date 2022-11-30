import { CoinsEnum,LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GetWalletBalanceAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:gtb
 * Docs => https://docs.lmnl.app/docs/get-balance-1
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
            coin:CoinsEnum.eth, // Define your Coin Here
            walletId:3412, // Define Your Coin Wallet Here
            allToken:true,
            tokenOptions:{                        // If you need Token Balance
                tokenName:"dai",
                tokenAddress:"0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60"
            },
           
        });

        // Step 3: Get wallet Balance
        let response=await GetWalletBalanceAsync({
            walletInstance:walletInstance
        });

        if(response?.success===true){
            console.log("Response =>", JSON.stringify(response?.data));
        }
        else
        {
            console.log(`Error => Response => ${response?.message}`);
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