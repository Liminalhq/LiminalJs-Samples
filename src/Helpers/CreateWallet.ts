import { CloudProvider, CoinsEnum, CreateWalletResultDataWrapper, CreateWalletsOptions, GenerateWalletResultDataWrapper, LiminalJs, WalletType } from "@lmnl/liminaljs";

export interface IWalletOptions{
    coin:CoinsEnum;
    walletType:WalletType;
    coSigners?:string[]
}

export interface ICreateWalletOptions{
    liminalJs:LiminalJs;
    wallet:IWalletOptions;
}


export const CreateWalletAsync=async(params:ICreateWalletOptions): Promise<CreateWalletResultDataWrapper>=>{

    try{
        
        let walletResponse:CreateWalletResultDataWrapper=await params?.liminalJs?.CreateWallet([
            {
                baseCoin:params?.liminalJs?.Coin(params?.wallet?.coin),
                createWalletRequest:{
                    walletType:params?.wallet.walletType,
                    coSigners:params?.wallet?.coSigners
                }
            }
        ]);

        return walletResponse;

    }
    catch(ex)
    {
        throw ex;
    }
}