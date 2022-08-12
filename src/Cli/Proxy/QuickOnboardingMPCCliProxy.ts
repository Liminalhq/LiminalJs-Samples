const cliProgress = require('cli-progress');

export class QuickOnboardingMPCCliProxy{

    public async Execute():Promise<void>{
        try
        {
            const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

            bar.start(2, 0);

            // Read tsm_cred.json file.
            // check if other .env file details for not.


            // Generate MPC Public Signer Public Key
            

        }
        catch(ex)
        {
            throw ex;
        }
    }
}