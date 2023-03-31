import { CloudProvider,GetSignerPublicKeyResultDataWrapper,LiminalEnvironment, LiminalJs } from "@lmnl/liminaljs";
import { GetSignerPublicKeyAsync, LiminalAuthAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
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
    
                console.log(`Generating Public Signer Keys.....`);
                
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

                console.log(`Generating Public Signer Keys.....`);
                
                let _version:number|undefined=Number(process?.env?.TSM_NODE_VERSION);

                if(_version<=0 || isNaN(_version)){
                    _version=undefined
                }

                response=await GetSignerPublicKeyAsync({
                    liminalJs:liminalJs,
                    cloudProvider:CloudProvider[process?.env?.PROVIDER_NAME],  // it should be MPC
                    tsmCred:{
                        url:process?.env?.TSM_URL,
                        userID:process?.env?.TSM_USER_ID,
                        password:process?.env?.TSM_PASSWORD,
                        publicKey:process?.env?.TSM_PUBLIC_KEY,
                        version:_version
                    } 
                });
                let jsonValue:string=JSON.stringify(response);
                console.log(jsonValue);

                console.log(`Signer Public Key Response [${process?.env?.PROVIDER_NAME}] => ${JSON.stringify(response)}`);

            }
            else if(cloudProviderName==="AZURE"){

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
                        value:"AZURE"
                    }
                ]);
               
                process.env.PROVIDER_NAME="AZURE";
                //console.log(`region => ${process?.env?.REGION}`);

                console.log(`Generating Public Signer Keys.....`);
                
                response=await GetSignerPublicKeyAsync({
                    liminalJs:liminalJs,
                    cloudProvider:CloudProvider[process?.env?.PROVIDER_NAME],
                });
                
                console.log(`Signer Public Key Response [${process?.env?.PROVIDER_NAME}] => ${JSON.stringify(response)}`);
            }
            else
            {
                throw new Error(`Cloud Provider not found`);
            }
        }
        catch(ex){
            throw ex;
        }
        finally
        {

            if(cloudProviderName==="AZURE"){
                WriteEnvToFile([
                    {
                        key:"PROVIDER_NAME",
                        value:"AZURE"
                    }
                ]);
                
                process.env.PROVIDER_NAME="AZURE";
    
            }
            else if(cloudProviderName==="AWS")
            {
                WriteEnvToFile([
                    {
                        key:"PROVIDER_NAME",
                        value:"AWS"
                    }
                ]);
                
                process.env.PROVIDER_NAME="AWS";
    
            }
            else if(cloudProviderName==="MPC")
            {
                WriteEnvToFile([
                    {
                        key:"PROVIDER_NAME",
                        value:"MPC"
                    }
                ]);
                
                process.env.PROVIDER_NAME="MPC";
    
            }
            
        }
    }
}

