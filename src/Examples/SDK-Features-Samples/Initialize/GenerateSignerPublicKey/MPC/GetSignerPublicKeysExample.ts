import { CloudProvider, GetSignerPublicKeyResultDataWrapper, LiminalEnvironment, LiminalJs } from "@lmnl/liminaljs";
import { GetSignerPublicKeyAsync, LiminalAuthAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, cloudProviderName, env,tsmCred } from "../../../../../Settings";

/**
 * Run Command : npm run start:psk-mpc
 */
const main=async(): Promise<void>=>{
    
    // Step 1: Auth
    let liminalJs:LiminalJs=await LiminalAuthAsync({
        liminalOptions:{
            clientId:clientId,
            clientSecret:clientSecretId
        },
        env:LiminalEnvironment[env]
    });

    //Step 2 : If you are using MPC
    let response:GetSignerPublicKeyResultDataWrapper[]=await GetSignerPublicKeyAsync({
        liminalJs:liminalJs,
        cloudProvider:CloudProvider[cloudProviderName],  // it should be MPC
        tsmCred:tsmCred 
    });

    console.log(`Signer Public Key Response => ${JSON.stringify(response)}`);
}

main()
.then(()=> console.log("Script Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
});