import PromptUI from "inquirer/lib/ui/prompt";
import inquirer from "inquirer";
import { CoinsEnum, WalletType } from "@lmnl/liminaljs";
import { WalletProxy } from "../Coins/WalletProxy";
import { GetCoinList } from "../../../Shared/CoinList";

export class WithdrawalWalletListProxy{
    
    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private Inputs(): void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'list',
                                    name: 'withdrawal',
                                    message: 'select the coin =>',
                                    choices: GetCoinList(),
                                    
                                }
                            ]
                        );
    }

    public async Execute(): Promise<void>{
        try
        {
           let providerName=process?.env?.PROVIDER_NAME;
        //    if(providerName==="MPC")
        //    {
        //         throw new Error(`Creation of withdrawal wallet using MPC is not supported. Kindly run Quick Onboarding AWS or Azure Command from the main menu Or If you are already onboarded through AWS or Azure then close the CLI and then change the provider name from "MPC" to "AWS" or "Azure" in the .env file.`);
        //    }

           this.Inputs();

           let answer=await this.question;

           let coinRaw:string=String(answer?.withdrawal)?.toLowerCase(); // get coin name from the List;
           let coin:CoinsEnum=CoinsEnum[coinRaw];

           let withDrawalWalletProxy:WalletProxy=new WalletProxy();
               await withDrawalWalletProxy.Execute({
                coin:coin,
                walletType:WalletType.Withdrawal,
                cloudProvider:providerName
            });    
        }
        catch(ex)
        {
            throw ex;
        }
    }
}