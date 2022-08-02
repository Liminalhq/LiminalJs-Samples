import { ConsolidateTxContextParamOptions, ConsolidateTxResultWrapper, SignedTransaction, tsmCreds, Wallet } from "@lmnl/liminaljs";

export interface IConsolidatedTransactionOptions{
    walletInstance:Wallet;
    sequenceId?:string;
    consolidateOptions?:ConsolidateTxContextParamOptions;
    tsmCred?:tsmCreds;
    callBackSequenceId?:()=>string
}

export const ConsolidatedTransactionAsync=async(params:IConsolidatedTransactionOptions): Promise<any | Array<any>>=>{
    let response:ConsolidateTxResultWrapper;
    let transactionResponseArray:any[];
    try
    {
        if(params?.walletInstance?.ParentChain?.toUpperCase()==="UTXO"){

            if(params?.consolidateOptions===undefined)
            {
                response=await params?.walletInstance?.ConsolidateTransaction({});
            }
            else if(params?.consolidateOptions!==undefined)
            {
                response=await params?.walletInstance?.ConsolidateTransaction(params?.consolidateOptions);
            }
    
            // SignTransaction
            let halfSigned:SignedTransaction=await params?.walletInstance?.SignTransaction(null, response.data);
    
            // Submit Transaction
            return params?.walletInstance?.Submit(halfSigned,params?.sequenceId); // Send Many Transaction

        }
        else if(params?.walletInstance?.ParentChain?.toUpperCase()==="EVM" || params?.walletInstance?.ParentChain?.toUpperCase()==="TRON")
        {
            //console.log("EVM call");
            if(params?.consolidateOptions!==undefined)
            {
                response=await params?.walletInstance?.ConsolidateTransaction(params?.consolidateOptions);
    
                if(response.success===true){
    
                    transactionResponseArray=new Array<any>();
    
                    for(let i=0;i< response.data.txHex.length;i++){

                        let data:any = JSON.parse(JSON.stringify(response.data.txHex[i]))
                        
                        // SignTransaction
                        let halfSigned:SignedTransaction=await params?.walletInstance.SignTransaction({
                            tsmCreds: params?.tsmCred
                        }, data);
                        
                        let sequenceId=params?.callBackSequenceId();
            
                        // Submit Transaction
                        let transactionResponse:any=await params?.walletInstance.Submit(halfSigned,sequenceId); // Send Many Transaction
                        
                        transactionResponseArray.push(transactionResponse);
                    }
                }
                else
                {
                    throw new Error(response.message);
                }
            }
            else
            {
                throw new Error('target Address is mandatory');
            }
    
            return transactionResponseArray;
        }
    }
    catch(ex)
    {
        throw ex;
    }
}