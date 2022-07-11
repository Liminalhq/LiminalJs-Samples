import { CloudProvider, CoinsEnum, GenerateWalletResultDataWrapper, LiminalEnvironment, LiminalJs, WalletType } from "@lmnl/liminaljs";
import inquirer from "inquirer";
import PromptUI from "inquirer/lib/ui/prompt";
import { GenerateWalletAsync } from "../../Helpers/GenerateWallet";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { ContinueMain } from "../Shared/CLI/ContinueMain";
import { WriteEnvToFile } from "../Shared/SaveEnv";


let clc=require("cli-color");

export interface IWalletOption{
    walletName:string;
}

export class GenerateWalletCliProxy{

    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private Inputs(): void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'list',
                                    name: 'wallet',
                                    message: 'select Wallet type =>',
                                    choices: [
                                        'ETH-Withdrawal-Wallet'
                                    ],
                                    
                                },
                                {
                                    type: 'input',
                                    name: 'walletName',
                                    message: 'Wallet Name =>',
                                    validate(value){
                                        if(value===undefined || value===null || value===''){
                                            return "Wallet name is required"
                                         }  
                                         else
                                         {
                                            return true;
                                         }
                                    }
                                }
                            ]
                        );
    }

    private async GenerateWithdrawalETHWalletAsync(params:IWalletOption):Promise<number>{
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
            let wallet:GenerateWalletResultDataWrapper=await GenerateWalletAsync({
                liminalJs:liminalJs,
                wallet:{
                    name:params?.walletName,
                    coin:CoinsEnum.eth,
                    walletType:WalletType.Withdrawal
                },
                signers:[
                    {
                        keyId:process?.env?.DEFAULT_KEY_ID,
                        type:CloudProvider[process?.env?.PROVIDER_NAME]
                    }
                ]
            });

            if(wallet.success===true){
                console.log(`Wallet Response =>`, JSON.stringify(wallet.data));
                return wallet?.data?.walletId;
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
                clc.green(
                    ex?.message
                )
            );
        }

        return 0;
    }

    public async Execute(): Promise<void>{
        try
        {
            this.Inputs();

            let answer=await this.question;
            console.log(JSON.stringify(answer));

            let walletNumber:number=0;

            if(answer.wallet==="ETH-Withdrawal-Wallet"){
                walletNumber=await this.GenerateWithdrawalETHWalletAsync({
                    walletName:answer?.walletName
                });
            }

            if(walletNumber!==0){

                WriteEnvToFile([
                    {
                        key:"WITHDRAWAL_WALLET_ID",
                        value:walletNumber!
                    }
                ]);
               
                process.env.WITHDRAWAL_WALLET_ID=String(walletNumber!);
            }
            

            await ContinueMain();
        }
        catch(ex){
            throw ex;
        }
        


    }
}