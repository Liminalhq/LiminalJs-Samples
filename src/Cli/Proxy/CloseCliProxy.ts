import inquirer from "inquirer";
import PromptUI from "inquirer/lib/ui/prompt";
import { ContinueMain } from "../Shared/CLI/ContinueMain";

export class CloseCliProxy{

    private question:Promise<any> & {
        ui: PromptUI<any>;
    };

    private Inputs(): void{

        this.question=inquirer
                    .prompt([
                        {
                            type: 'confirm',
                            name: 'close',
                            message: 'Do you want to Close [y/n]?'
                        }
                        ]);
    }

    public async Execute(): Promise<void>{
        try
        {
            this.Inputs();

            let answer=await this.question;

            if(answer?.close===true){
                console.log("Press Ctrl+C to exit from the CLI");
                process.exit();                
            }
            else
            {
                await ContinueMain();
            }
        }
        catch(ex){
            //throw ex;
            process.exit();
        }
        


    }

}