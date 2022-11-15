import inquirer from "inquirer";
import PromptUI from "inquirer/lib/ui/prompt";
import { ContinueWallet } from "../../Shared/CLI/ContinueWallet";
import { IsEnvReady } from "../../Shared/IsEnvReady";
import { DepositWalletListProxy } from "./Lists/DepositWalletListProxy";
import { WithdrawalWalletListProxy } from "./Lists/WithdrawalWalletListProxy";
//let clc=require("cli-color");
export class GenerateWalletCliProxy{

    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private Inputs(): void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'list',
                                    name: 'walletType',
                                    message: 'select Wallet type =>',
                                    choices: [
                                        'Deposit',
                                        'Withdrawal'
                                    ],
                                    
                                }
                            ]
                        );
    }

    public async Execute(): Promise<void>{
        try
        {
            
            let flag:boolean=IsEnvReady();

            if(flag===false){
                throw new Error(`Missing .env data`);
            }

            this.Inputs();

            let answer=await this.question;
            //console.log(JSON.stringify(answer));

            if(answer.walletType==="Deposit"){
                let depositWalletListProxy:DepositWalletListProxy=new DepositWalletListProxy();
                    await depositWalletListProxy?.Execute();
            }
            else if(answer.walletType==="Withdrawal"){
                let withdrawalWalletListProxy:WithdrawalWalletListProxy=new WithdrawalWalletListProxy();
                    await withdrawalWalletListProxy?.Execute();
            }
            

            await ContinueWallet();
        }
        catch(ex){
            throw ex;
        }
    }
}