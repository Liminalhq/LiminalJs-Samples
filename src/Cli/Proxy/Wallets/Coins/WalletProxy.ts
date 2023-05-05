import { CloudProvider, CoinsEnum, CreateWalletResultDataWrapper, LiminalEnvironment, WalletType } from "@lmnl/liminaljs";
import { CreateWalletAsync, LiminalAuthAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import Enumerable from "linq";
import { GetCoSignersEmailIds } from "../../../Shared/CLI/CoSignersEmailIdInput";
import { WriteEnvToFile } from "../../../Shared/SaveEnv";
var clc = require("cli-color");

export interface IWalletExecuteOptions{
    coin:CoinsEnum;
    walletType:WalletType;
    cloudProvider:string;
}

export class WalletProxy{

    public async Execute(params:IWalletExecuteOptions): Promise<void>{
        let walletId:number;
        let env:string=process?.env?.ENVIRONMENT;
        
        if(env==="test" || env==="dev")
        {
            // Get Co Signer Email Id
            if(params?.walletType===WalletType.Deposit)
            {
                walletId=await this.CreatePipelineWalletAsync(params?.coin,params?.walletType, ["dhruvil@lmnl.app","riya@lmnl.app"],params.cloudProvider);
            }
            else if(params?.walletType===WalletType.Withdrawal)
            {
                if(params.coin === CoinsEnum.dot){
                    walletId=await this.CreatePipelineWalletAsync(params?.coin,params?.walletType, ["sumant+devtest@lmnl.app","mansi@lmnl.app"],params?.cloudProvider);
                }
                else{
                    walletId=await this.CreatePipelineWalletAsync(params?.coin,params?.walletType, ["dhruvil@lmnl.app","mansi@lmnl.app"],params?.cloudProvider);
                }
            }
            
        }
        else if(env==="prod" || env==="beta")
        {
            // Get Co Signer Email Id
            let coSignerEmailId:string[]=await GetCoSignersEmailIds();
            walletId=await this.CreatePipelineWalletAsync(params?.coin,params?.walletType,coSignerEmailId,params?.cloudProvider);
        }

        if(walletId!==0){

            if(params?.walletType===WalletType.Withdrawal){

                WriteEnvToFile([
                    {
                        key:"WITHDRAWAL_WALLET_ID", // ETH Only
                        value:walletId!
                    }
                ]);
           
                process.env.WITHDRAWAL_WALLET_ID=String(walletId!);

            }
            else if(params?.walletType===WalletType.Deposit){
                WriteEnvToFile([
                    {
                        key:"DEPOSIT_WALLET_ID", // ETH Only
                        value:walletId!
                    }
                ]);
           
                process.env.DEPOSIT_WALLET_ID=String(walletId!);
            }
            
        }
    }

    private async CreatePipelineWalletAsync(coin:CoinsEnum, walletType:WalletType,coSignerEmailId?:string[],cloudProviderName?:string):Promise<number>{
        try
        {
            // Step 1: Auth
            let liminalJs=await LiminalAuthAsync({
                liminalOptions:{
                    clientId:process?.env?.CLIENT_ID,
                    clientSecret:process?.env?.CLIENT_SECRET_ID
                },
                env:LiminalEnvironment[process?.env?.ENVIRONMENT]
            });

            // Step 2: Generate Wallet
            let wallet:CreateWalletResultDataWrapper=await CreateWalletAsync({
                liminalJs:liminalJs,
                wallet:{
                    coin:coin,
                    walletType:walletType,
                    coSigners:coSignerEmailId
                },
                cloudProvider:CloudProvider[cloudProviderName]
            });

            if(wallet.success===true){
                
                for(let walletData of wallet.data){
                    
                    console.log(`############################################################`);
                    console.log(`Wallet Id => ${walletData?.walletId}`);
                    console.log(`Wallet Address => ${walletData?.walletAddress}`);
                    console.log(`Wallet Type => ${walletData?.type}`);
                    console.log(`Wallet Type => ${walletData?.subType}`);
                    console.log(`Wallet Chain => ${walletData?.chain}`);
                    console.log(`Wallet Coin => ${walletData?.coin}`);
                    console.log(`Wallet ParentChain => ${walletData?.parentChain}`);
                    console.log(`Wallet Message => ${walletData?.message}`);
                    console.log(`############################################################`);
                }
                
                let walletData=Enumerable.from(wallet.data)
                                         .firstOrDefault((element)=>element.chain==="ETH" && element.coin==="ETH");
                                         
                if(walletData!==undefined){

                    if(walletData?.walletId!==-1){
                        return walletData.walletId;
                    }
                    else
                    {
                        return 0;
                    }
                }
                else
                {
                    return 0;
                }
                                         
            }
            else
            {
                console.log(`Error Message => ${wallet.message}`);
                return 0;
            }

            
        }
        catch(ex)
        {
            console.log(
                clc.red(
                    ex?.message
                )
            );
        }

        return 0;
    }

}