import { CoinsEnum, GenerateMPCKeyIDResultWrapper, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GenerateMPCKeyIdAsync } from "../../Helpers/GenerateMPCKeyId";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../Helpers/WalletInstance";
import { clientId, clientSecretId, depositWalletId, env, tsmCred } from "../../Settings";

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

        // Step 3:Generate MPC Key Id
        let response:GenerateMPCKeyIDResultWrapper=await GenerateMPCKeyIdAsync({
            walletInstance:walletInstance,
            tsmCred:tsmCred
        });

        console.log("Key ID Data: => ", JSON.stringify(response));
       
    }
    catch(ex)
    {
        throw ex;
    }
}

main()
.then(()=> console.log("Script Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
})