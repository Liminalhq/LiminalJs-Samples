import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GetAddressBalanceAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../../../Settings";

/**
 * Run Command => npm run start:gabp
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

        // Step 3 Get address balance => Pagination
        let response=await GetAddressBalanceAsync({
            walletInstance:walletInstance,
            getAddressBalanceOption:{
                pagination:{
                    pageNumber:1,
                    pageSize:100
                }
            }
        });

        if(response.success){
            console.log("Response =>", JSON.stringify(response.data?.AddressBalanceList));
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