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
            walletId:310, // Define Your Coin Wallet Here
            allToken:true,
            tokenOptions:{                        // If you need Token Balance
                tokenName:"bat",
                tokenAddress:"0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99"
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