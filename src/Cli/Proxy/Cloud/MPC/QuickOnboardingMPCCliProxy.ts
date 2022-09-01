import { clear } from "console";
import { Banner } from "../../../Shared/CLI/Banner";
import { ContinueMain } from "../../../Shared/CLI/ContinueMain";
import { GeneratePublicSignerKeyCliProxy } from "../../GeneratePublicSignerKeyCliProxy";
import { CreateSDKKeyCliProxy } from "../../SDKKeyCliProxy";
import { TSMCredentialsCliProxy } from "./TSMCredentailsCliProxy";


const cliProgress = require('cli-progress');

export class QuickOnboardingMPCCliProxy{

    public async Execute():Promise<void>{
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        try
        {
            bar.start(3, 0);

            let createSDKKeyProxyObj=new CreateSDKKeyCliProxy();
                await createSDKKeyProxyObj?.Execute();

            bar.update(1);

            // Read tsm_cred.json file.
            // check if other .env file details for not.
            let tSMCredentialsCliProxy=new TSMCredentialsCliProxy();
                await tSMCredentialsCliProxy.Execute();

            bar.update(2);

            // Generate MPC Public Signer Public Key
            let generatePublicSignerProxyObj=new GeneratePublicSignerKeyCliProxy();
                await generatePublicSignerProxyObj?.Execute("MPC");

            bar.update(3);
            
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