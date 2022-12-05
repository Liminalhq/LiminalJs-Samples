import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GetWalletDataAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../Settings";


/**
 * Run Command => npm run start:gwd
 * Docs => https://docs.lmnl.app/docs/get-wallet-data
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
            coin:CoinsEnum.eth, // Define your coin here
            walletId:3412, // Define your coin here
            allToken:true  // Specify if your coin is EVM or TRON base otherwise do not include this property.
        });

        // Step 3: Get Wallet Data
        let walletData=await GetWalletDataAsync({
            walletInstance:walletInstance
        });

        if(walletData?.success===true){

            // Get Data
            console.log(`Wallet Data => ${JSON.stringify(walletData?.data?.Data)}`);

            // Get Result(Liminal)
            console.log(`Wallet Data => ${JSON.stringify(walletData?.data?.Result)}`);

            // Get Wallet Id
            console.log(`Wallet Id => ${walletInstance?.WalletId}`);

            // Get Wallet Address
            console.log(`Wallet Address => ${walletInstance?.WalletAddress}`);

            // Get Coin Name
            console.log(`Coin Name => ${walletInstance?.Coin}`);

            // Get Chain Name
            console.log(`Chain Name => ${walletInstance?.Chain}`);

            // Get parent chain
            console.log(`Parent Chain => ${walletInstance?.ParentChain}`);

            // Get Wallet Type
            console.log(`Wallet Type => ${walletInstance?.WalletType}`);
        }
        else
        {
            console.log(`Error => Wallet Data => ${JSON.stringify(walletData?.message)}`);
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