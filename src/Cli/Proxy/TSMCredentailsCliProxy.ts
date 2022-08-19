import { Header } from "../Shared/CLI/Header";
import { WriteEnvToFile } from "../Shared/SaveEnv";
import fs,{readFileSync} from 'fs';
import { resolve } from 'path';
import { tsmCreds } from "@lmnl/liminaljs";
import { IsEnvReady } from "../Shared/IsEnvReady";
import { clear } from "console";
import { Banner } from "../Shared/CLI/Banner";
export class TSMCredentialsCliProxy{

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
                throw new Error(`sdk-creds.json file not found.`);
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
            
            let isEnvReady:boolean=IsEnvReady();

            if(isEnvReady===true){
                let tsmCred:tsmCreds= this.GetTSMCredentials();
            
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
                    }
                ]);

                process.env.TSM_URL=tsmCred?.url;
                process.env.TSM_USER_ID=tsmCred?.userID;
                process.env.TSM_PASSWORD=tsmCred?.password;
                process.env.TSM_PUBLIC_KEY=tsmCred?.publicKey;

                clear();

                Banner();

            }
            else
            {
                throw new Error(`Missing .env data. || Kindly run quick onboarding options first.`);
            }
        }
        catch(ex){
            throw ex;
        }
        


    }

}