import { tsmCreds, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { ConsolidatedTransactionAsync } from "../Helpers/ConsolidateTransaction";
import { consolidateTransactionInterval } from "../Settings";
const schedule = require('node-schedule');

export interface IConsolidateTransactionOptions{
    walletInstance:Wallet;
    tsmCred?:tsmCreds;
    targetAddress?:string;
}

export const ConsolidateTransactionAsync=async(params:IConsolidateTransactionOptions): Promise<void>=>{


    // immediate Execute 
    let transactionResponse:any[]=await ConsolidatedTransactionAsync({
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

    console.log("Transaction Response =>",JSON.stringify(transactionResponse));
    

    // Run Consolidated Transaction Script as per the scheduleJob
    const hours=Number(consolidateTransactionInterval);
    const interval=`0 0 */${hours} * * *`;
    schedule.scheduleJob(interval,async()=> {

        let transactionResponse:any[]=await ConsolidatedTransactionAsync({
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

        console.log("Transaction Response =>",JSON.stringify(transactionResponse));

    });

}