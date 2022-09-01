import { PushRefillTxResultWrapper, Wallet } from "@lmnl/liminaljs";

export interface IPushRefillTransactionOptions{
    walletInstance:Wallet;
}

export const PushRefillTransactionAsync=(params:IPushRefillTransactionOptions):Promise<PushRefillTxResultWrapper>=>{
    try
    {
        return params?.walletInstance?.PushRefillTransaction();
    }
    catch(ex)
    {
        throw ex;
    }
}