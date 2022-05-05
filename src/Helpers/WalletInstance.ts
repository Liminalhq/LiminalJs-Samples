import { CoinsEnum, LiminalJs, TokenAddressOptions, Wallet } from "@lmnl/liminaljs";

export interface IWalletInstanceOptions{
    liminalJs:LiminalJs;
    coin:CoinsEnum;
    walletId:number;
    allToken?:boolean;
    tokenOptions?:TokenAddressOptions;
}

export const WalletInstanceAsync=(params:IWalletInstanceOptions):Promise<Wallet>=>{
    let wallet:Promise<Wallet>=undefined;
    try
    {
        if(params?.tokenOptions===undefined){
            // Get Native COIN
            wallet=params?.liminalJs
                                ?.Coin(params?.coin)
                                ?.Wallets()
                                ?.Get({
                                    walletId:params?.walletId,
                                    allTokens:params?.allToken
                                });
        

        }
        else if(params?.tokenOptions!==undefined){

            // Get Tokens 
            wallet=params?.liminalJs
                        ?.Coin(params?.coin)
                        ?.Token(params?.tokenOptions)
                        ?.Wallets()
                        ?.Get({
                            walletId:params?.walletId,
                            allTokens:params?.allToken
                        });
        }
        return wallet;
    }
    catch(ex)
    {
        throw ex;
    }
}