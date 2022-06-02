import { GetAddressBalanceOptions, GetAddressBalanceResultDataWrapper, Wallet } from "@lmnl/liminaljs"

export interface IGetAddressBalanceOptions{
    walletInstance:Wallet;
    getAddressBalanceOption:GetAddressBalanceOptions;
}

export const GetAddressBalanceAsync=async(params:IGetAddressBalanceOptions): Promise<GetAddressBalanceResultDataWrapper>=>{
    try
    {
        return await params?.walletInstance?.GetAddressBalance(params?.getAddressBalanceOption);
    }
    catch(ex){
        throw ex;
    }
}
