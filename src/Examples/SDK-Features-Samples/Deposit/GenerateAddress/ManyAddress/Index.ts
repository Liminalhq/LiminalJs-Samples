import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GenerateManyAddressAsync, LiminalAuthAsync, PathIndex, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId,env, tsmCred } from "../../../../../Settings";


/**
 * Run Command => npm run start:gam-deposit
 * Docs => https://docs.lmnl.app/docs/generate-many-address
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

        if(walletInstance.WalletType==="Deposit")
        {

            // Set Path Index
            let pathIndex:PathIndex={
                startIndex:0,
                endIndex:10
            };


            let response;
            if(tsmCred!==undefined){
                // Step 3 Generate Address
                response=await GenerateManyAddressAsync({
                    path:pathIndex,
                    walletInstance:walletInstance,
                    tsmCred:tsmCred
                });
            }
            else
            {
                // Step 3 Generate Address
                response=await GenerateManyAddressAsync({
                    path:pathIndex,
                    walletInstance:walletInstance,
                });
            }

            for(let counter=pathIndex?.startIndex;counter<=pathIndex?.endIndex;counter++){
        
                let nextIterator=await response?.next();
        
                if(nextIterator.done===false){
        
                    if(nextIterator?.value?.success===true)
                    {
                        console.log("Address Type =>",JSON.stringify(response?.data));
                        console.log(`Address Path m/0/${counter} => ${nextIterator?.value?.data?.address}`);
                    }
                    else
                    {
                        console.log(`Error => Address Type => ${response?.message}`);
                    }
                }
            }
        }
        else
        {
            console.log(`Only support for Deposit Wallet`);
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