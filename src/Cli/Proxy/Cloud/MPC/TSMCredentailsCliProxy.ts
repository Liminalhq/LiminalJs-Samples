import { Header, InputWarningMessage } from "../../../Shared/CLI/Header";
import { WriteEnvToFile } from "../../../Shared/SaveEnv";
import fs,{readFileSync} from 'fs';
import { resolve } from 'path';
import { tsmCreds } from "@lmnl/liminaljs";
import { IsSDKKeyEnvReady } from "../../../Shared/IsEnvReady";
import { clear } from "console";
import { Banner } from "../../../Shared/CLI/Banner";
import inquirer from 'inquirer';
import PromptUI from "inquirer/lib/ui/prompt";
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
                                {
                                    type: 'input',
                                    name: 'nodeVersion',
                                    message: 'nodeVersion =>',
                                    validate(value){
                                        
                                        if(value!==undefined && value!==""){

                                            if(typeof value==="string"){

                                                let _value=Number(value);

                                                if(isNaN(_value)){
                                                    return "node version should be number";
                                                }

                                                return true;
                                            }
                                        }

                                        return true;
                                    }
                                    
                                }
                                
                            ]
                        );
    }


    private GetTSMCredentials():tsmCreds|undefined{
        try
        {
            const tsm_CredFilePath=resolve(__dirname,`../../../sdk-creds.json`);
            
            // check if file exists or not.
            if(fs.existsSync(tsm_CredFilePath)){
                let fileContent=readFileSync(tsm_CredFilePath,'utf-8');
                //console.log(fileContent);
                let tsmCredData:tsmCreds=JSON.parse(fileContent);

                return tsmCredData;
            }
            else
            {
                //throw new Error(`sdk-creds.json file not found.`);
                return undefined;
            }
        }
        catch(ex)
        {
            throw ex;
        }
    }

    public async Execute(): Promise<void>{
        try
        {
            Header("Add TSM Credentials");
            InputWarningMessage();
            
            let isEnvReady:boolean=IsSDKKeyEnvReady();

            if(isEnvReady===true){

                let tsmCred:tsmCreds= this.GetTSMCredentials();

                // If tsm_cred json file not found then take inputs from the users.
                if(tsmCred===undefined){
                    this.Inputs();

                    let answer=await this.question;

                    let _version:number|undefined=Number(answer.nodeVersion);

                    if(_version<=0 || isNaN(_version)){
                        _version=undefined;
                    }

                    tsmCred={
                        userID:answer.userId,
                        password:answer.password,
                        url:answer.url,
                        publicKey:answer.publicKey,
                        version:_version ?? 0
                    };
                }
            
                //Save KMS Key and Aws Region Name
                WriteEnvToFile([
                    {
                        key:"TSM_URL",
                        value:tsmCred?.url
                    },
                    {
                        key:"TSM_USER_ID",
                        value:tsmCred?.userID
                    },
                    {
                        key:"TSM_PASSWORD",
                        value:tsmCred?.password
                    },
                    {
                        key:"TSM_PUBLIC_KEY",
                        value:tsmCred?.publicKey
                    },
                    {
                        key:"TSM_NODE_VERSION",
                        value:String(tsmCred?.version ?? 0)
                    }
                ]);

                process.env.TSM_URL=tsmCred?.url;
                process.env.TSM_USER_ID=tsmCred?.userID;
                process.env.TSM_PASSWORD=tsmCred?.password;
                process.env.TSM_PUBLIC_KEY=tsmCred?.publicKey;
                process.env.TSM_NODE_VERSION=String(tsmCred?.version ?? 0);

                clear();

                Banner();

            }
            else
            {
                throw new Error(`Missing .env data.`);
            }
        }
        catch(ex){
            throw ex;
        }
        


    }

}