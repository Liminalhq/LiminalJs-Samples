import { clear } from "console";
import inquirer from "inquirer";
import PromptUI from "inquirer/lib/ui/prompt";
import { Banner } from "../Shared/CLI/Banner";
import { Header } from "../Shared/CLI/Header";
import { IsSDKKeyEnvReady } from "../Shared/IsEnvReady";
import { WriteEnvToFile } from "../Shared/SaveEnv";

export class CreateSDKKeyCliProxy{

    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private Inputs(): void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'list',
                                    name: 'env',
                                    message: 'Environment =>',
                                    choices: [
                                        'test',
                                        'prod'
                                    ],
                                    
                                },
                                {
                                    type: 'input',
                                    name: 'clientId',
                                    message: 'Client Id =>',
                                    validate(value){
                                        if(value===undefined || value===null || value===''){
                                            return "Client id is required"
                                         }  
                                         else
                                         {
                                            return true;
                                         }
                                    }
                                    
                                },
                                {
                                    type: 'input',
                                    name: 'clientSecretId',
                                    message: 'Client Secret Id =>',
                                    validate(value){
                                        if(value===undefined || value===null || value===''){
                                            return "Client secret id is required"
                                         }  
                                         else
                                         {
                                            return true;
                                         }
                                    }
                                    
                                },
                            ]
                        );
    }

    public async Execute(): Promise<void>{
        try
        {

            Header("Add SDK Key");

            let flag:boolean=IsSDKKeyEnvReady();

            if(flag===false)
            {
                this.Inputs();

                let answer=await this.question;

                //Save KMS Key and Aws Region Name
                WriteEnvToFile([
                    {
                        key:"ENVIRONMENT",
                        value:answer?.env
                    },
                    {
                        key:"CLIENT_ID",
                        value:answer?.clientId
                    },
                    {
                        key:"CLIENT_SECRET_ID",
                        value:answer?.clientSecretId
                    }
                ]);
            
                process.env.ENVIRONMENT=answer?.env;
                process.env.CLIENT_ID=answer?.clientId;
                process.env.CLIENT_SECRET_ID=answer?.clientSecretId;
            }

            clear();
            Banner();
        }
        catch(ex){
            throw ex;
        }
        


    }

}