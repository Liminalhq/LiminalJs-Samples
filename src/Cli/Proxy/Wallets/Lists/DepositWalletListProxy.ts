import PromptUI from "inquirer/lib/ui/prompt";
import inquirer from "inquirer";
import { CoinsEnum, WalletType } from "@lmnl/liminaljs";
import { WalletProxy } from "../Coins/WalletProxy";
import { IsEnvReadyMPC } from "../../../Shared/IsEnvReady";
import { GetCoinList } from "../../../Shared/CoinList";

export class DepositWalletListProxy{
    
    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private Inputs(): void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'list',
                                    name: 'deposit',
                                    message: 'select the coin =>',
                                    choices: GetCoinList(),
                                    
                                }
                            ]
                        );
    }

    public async Execute(): Promise<void>{
        try
        {
           this.Inputs();

           let answer=await this.question;

           let coinRaw:string=String(answer?.deposit)?.toLowerCase(); // get coin name from the List;
           let coin:CoinsEnum=CoinsEnum[coinRaw];

           let isMPCEnvReady:boolean=IsEnvReadyMPC(coinRaw.toUpperCase());

           let providerName=process?.env?.PROVIDER_NAME;

           if(isMPCEnvReady===true){

            let depositWalletProxy:WalletProxy=new WalletProxy();
                await depositWalletProxy.Execute({
                    coin:coin,
                    walletType:WalletType.Deposit,
                    cloudProvider:providerName
                });

           }
           else
           {
                throw new Error(`Missing .env data`);
           }
           
        }
        catch(ex)
        {
            throw ex;
        }
    }
}