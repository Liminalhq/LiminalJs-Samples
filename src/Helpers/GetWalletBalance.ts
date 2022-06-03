import { GetBalanceResultDataWrapper, Wallet } from "@lmnl/liminaljs";

export interface IGetBalanceOptions{
    walletInstance:Wallet;
}

export const GetWalletBalanceAsync=async(params:IGetBalanceOptions):Promise<GetBalanceResultDataWrapper>=>{
    try
    {
        return await params?.walletInstance?.GetBalance();
    }
    catch(ex)
    {
        throw ex;
    }
}