import { clear } from "console";
import { Banner } from "../../../Shared/CLI/Banner";
import { ContinueMain } from "../../../Shared/CLI/ContinueMain";
import { GeneratePublicSignerKeyCliProxy } from "../../GeneratePublicSignerKeyCliProxy";
import { CreateSDKKeyCliProxy } from "../../SDKKeyCliProxy";
import { AzureConfigurationCliProxy } from "./AzureConfigurationCliProxy";
import { CreateAzureKeyCliProxy } from "./CreateAzureKeyCliProxy";

const cliProgress = require('cli-progress');

export class QuickOnboardingAzureCliProxy{

    public async Execute(): Promise<void>{
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        try
        {
            bar.start(4, 0);

            // Az Login
            let azureConfigurationProxyObj=new AzureConfigurationCliProxy();
                await azureConfigurationProxyObj?.Execute();

            bar.update(1);
            
            // Create Azure Key
            let createAzureKeyProxyObj=new CreateAzureKeyCliProxy();
                await createAzureKeyProxyObj.Execute();

            bar.update(2);

            // Create SDK Key
            let createSDKKeyProxyObj=new CreateSDKKeyCliProxy();
                await createSDKKeyProxyObj?.Execute();

            bar.update(3);
            // Generate Public Signer Key
            
            let generatePublicSignerProxyObj=new GeneratePublicSignerKeyCliProxy();
                await generatePublicSignerProxyObj?.Execute("AZURE");

            bar.update(4);

            bar.stop();

            clear();
            Banner();

            await ContinueMain();
        }
        catch(ex)
        {
            bar.stop();
            throw ex;
        }

    }
}