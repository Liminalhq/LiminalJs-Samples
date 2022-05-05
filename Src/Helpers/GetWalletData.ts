import { Wallet, WalletWrapper } from "@lmnl/liminaljs";

export interface IGetWalletDataOptions{
    walletInstance:Wallet
}

export const GetWalletDataAsync=async(params:IGetWalletDataOptions):Promise<WalletWrapper>=>{
    try
    {
        let walletWrapper:WalletWrapper=await params?.walletInstance?.GetWallet();

        return walletWrapper;
    }
    catch(ex)
    {
        throw ex;
    }
}