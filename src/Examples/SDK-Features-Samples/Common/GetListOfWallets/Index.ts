import { CoinsEnum, LiminalEnvironment, LiminalJs } from "@lmnl/liminaljs";
import { GetListOfWalletsAsync, LiminalAuthAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:glw
 * Docs => https://docs.lmnl.app/docs/list-wallet
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

        // Step 2: Get List of Wallets
        let walletList=await GetListOfWalletsAsync({
            coin:CoinsEnum.eth, // Define your Coin here
            liminalJs:liminalJs
        });

        if(walletList?.success===true){
            console.log(`Wallet List => ${JSON.stringify(walletList?.data)}`);
        }
        else
        {
            console.log(`Error => Wallet List => ${walletList?.message}`);
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