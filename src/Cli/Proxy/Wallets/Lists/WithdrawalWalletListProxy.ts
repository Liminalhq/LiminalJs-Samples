import PromptUI from "inquirer/lib/ui/prompt";
import inquirer from "inquirer";
import { CoinsEnum, WalletType } from "@lmnl/liminaljs";
import { WalletProxy } from "../Coins/WalletProxy";

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
                                    choices: [
                                        'BTC',
                                        'LTC',
                                        'BSC',
                                        'ETH',
                                        'MATIC',
                                        'TRX',
                                        'XRP',
                                        'BNB'
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

           let coinRaw:string=String(answer?.withdrawal)?.toLowerCase(); // get coin name from the List;
           let coin:CoinsEnum=CoinsEnum[coinRaw];

           let withDrawalWalletProxy:WalletProxy=new WalletProxy();
               await withDrawalWalletProxy.Execute({
                coin:coin,
                walletType:WalletType.Withdrawal
               });
        }
        catch(ex)
        {
            throw ex;
        }
    }
}