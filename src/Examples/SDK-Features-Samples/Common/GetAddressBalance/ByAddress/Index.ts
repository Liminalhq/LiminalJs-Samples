import { CoinsEnum, GetAddressBalanceResultDataWrapper, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GetAddressBalanceAsync } from "../../../../../Helpers/GetAddressBalance";
import { LiminalAuthAsync } from "../../../../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../../../../Helpers/WalletInstance";
import { clientId, clientSecretId, env } from "../../../../../Settings";

/**
 * Run Command => npm run start:gab
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
            walletId:310 // Define your coin wallet id here.
        });

        // Step 3 Get address balance by passing address
        let response:GetAddressBalanceResultDataWrapper=await GetAddressBalanceAsync({
            walletInstance:walletInstance,
            getAddressBalanceOption:{
                address:"0x4014c023192ef37a91adcea4ac2fdd90914bd76f" // Define address
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