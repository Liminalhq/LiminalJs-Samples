import { LiminalEnvironment, LiminalJs } from "@lmnl/liminaljs";
import { LiminalAuthAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:gtlp
 * Docs => https://docs.lmnl.app/docs/authentication
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


        if(liminalJs!==undefined){
            console.log(`LiminalJs instance is created`);
        }
        else
        {
            console.log(`something went wrong`);
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