import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet, WalletsWrapper } from "@lmnl/liminaljs";
import { GetWalletDataAsync } from "../../../../Helpers/GetWalletData";
import { LiminalAuthAsync } from "../../../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env } from "../../../../Settings";


/**
 * Run Command => npm run start:gwd
 * Docs => https://docs.lmnl.app/docs/wallet
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
            walletId:310, // Define your coin here
            allToken:true  // Specify if your coin is EVM or TRON base otherwise do not include this property.
        });

        // Step 3: Get Wallet Data
        let walletData:WalletsWrapper=(await GetWalletDataAsync({
            walletInstance:walletInstance
        }))?.Data;

        console.log(`Wallet Data => ${JSON.stringify(walletData)}`);
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