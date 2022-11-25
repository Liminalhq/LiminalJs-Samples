import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { LiminalAuthAsync, UnBlockUTXOAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { clientId, clientSecretId, env } from "../../../../Settings";

/**
 * Run Command => npm run start:unblock-utxo
 * Docs => https://docs.lmnl.app/docs/unblock-utxo-transaction
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
            coin:CoinsEnum.ltc,
            walletId:296
        }); 


        // Step 3:UnBlock UTXO
        if(walletInstance?.ParentChain==="UTXO"){
            
            let response=await UnBlockUTXOAsync({
                walletInstance:walletInstance,
                unBlockUtxoOption:{
                    hash:"3dd3795d48b05eb26fa0563f1127f83fc6b4cd79a0d2968199d77d4e2b3f4c36",
                    pos:2
                }
            });
    
            if(response?.success===true){
                console.log(`Success => ${response?.data?.message}`);
                console.log(`Success Response => ${JSON.stringify(response)}`)
            }
            else
            {
                console.log(`Error Code => ${response?.code}`);
                console.log(`fail => ${response?.message}`);
            }
        }
        else
        {
            console.log(`only support for UTXO base chain`);
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