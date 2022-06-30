import { clear } from "console";
import inquirer from "inquirer";
import PromptUI from "inquirer/lib/ui/prompt";
import { Banner } from "../Shared/CLI/Banner";
import { Header } from "../Shared/CLI/Header";
import { WriteEnvToFile } from "../Shared/SaveEnv";

export class TSMCredentialsCliProxy{

    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private Inputs(): void{

        this.question=inquirer
                    .prompt([
                                {
                                    type: 'input',
                                    name: 'url',
                                    message: 'Url =>',
                                    validate(value){
                                        if(value===undefined || value===null || value===''){
                                            return "Url is required"
                                         }  
                                         else
                                         {
                                            return true;
                                         }
                                    }
                                    
                                },
                                {
                                    type: 'input',
                                    name: 'userId',
                                    message: 'User Id =>',
                                    validate(value){
                                        if(value===undefined || value===null || value===''){
                                            return "User id is required"
                                         }  
                                         else
                                         {
                                            return true;
                                         }
                                    }
                                    
                                },
                                {
                                    type: 'password',
                                    name: 'password',
                                    mask:true,
                                    message: 'Password =>',
                                    validate(value){
                                        if(value===undefined || value===null || value===''){
                                            return "Password is required"
                                         }  
                                         else
                                         {
                                            return true;
                                         }
                                    }
                                    
                                },
                                {
                                    type: 'input',
                                    name: 'publicKey',
                                    message: 'Public Key =>',
                                    validate(value){
                                        if(value===undefined || value===null || value===''){
                                            return "public key is required"
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

            Header("Add TSM Credentials");

            this.Inputs();

            let answer=await this.question;
            
            // //Save KMS Key and Aws Region Name
            WriteEnvToFile([
                {
                    key:"TSM_URL",
                    value:answer?.url
                },
                {
                    key:"TSM_USER_ID",
                    value:answer?.userId
                },
                {
                    key:"TSM_PASSWORD",
                    value:answer?.password
                },
                {
                    key:"TSM_PUBLIC_KEY",
                    value:answer?.publicKey
                }
            ]);


            process.env.TSM_URL=answer?.url;
            process.env.TSM_USER_ID=answer?.userId;
            process.env.TSM_PASSWORD=answer?.password;
            process.env.TSM_PUBLIC_KEY=answer?.publicKey;

            clear();

            Banner();
        }
        catch(ex){
            throw ex;
        }
        


    }

}