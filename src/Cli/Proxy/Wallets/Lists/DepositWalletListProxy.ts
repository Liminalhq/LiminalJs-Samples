import PromptUI from "inquirer/lib/ui/prompt";
import inquirer from "inquirer";
import { CoinsEnum, WalletType } from "@lmnl/liminaljs";
import { WalletProxy } from "../Coins/WalletProxy";

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
                                    choices: [
                                        'BTC',
                                        'LTC',
                                        'BSC',
                                        'ETH',
                                        'MATIC',
                                        'TRX',
                                        'XRP',
                                        'BNB',
                                        "UMLG",
                                        "UATOM",
                                        "BCH"
                                    ],
                                    
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

           let depositWalletProxy:WalletProxy=new WalletProxy();
               await depositWalletProxy.Execute({
                coin:coin,
                walletType:WalletType.Deposit
               });
        }
        catch(ex)
        {
            throw ex;
        }
    }
}