import {  CoinsEnum, LiminalJs, WalletsWrapper } from "@lmnl/liminaljs";

export interface IGetListOfWallets{
    liminalJs:LiminalJs;
    coin:CoinsEnum
}

export const GetListOfWalletsAsync=(params:IGetListOfWallets):Promise<WalletsWrapper[]>=>{
    try
    {
        return params?.liminalJs
                        ?.Coin(params?.coin)
                        ?.Wallets()
                        ?.WalletList();

    }
    catch(ex)
    {
        throw ex;
    }
}