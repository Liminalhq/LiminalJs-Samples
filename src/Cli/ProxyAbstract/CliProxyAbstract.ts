import { CloseCliProxy } from "../Proxy/CloseCliProxy";
import { GenerateWalletCliProxy } from "../Proxy/GenerateWalletCliProxy";
import { QuickOnboardingCliProxy } from "../Proxy/QuickOnboardingCliProxy";
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

        if(params?.command?.Option==="Quick Onboarding")
        {
            let quickOnboarding=new QuickOnboardingCliProxy();
                await quickOnboarding?.Execute();
        }
        else if(params?.command?.Option==="Quick Onboarding-MPC"){
            
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