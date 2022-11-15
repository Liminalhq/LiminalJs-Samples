
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
    
    // ['SIGINT', 'SIGTERM', 'SIGQUIT']
    //   .forEach(signal => process.on(signal, () => {
    //     console.log("Cancel");
    //     process.exit();
    //   }));

//     setTimeout(function () {

//       process.on("exit", function () {
// ​
//         console.log("Destroying");
//         //StartNPMCommand("start:cli");
// ​
//       });

//     }, 1000);
    clear();

    Banner();
    
    await SelectOption();
  }
  catch(ex)
  {
    process.exit();
  }
}


main()?.then((resolveData)=> console.log(resolveData)).catch((error)=> console.log(error.message));

