import { CloseCliProxy } from "../Proxy/CloseCliProxy";
import { QuickOnboardingAWSCliProxy } from "../Proxy/Cloud/AWS/QuickOnboardingAWSCliProxy";
import { ContinueMain } from "../Shared/CLI/ContinueMain";
import { QuickOnboardingMPCCliProxy } from "../Proxy/Cloud/MPC/QuickOnboardingMPCCliProxy";
import { GenerateWalletCliProxy } from "../Proxy/Wallets/GenerateWalletCliProxy";
import { QuickOnboardingAzureCliProxy } from "../Proxy/Cloud/Azure/QuickOnboardingAzureCliProxy";
let clc=require("cli-color")

interface ICommandOption{
    Option:string;
}

export interface ICliProxyAbstractOption{
    command:ICommandOption;
}

export const CliProxyAbstractAsync=async(params:ICliProxyAbstractOption): Promise<void>=>{
    try
    {      

        if(params?.command?.Option==="Quick Onboarding-AWS")
        {
            let quickOnboarding=new QuickOnboardingAWSCliProxy();
                await quickOnboarding?.Execute();
        }
        else if(params?.command?.Option==="Quick Onboarding-MPC"){
            
            let quickOnboardingMPC=new QuickOnboardingMPCCliProxy();
                await quickOnboardingMPC?.Execute();
        }
        else if(params?.command?.Option==="Quick Onboarding-AZURE"){
            
            let quickOnboardingAzure=new QuickOnboardingAzureCliProxy();
                await quickOnboardingAzure?.Execute();
        }
        else if(params?.command?.Option==="Generate Wallet"){

            let generateWallet=new GenerateWalletCliProxy();
                await generateWallet.Execute();
        }
        else if(params?.command?.Option==="Close CLI"){
            
            let closeCli=new CloseCliProxy();
                await closeCli.Execute();
        }
    }
    catch(ex)
    {
        console.log(
            clc.red(ex?.message)
        );
        
        await ContinueMain();
    }
}