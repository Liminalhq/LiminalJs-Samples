import { AddressType, CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GenerateAddressAsync } from "../../Helpers/GenerateAddress";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../Helpers/WalletInstance";
import { clientId, clientSecretId, depositWalletId, env } from "../../Settings";


/**
 * Run Command => npm run start:ga
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
            coin:CoinsEnum.eth,
            walletId:Number(depositWalletId)
        });

        // Step 3 Generate Address
        let address:AddressType=await GenerateAddressAsync({
            path:0,
            walletInstance:walletInstance
        });

        console.log("Address Type =>",JSON.stringify(address));
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