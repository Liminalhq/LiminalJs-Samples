import { ContinueMain } from "../Shared/CLI/ContinueMain";
import { AwsConfigureCliProxy } from "./AwsConfigureProxy";
import { CreateAwsKeyCliProxy } from "./CreateAwsKeyCliProxy";
import { GeneratePublicSignerKeyCliProxy } from "./GeneratePublicSignerKeyCliProxy";
//import { MPCConfigureCliProxy } from "./MPCConfigureCliProxy";
import { CreateSDKKeyCliProxy } from "./SDKKeyCliProxy";
import { TSMCredentialsCliProxy } from "./TSMCredentailsCliProxy";
const cliProgress = require('cli-progress');

export class QuickOnboardingCliProxy{

    public async Execute(): Promise<void>{
        try
        {
            const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

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

            // let tsmCredentialsProxyObj=new TSMCredentialsCliProxy();
            //     await tsmCredentialsProxyObj?.Execute();

            // bar.update(4);

            let generatePublicSignerProxyObj=new GeneratePublicSignerKeyCliProxy();
                await generatePublicSignerProxyObj?.Execute("AWS");

            bar.update(4);

            await ContinueMain();
        }
        catch(ex){
            throw ex;
        }
        


    }
}