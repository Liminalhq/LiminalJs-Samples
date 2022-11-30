import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GetAddressBalanceAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../../../Settings";

/**
 * Run Command => npm run start:gabt
 * Docs => https://docs.lmnl.app/docs/get-address-balance
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
            walletId:3412 // Define your coin wallet id here.
        });

        // Step 3 Get address balance by passing address
        let response=await GetAddressBalanceAsync({
            walletInstance:walletInstance,
            getAddressBalanceOption:{
                address:"0x2e73f21c7ea4ef53bc17a5c06e0cf1a168b85464", // Define address
                isTokenBalance:true
            }
        });

        if(response.success){
            console.log("Response =>", JSON.stringify(response?.data?.AddressBalance));
        }
        else
        {
            console.log("Error => ", JSON.stringify(response.message));
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