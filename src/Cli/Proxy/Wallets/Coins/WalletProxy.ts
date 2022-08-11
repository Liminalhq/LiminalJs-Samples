import { CoinsEnum, CreateWalletResultDataWrapper, LiminalEnvironment, WalletType } from "@lmnl/liminaljs";
import Enumerable from "linq";
import { CreateWalletAsync } from "../../../../Helpers/CreateWallet";
import { LiminalAuthAsync } from "../../../../Helpers/LiminalAuth";
import { ContinueMain } from "../../../Shared/CLI/ContinueMain";
import { GetCoSignersEmailIds } from "../../../Shared/CLI/CoSignersEmailIdInput";
import { WriteEnvToFile } from "../../../Shared/SaveEnv";
var clc = require("cli-color");

export interface IWalletExecuteOptions{
    coin:CoinsEnum;
    walletType:WalletType;
}

export class WalletProxy{

    public async Execute(params:IWalletExecuteOptions): Promise<void>{
        let walletId:number;
        let env:string=process?.env?.ENVIRONMENT;
        
        if(env==="test" || env==="dev")
        {
            // Get Co Signer Email Id
            walletId=await this.CreatePipelineWalletAsync(params?.coin,params?.walletType, []);
        }
        else if(env==="prod")
        {
            // Get Co Signer Email Id
            let coSignerEmailId:string[]=await GetCoSignersEmailIds();
            walletId=await this.CreatePipelineWalletAsync(params?.coin,params?.walletType,coSignerEmailId);
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

    private async CreatePipelineWalletAsync(coin:CoinsEnum, walletType:WalletType,coSignerEmailId?:string[]):Promise<number>{
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
                }
            });

            if(wallet.success===true){
                
                console.log(`Wallet Response =>`, JSON.stringify(wallet.data));
                
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