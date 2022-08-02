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
import { threadId } from "worker_threads";


export class CreateAwsKeyCliProxy{

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
                            message: 'Add AWS KMS key',
                            choices: [
                                'Add existing KMS Key',
                                'Add new KMS Key',
                            ],
                        }
                        ]);

    }

    private InputsAwsKMSwithRegion(): void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'input',
                                    name: 'awsKMS',
                                    message: 'KSM Key =>',
                                    validate(value) {
                                        if(value===undefined || value===null || value===''){
                                            return "AWs KMS is required"
                                        }  
                                        else
                                        {
                                            return true;
                                        }
                                    },
                                    
                                },
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

    private InputsAwsRegion(): void{

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
        let kmsKeyId:string;
        let awsRegion:string;
        try
        {
            Header("AWS Key");

            this.InputsList();

            let answerList=await this.questionList;

            if(answerList.Option==="Add existing KMS Key"){

                this.InputsAwsKMSwithRegion();

                let answer=await this.question;

                awsRegion=answer?.awsRegion;

                kmsKeyId=answer?.awsKMS;

            }
            else if(answerList.Option==="Add new KMS Key"){

                this.InputsAwsRegion();

                let answer=await this.question;

                let aliasName=`liminal-${Guid.create()?.toString()}`

                awsRegion=answer?.awsRegion;

                // Create AWS KMS Key
                kmsKeyId=await CreateAWSKMSKeyAsync({
                    alias:aliasName,
                    region:answer?.awsRegion
                });

            }

            // Save KMS Key and Aws Region Name
            WriteEnvToFile([
                {
                    key:"DEFAULT_KEY_ID",
                    value:kmsKeyId
                },
                {
                    key:"REGION",
                    value:awsRegion
                },
                {
                    key:"PROVIDER_NAME",
                    value:"AWS"
                }
            ]);

            process.env.DEFAULT_KEY_ID=kmsKeyId;
            process.env.REGION=awsRegion;
            process.env.PROVIDER_NAME="AWS";


            clear();

            Banner();
            
        }
        catch(ex){
            throw ex;
        }
        


    }

}