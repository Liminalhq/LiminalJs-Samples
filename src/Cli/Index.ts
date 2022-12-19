
import { Banner } from './Shared/CLI/Banner';
import { SelectOption } from './Shared/CLI/SelectOption';
const clear = require('clear');

import * as dotenv from "dotenv";
dotenv.config(
    {
        override:true
    }
);

//console.log(`Default Key Id => ${keyId}`);

const main=async():Promise<void>=>{
  try
  {
    
    // Clear the Screen
    clear();

    // Add LiminalJs Banner
    Banner();
    
    // Show Main Menu
    await SelectOption();
  }
  catch(ex)
  {
    process.exit();
  }
}


main()?.then((resolveData)=> console.log(resolveData)).catch((error)=> console.log(error.message));

