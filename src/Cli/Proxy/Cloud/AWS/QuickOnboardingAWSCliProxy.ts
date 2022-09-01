import { ContinueMain } from "../../../Shared/CLI/ContinueMain";
import { AwsConfigureCliProxy } from "./AwsConfigureProxy";
import { CreateAwsKeyCliProxy } from "./CreateAwsKeyCliProxy";
import { GeneratePublicSignerKeyCliProxy } from "../../GeneratePublicSignerKeyCliProxy";
//import { MPCConfigureCliProxy } from "./MPCConfigureCliProxy";
import { CreateSDKKeyCliProxy } from "../../SDKKeyCliProxy";
import { clear } from "console";
import { Banner } from "../../../Shared/CLI/Banner";
const cliProgress = require('cli-progress');

export class QuickOnboardingAWSCliProxy{

    public async Execute(): Promise<void>{
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        try
        {
            bar.start(4, 0);

            let awsConfigureProxyObj=new AwsConfigureCliProxy();
                await awsConfigureProxyObj?.Execute();

            bar.update(1);
            
            let createAWSKeyProxyObj=new CreateAwsKeyCliProxy();
                await createAWSKeyProxyObj?.Execute();

            bar.update(2);

            let createSDKKeyProxyObj=new CreateSDKKeyCliProxy();
                await createSDKKeyProxyObj?.Execute();

            bar.update(3);

            let generatePublicSignerProxyObj=new GeneratePublicSignerKeyCliProxy();
                await generatePublicSignerProxyObj?.Execute("AWS");

            bar.update(4);

            bar.stop();

            clear();
            Banner();

            await ContinueMain();
        }
        catch(ex){
            bar.stop();
            throw ex;
        }
        


    }
}