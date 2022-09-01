import { clear } from "console";
import { Banner } from "../../../Shared/CLI/Banner";
import { Header } from "../../../Shared/CLI/Header";
import { StartNPMCommand } from "../../../Shared/StartNPM";

/**
 * @deprecated
 */
export class MPCConfigureCliProxy{
   

  

    public async Execute(): Promise<void>{
        try
        {
            Header("MPC Setup");

            //process.exit();
            StartNPMCommand("start:mpc-setup");
            
            clear();

            Banner();
        }
        catch(ex){
            //throw ex;
            process.exit();
        }
        


    }
}