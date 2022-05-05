import { GetBalanceResultDataWrapper, Wallet } from "@lmnl/liminaljs";

export interface IGetBalanceOptions{
    walletInstance:Wallet;
}

export const GetWalletBalanceAsync=(params:IGetBalanceOptions):Promise<GetBalanceResultDataWrapper>=>{
    try
    {
        return params?.walletInstance?.GetBalance();
    }
    catch(ex)
    {
        throw ex;
    }
}