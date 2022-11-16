import { CoinsEnum, LiminalEnvironment, LiminalJs, tsmCreds, Wallet } from "@lmnl/liminaljs";
import { clientId, clientSecretId, consolidateTransactionInterval, depositWalletId, env, targetAddress, tsmCred } from "../../../Settings";
import { Guid } from "guid-typescript";
import { ConsolidatedTransactionAsync, LiminalAuthAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";

const schedule = require('node-schedule');

/**
 * Run Command : npm run start:ct
 */

export const main=async():Promise<void>=>{

    try
    {
        // Step 1: Auth
        let liminalJs:LiminalJs=await LiminalAuthAsync({
            liminalOptions:{
                clientId:clientId,
                clientSecret: clientSecretId
            },
            env:LiminalEnvironment[env]
        });

        // Native Coin Consolidate Transaction
        // Step 2: Get Wallet Instance
        let walletInstance:Wallet=await WalletInstanceAsync({
            liminalJs:liminalJs,
            coin:CoinsEnum.eth,
            walletId:Number(depositWalletId)
        });

        // Step 3: Consolidate Send Transaction
        ConsolidateTransactionAsync({
            walletInstance:walletInstance,
            targetAddress:targetAddress,
            tsmCred:tsmCred
        });

        // Token Consolidate Transaction
        // let walletInstance:Wallet=await WalletInstanceAsync({
        //     liminalJs:liminalJs,
        //     coin:CoinsEnum.eth,
        //     walletId:Number(depositWalletId),
        //     tokenOptions:{
        //         tokenName:"bat",
        //         tokenAddress:"0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99"
        //     }
        // });

        // // Step 3: Consolidate Send Transaction
        // ConsolidateTransactionAsync({
        //     walletInstance:walletInstance,
        //     targetAddress:targetAddress,
        //     tsmCred:tsmCred,
        // });
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
});



export interface IConsolidateTransactionOptions{
    walletInstance:Wallet;
    tsmCred?:tsmCreds;
    targetAddress?:string;
}

const ConsolidateTransactionAsync=async(params:IConsolidateTransactionOptions): Promise<void>=>{


    // immediate Execute 
    let transactionResponse=await ConsolidatedTransactionAsync({
        walletInstance:params?.walletInstance,
        tsmCred:params?.tsmCred,
        consolidateOptions:{
            targetAddress: params?.targetAddress
        },
        callBackSequenceId:()=> {
            
            let guid:string=Guid.create().toString()

            console.log(`guiId => ${guid}`)
            return guid;
        }
    });

    if(transactionResponse?.success===true){
        console.log("Transaction Response =>",JSON.stringify(transactionResponse));
    }
    else
    {
        console.log(`Error => Transaction Response => ${transactionResponse?.message}`);
    }
        
    // Run Consolidated Transaction Script as per the scheduleJob
    const hours=Number(consolidateTransactionInterval);
    const interval=`0 0 */${hours} * * *`;
    schedule.scheduleJob(interval,async()=> {

        let transactionResponse=await ConsolidatedTransactionAsync({
            walletInstance:params?.walletInstance,
            tsmCred:params?.tsmCred,
            consolidateOptions:{
                targetAddress: params?.targetAddress
            },
            callBackSequenceId:()=> {
                
                let guid:string=Guid.create().toString()

                console.log(`guiId => ${guid}`)
                return guid;
            }
        });

        if(transactionResponse?.success===true){
            console.log("Transaction Response =>",JSON.stringify(transactionResponse));
        }
        else
        {
            console.log(`Error => Transaction Response => ${transactionResponse?.message}`);
        }
    });

}