import { Wallet } from "@lmnl/liminaljs";
import { ResendEVMTransactionAsync } from "../Helpers/ResendEVMTransaction";

export interface IResendTransactionOptions{
    walletInstance:Wallet;
    sleepInMilliseconds:number
}

export const ResendTransaction=async(params:IResendTransactionOptions) : Promise<void>=>{
    try
    {
        let walletInstance:Wallet=params?.walletInstance;

        await ResendEVMTransactionAsync({
            walletInstance:walletInstance,
            walletIdList:[Number(params?.walletInstance?.WalletId)],
            sleepInMilliseconds:params?.sleepInMilliseconds // 1 Min
        });
    }
    catch(ex)
    {
        throw ex;
    }
}