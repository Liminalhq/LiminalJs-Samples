
import { clear } from "console";
import { Banner } from "../Shared/CLI/Banner";
import { Header } from "../Shared/CLI/Header";
import { StartNPMCommand } from "../Shared/StartNPM";


export class AwsConfigureCliProxy{

    public async Execute(): Promise<void>{
        try
        {
            Header("AWS Configure");

            //process.exit();
            StartNPMCommand("start:aws-configure");
            
            clear();

            Banner();

        }
        catch(ex)
        {
            throw ex;
        }
        
    }
}