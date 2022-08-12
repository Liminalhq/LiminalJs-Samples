import { CloudProvider,GetSignerPublicKeyResultDataWrapper,LiminalEnvironment, LiminalJs } from "@lmnl/liminaljs";
import { GetSignerPublicKeyAsync } from "../../Helpers/GetPublicSignerKeys";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { Header } from "../Shared/CLI/Header";
import { WriteEnvToFile } from "../Shared/SaveEnv";

export class GeneratePublicSignerKeyCliProxy{
   

    public async Execute(cloudProviderName:string): Promise<void>{
        try
        {
            Header("Generate Public Signer Key");

            let liminalJs:LiminalJs;
            let response:GetSignerPublicKeyResultDataWrapper[];

            if(cloudProviderName==="AWS"){

                liminalJs=await LiminalAuthAsync({
                    liminalOptions:{
                        clientId:process?.env?.CLIENT_ID,
                        clientSecret:process?.env?.CLIENT_SECRET_ID
                    },
                    env:LiminalEnvironment[process?.env?.ENVIRONMENT]
                });
                
    
                // // Save KMS Key and Aws Region Name
                WriteEnvToFile([
                    {
                        key:"PROVIDER_NAME",
                        value:"AWS"
                    }
                ]);
               
                process.env.PROVIDER_NAME="AWS";
                //console.log(`region => ${process?.env?.REGION}`);
    
                
                response=await GetSignerPublicKeyAsync({
                    liminalJs:liminalJs,
                    cloudProvider:CloudProvider[process?.env?.PROVIDER_NAME],
                });
                
                console.log(`Signer Public Key Response [${process?.env?.PROVIDER_NAME}] => ${JSON.stringify(response)}`);

            }
            else if(cloudProviderName==="MPC"){

                //Save KMS Key and Aws Region Name
                WriteEnvToFile([
                    {
                        key:"PROVIDER_NAME",
                        value:"MPC"
                    }
                ]);

                process.env.PROVIDER_NAME="MPC";

                liminalJs=await LiminalAuthAsync({
                    liminalOptions:{
                        clientId:process?.env?.CLIENT_ID,
                        clientSecret:process?.env?.CLIENT_SECRET_ID
                    },
                    env:LiminalEnvironment[process?.env?.ENVIRONMENT]
                });

                response=await GetSignerPublicKeyAsync({
                    liminalJs:liminalJs,
                    cloudProvider:CloudProvider[process?.env?.PROVIDER_NAME],  // it should be MPC
                    tsmCred:{
                        url:process?.env?.TSM_URL,
                        userID:process?.env?.TSM_USER_ID,
                        password:process?.env?.TSM_PASSWORD,
                        publicKey:process?.env?.TSM_PUBLIC_KEY
                    } 
                });
        
                console.log(`Signer Public Key Response [${process?.env?.PROVIDER_NAME}] => ${JSON.stringify(response)}`);

            }
        }
        catch(ex){
            throw ex;
        }
        finally
        {
            WriteEnvToFile([
                {
                    key:"PROVIDER_NAME",
                    value:"AWS"
                }
            ]);
            
            process.env.PROVIDER_NAME="AWS";

        }
    }
}

