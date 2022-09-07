import { clear } from "console";
import inquirer from "inquirer";
import PromptUI from "inquirer/lib/ui/prompt";
import { Banner } from "../../../Shared/CLI/Banner";
import { Header } from "../../../Shared/CLI/Header";
import { WriteEnvToFile } from "../../../Shared/SaveEnv";
export class CreateAzureKeyCliProxy{

    private questionList:Promise<any> & {
        ui: PromptUI<any>;
    };

    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private InputsList(): void{

        this.questionList=inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'Option',
                            message: 'Add AZURE KMS key',
                            choices: [
                                'Add existing KMS Key',
                                //'Add new KMS Key',
                            ],
                        }
                    ]);

    }

    private InputsAzureKMS():void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'input',
                                    name: 'azureKMS',
                                    message: 'KMS Key =>',
                                    validate(value) {
                                        if(value===undefined || value===null || value===''){
                                            return "Azure KMS is required"
                                        }  
                                        else
                                        {
                                            return true;
                                        }
                                    },
                                    
                                },
                                {
                                    type: 'input',
                                    name: 'azureKeyVaultUrl',
                                    message: 'Azure Key Vault URL =>',
                                    validate(value) {
                                         if(value===undefined || value===null || value===''){
                                            return "Azure Key Vault URL is required"
                                         }  
                                         else
                                         {
                                            return true;
                                         }
                                    },
                                    
                                }
                            ]
                        );
    }

    public async Execute(): Promise<void>{
        let kmsKeyId:string;
        let azureKeyVaultUrl:string;

        try
        {
            Header("Azure Key");

            this.InputsList();

            let answerList=await this.questionList;

            if(answerList.Option==="Add existing KMS Key"){

                this.InputsAzureKMS();

                let answer=await this.question;

                kmsKeyId=answer?.azureKMS;
                azureKeyVaultUrl=answer?.azureKeyVaultUrl;
            }

            // Save KMS key and Key Vault Url
          

            process.env.DEFAULT_KEY_ID=kmsKeyId;
            process.env.AZURE_KEY_VAULT_URL=azureKeyVaultUrl;
            process.env.PROVIDER_NAME="AZURE";

            clear();

            Banner();
        }
        catch(ex)
        {
            WriteEnvToFile([
                {
                    key:"DEFAULT_KEY_ID",
                    value:kmsKeyId
                },
                {
                    key:"AZURE_KEY_VAULT_URL",
                    value:azureKeyVaultUrl
                },
                {
                    key:"PROVIDER_NAME",
                    value:"AZURE"
                }
            ]);
            throw ex;
        }
    }
}