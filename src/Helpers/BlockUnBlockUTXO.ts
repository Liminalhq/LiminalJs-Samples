import { BlockUtxoOptions, BlockUtxoResultDataWrapper, UnBlockUtxoOptions, UnBlockUtxoResultDataWrapper, Wallet } from "@lmnl/liminaljs";

export interface IBlockUTXOOptions{
    walletInstance:Wallet;
    blockUtxoOptions:BlockUtxoOptions;
}

export const BlockUTXOAsync=(params:IBlockUTXOOptions) : Promise<BlockUtxoResultDataWrapper>=>{
    try
    {
        return params?.walletInstance?.BlockUTXO(params?.blockUtxoOptions);
    }
    catch(ex)
    {
        throw ex;
    }
}

export interface IUnBlockUTXOOptions{
    walletInstance:Wallet;
    unBlockUtxoOption:UnBlockUtxoOptions;
}

export const UnBlockUTXOAsync=(params:IUnBlockUTXOOptions) : Promise<UnBlockUtxoResultDataWrapper>=>{
    try
    {
        return params?.walletInstance?.UnBlockUTXO(params?.unBlockUtxoOption);
    }
    catch(ex)
    {
        throw ex;
    }
}