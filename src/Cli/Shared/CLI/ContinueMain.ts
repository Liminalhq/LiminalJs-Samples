import inquirer from 'inquirer';
import { Banner } from './Banner';
import { SelectOption } from './SelectOption';

const clear = require('clear');

export const ContinueMain=async():Promise<void>=>{

    try
    {

        console.log("\n");

        let question=inquirer
                    .prompt([
                        {
                            type: 'confirm',
                            name: 'continue',
                            message: 'Do you want to Continue [y/n]?'
                        }
                        ]);

        let answer=await question;

        if(answer.continue===true){
            clear();
            Banner();
            await SelectOption();
        }
        else
        {
           process.exit();
        }
    }
    catch(ex)
    {
        process.exit();
    }
}