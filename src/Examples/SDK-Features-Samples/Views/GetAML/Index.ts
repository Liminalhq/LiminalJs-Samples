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
            walletId:310 // Define Your Coin Wallet Here
        });

        // Step 3: Get wallet Balance
        let response=await GetAMLResultAsync({
            walletInstance:walletInstance,
            getAMLOptions:{
                address:[
                    '0x4d48A762909c363f9264De2cD112F2D1eB0e83dc',
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