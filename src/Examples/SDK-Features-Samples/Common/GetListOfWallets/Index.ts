import { CoinsEnum, LiminalEnvironment, LiminalJs, WalletsWrapper } from "@lmnl/liminaljs";
import { GetListOfWalletsAsync } from "../../../../Helpers/GetListOfWallets";
import { LiminalAuthAsync } from "../../../../Helpers/LiminalAuth";
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
        let walletList:WalletsWrapper[]=await GetListOfWalletsAsync({
            coin:CoinsEnum.eth, // Define your Coin here
            liminalJs:liminalJs
        });

        console.log(`Wallet List => ${JSON.stringify(walletList)}`);
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