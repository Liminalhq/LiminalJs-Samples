import { ContinueMain } from "../Shared/CLI/ContinueMain";
import { GeneratePublicSignerKeyCliProxy } from "./GeneratePublicSignerKeyCliProxy";
import { TSMCredentialsCliProxy } from "./TSMCredentailsCliProxy";

const cliProgress = require('cli-progress');

export class QuickOnboardingMPCCliProxy{

    public async Execute():Promise<void>{
        try
        {
            const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

            bar.start(2, 0);

            // Read tsm_cred.json file.
            // check if other .env file details for not.
            let tSMCredentialsCliProxy=new TSMCredentialsCliProxy();
                await tSMCredentialsCliProxy.Execute();

            bar.update(1);

            // Generate MPC Public Signer Public Key
            let generatePublicSignerProxyObj=new GeneratePublicSignerKeyCliProxy();
                await generatePublicSignerProxyObj?.Execute("MPC");

            bar.update(2);
            
            await ContinueMain();

        }
        catch(ex)
        {
            throw ex;
        }
    }
}