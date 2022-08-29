import inquirer from 'inquirer';
import { CliProxyAbstractAsync } from '../../ProxyAbstract/CliProxyAbstract';
 export const SelectOption=async():Promise<void>=>{
    try
    {
        let question=inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'Option',
                            message: 'What do you want to do?',
                            choices: [
                                'Quick Onboarding-AWS',
                                'Quick Onboarding-MPC',
                                'Generate Wallet',
                                'Close CLI'
                            ],
                        }
                        ]);

        let answer=await question;

        await CliProxyAbstractAsync({
            command:answer
        });
    }
    catch(ex)
    {
        process.exit();
    }
 }