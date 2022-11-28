import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GenerateAddressAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, depositWalletId, env, tsmCred } from "../../../../Settings";


/**
 * Run Command => npm run start:ga-deposit
 * Docs => https://docs.lmnl.app/docs/generate-address
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
            coin:CoinsEnum.eth, // Define your coin here.
            walletId:3414 // Define your coin wallet id here
        });

        let response;
        if(tsmCred!==undefined){
            // Step 3 Generate Address
            response=await GenerateAddressAsync({
                path:0,
                walletInstance:walletInstance,
                tsmCred:tsmCred
            });
        }
        else
        {
            // Step 3 Generate Address
            response=await GenerateAddressAsync({
                path:0,
                walletInstance:walletInstance,
            });
        }


        if(response?.success===true){
            console.log("Address Type =>",JSON.stringify(response?.data));
        }
        else
        {
            console.log(`Error => Address Type => ${response?.message}`);
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