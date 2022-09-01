import { Header } from "../../../Shared/CLI/Header";
import { StartNPMCommand } from "../../../Shared/StartNPM";
import { clear } from "console";
import { Banner } from "../../../Shared/CLI/Banner";

export class AzureConfigurationCliProxy{

    public async Execute(): Promise<void>{
        try
        {
            Header(`Azure Configuration`);

            StartNPMCommand(`start:azure-configure`);

            clear();

            Banner();
        }
        catch(ex)
        {
            throw ex;
        }
    }
}