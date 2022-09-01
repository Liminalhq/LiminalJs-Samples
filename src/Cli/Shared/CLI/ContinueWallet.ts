import inquirer from 'inquirer';
import { GenerateWalletCliProxy } from '../../Proxy/Wallets/GenerateWalletCliProxy';
import { Banner } from './Banner';
import { SelectOption } from './SelectOption';

const clear = require('clear');

export const ContinueWallet=async():Promise<void>=>{

    try
    {

        console.log("\n");

        let question=inquirer
                    .prompt([
                        {
                            type: 'confirm',
                            name: 'continue',
                            message: 'Do you want to create another chain wallet [y/n]?'
                        }
                        ]);

        let answer=await question;

        if(answer.continue===true){
            clear();
            Banner();
            let generateWallet=new GenerateWalletCliProxy();
            await generateWallet.Execute();
        }
        else
        {
            clear();
            Banner();
            await SelectOption();
        }
    }
    catch(ex)
    {
        process.exit();
    }
}