import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { ApproxFeesRateAsync, ApproxFeesResponseDataResult } from "../../../../Helpers/ApproxFeeRate";
import { LiminalAuthAsync } from "../../../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:af
 * Docs => https://docs.lmnl.app/docs/get-approx-fees
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
            coin:CoinsEnum.eth,  // Define Your Coin Here
            walletId:310 // Define your Coin Wallet Here
        }); 

        // Step 3:
        let approxFeesResponseDataResult:ApproxFeesResponseDataResult=await ApproxFeesRateAsync({
            walletInstance:walletInstance
        });

        console.log(`Fees Details =>${JSON.stringify(approxFeesResponseDataResult)}`);
        
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