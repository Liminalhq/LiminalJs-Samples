import { clear } from "console";
import { Guid } from "guid-typescript";
import inquirer from "inquirer";
import PromptUI from "inquirer/lib/ui/prompt";
import { CreateAWSKMSKeyAsync } from "../../Helpers/CreateAwsKMSKey";
import { Banner } from "../Shared/CLI/Banner";
import { Header } from "../Shared/CLI/Header";
import * as dotenv from "dotenv";
import path from "path";
import { WriteEnvToFile } from "../Shared/SaveEnv";


export class CreateAwsKeyCliProxy{

    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private Inputs(): void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'input',
                                    name: 'awsRegion',
                                    message: 'Aws Region =>',
                                    validate(value) {
                                         if(value===undefined || value===null || value===''){
                                            return "AWs region is required"
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
        try
        {
            Header("Create AWS Key");

            this.Inputs();

            let answer=await this.question;

            let aliasName=`liminal-${Guid.create()?.toString()}`

            // Create AWS KMS Key
            let kmsKeyId:string=await CreateAWSKMSKeyAsync({
                alias:aliasName,
                region:answer?.awsRegion
            });

            // Save KMS Key and Aws Region Name
            WriteEnvToFile([
                {
                    key:"DEFAULT_KEY_ID",
                    value:kmsKeyId
                },
                {
                    key:"REGION",
                    value:answer?.awsRegion
                },
                {
                    key:"PROVIDER_NAME",
                    value:"AWS"
                }
            ]);

            process.env.DEFAULT_KEY_ID=kmsKeyId;
            process.env.REGION=answer?.awsRegion;
            process.env.PROVIDER_NAME="AWS";


            clear();

            Banner();
            
        }
        catch(ex){
            throw ex;
        }
        


    }

}