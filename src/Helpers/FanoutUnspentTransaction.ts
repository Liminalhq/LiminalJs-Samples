import { FanoutTxContextParamOptions, FanoutTxResultWrapper, SignedTransaction, Wallet } from "@lmnl/liminaljs";

export interface IFanoutUnspentTransactionOptions{
    walletInstance:Wallet;
    sequenceId:string;
    fanoutUnspentTransaction?:FanoutTxContextParamOptions;
}

export const FanoutUnspentTransactionAsync=async(params:IFanoutUnspentTransactionOptions): Promise<any>=>{
    let response:FanoutTxResultWrapper;
    try
    {
        if(params?.fanoutUnspentTransaction===undefined)
        {
            response=await params?.walletInstance.FanoutTransaction({});
        }
        else if(params?.fanoutUnspentTransaction!==undefined)
        {
            response=await params?.walletInstance?.FanoutTransaction(params?.fanoutUnspentTransaction);
        }

        // SignTransaction
        let halfSigned:SignedTransaction=await params?.walletInstance?.SignTransaction(null, response.data);

        // Submit Transaction
        return params?.walletInstance?.Submit(halfSigned,params?.sequenceId); // Send Many Transaction
    }
    catch(ex)
    {
        throw ex;
    }
}