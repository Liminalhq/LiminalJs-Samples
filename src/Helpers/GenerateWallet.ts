import { CloudProvider, CoinsEnum, GenerateWalletResultDataWrapper, LiminalJs, WalletType } from "@lmnl/liminaljs";

export interface IWalletOptions{
    name:string;
    coin:CoinsEnum;
    walletType:WalletType;
}

export interface ISignersOptions{
    keyId:string;
    type:CloudProvider;
}

export interface IGenerateWalletOptions{
    liminalJs:LiminalJs;
    wallet:IWalletOptions;
    signers:ISignersOptions[];
}


export const GenerateWalletAsync=async(params:IGenerateWalletOptions): Promise<GenerateWalletResultDataWrapper>=>{

    try{

        params.liminalJs.Coin(params?.wallet?.coin);

        let wallet:GenerateWalletResultDataWrapper=await params.liminalJs.GenerateWallet({
            wallet:{
                name:params?.wallet?.name,
                walletType:params?.wallet?.walletType
            },
            signers:params?.signers
        });

        return wallet;

    }
    catch(ex)
    {
        throw ex;
    }
}