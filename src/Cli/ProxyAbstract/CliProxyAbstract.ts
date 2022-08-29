import { clear } from "console";
import { CloseCliProxy } from "../Proxy/CloseCliProxy";
import { GenerateWalletCliProxy } from "../Proxy/GenerateWalletCliProxy";
import { QuickOnboardingCliProxy } from "../Proxy/QuickOnboardingCliProxy";
import { QuickOnboardingMPCCliProxy } from "../Proxy/QuickOnboardingMPCCliProxy";
import { Banner } from "../Shared/CLI/Banner";
import { ContinueMain } from "../Shared/CLI/ContinueMain";
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
            let quickOnboarding=new QuickOnboardingCliProxy();
                await quickOnboarding?.Execute();
        }
        else if(params?.command?.Option==="Quick Onboarding-MPC"){
            
            let quickOnboardingMPC=new QuickOnboardingMPCCliProxy();
                await quickOnboardingMPC?.Execute();
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