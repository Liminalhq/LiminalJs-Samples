import { CloudProvider, GetSignerPublicKeyResultDataWrapper, LiminalEnvironment, LiminalJs, WalletType } from "@lmnl/liminaljs";
import { GetSignerPublicKeyAsync } from "../../Helpers/GetPublicSignerKeys";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { clientId, clientSecretId, cloudProviderName, env,tsmCred } from "../../Settings";

const main=async(): Promise<void>=>{
    
    // Step 1: Auth
    let liminalJs:LiminalJs=await LiminalAuthAsync({
        liminalOptions:{
            clientId:clientId,
            clientSecret:clientSecretId
        },
        env:LiminalEnvironment[env]
    });

    // Step 2: Generate Public Signer Keys
    let response:GetSignerPublicKeyResultDataWrapper[]=await GetSignerPublicKeyAsync({
        liminalJs:liminalJs,
        cloudProvider:CloudProvider[cloudProviderName]
    });

    console.log(`Signer Public Key Response => ${JSON.stringify(response)}`);

    // Step 2 : If you are using MPC
    // let response:GetSignerPublicKeyResultDataWrapper[]=await GetSignerPublicKeyAsync({
    //     liminalJs:liminalJs,
    //     cloudProvider:CloudProvider[cloudProviderName],  // it should be MPC
    //     tsmCred:tsmCred 
    // });

    // console.log(`Signer Public Key Response => ${JSON.stringify(response)}`);
}

main()
.then(()=> console.log("Script Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
});