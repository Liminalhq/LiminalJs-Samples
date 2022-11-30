import { CoinsEnum,LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GetAMLResultAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:aml
 * Docs => 
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
            walletId:3412 // Define Your Coin Wallet Here
        });

        // Step 3: Get AML Result.
        let response=await GetAMLResultAsync({
            walletInstance:walletInstance,
            getAMLOptions:{
                address:[
                    '0xdac17f958d2ee523a2206206994597c13d831ec7',
                    '0x4014c023192ef37a91adcea4ac2fdd90914bd76f'
                ]
            }
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