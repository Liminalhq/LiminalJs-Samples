import { AddressType, Wallet, WalletResult } from "@lmnl/liminaljs";

export interface IGenerateAddressOptions{
    walletInstance:Wallet;
    path:number
}

export const GenerateAddressAsync=async (params:IGenerateAddressOptions):Promise<AddressType>=>{
    try
    {
        let walletResult:WalletResult=(await params?.walletInstance?.GetWallet()).Result;

        return await params?.walletInstance?.GenerateAddress(walletResult,params?.path);
    }
    catch(ex)
    {
        throw ex;
    }
}