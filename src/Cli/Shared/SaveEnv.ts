import { resolve } from 'path';
import { close, openSync,readFileSync, writeFileSync } from 'fs';
import * as envfile from 'envfile';

// import * as dotenv from "dotenv";
// dotenv.config();

// //const fs = require('fs').promises;

// // export const WriteEnvToFile = async(
// //   envVariables: { key: string; value: any }[],
// // ): Promise<void> => {

// //     //return new Promise((resolveEnv,reject)=>{

// //         try
// //         {   
// //             // get `.env` from path of current directory
// //             const path = resolve(__dirname, '../../../.env');

// //             let data=await fs.readFile(path,"utf-8");


// //             //let data=readFileSync(path,"utf-8");

// //             const parsedFile = envfile.parse(data);

// //             envVariables.forEach((envVar: { key: string; value: any }) => {
// //                     if (envVar.key && envVar.value) {
// //                         parsedFile[envVar.key] = envVar.value;
// //                     }
// //             });

// //             await fs.writeFile(path, envfile.stringify(parsedFile));

// //             // writeFileSync(path, envfile.stringify(parsedFile),);

// //             //resolveEnv();

// //             // readFile(path, 'utf8', (err, data) => {
// //             //     if (err) {
// //             //         console.error(err);
// //             //         return;
// //             //     }

// //             //     const parsedFile = envfile.parse(data);
// //             //     envVariables.forEach((envVar: { key: string; value: any }) => {
// //             //         if (envVar.key && envVar.value) {
// //             //             parsedFile[envVar.key] = envVar.value;
// //             //         }
// //             //     });
// //             //     writeFileSync(path, envfile.stringify(parsedFile));

// //             //     //console.log('Updated .env: ', parsedFile);
// //             // });
// //         }
// //         catch(ex)
// //         {
// //             //reject(ex);
// //         }

// //     //});
    
  
 
// // };

export const WriteEnvToFile = (
    envVariables: { key: string; value: any }[],
  ): void => {
  
      //return new Promise((resolveEnv,reject)=>{
  
          try
          {   
              // get `.env` from path of current directory
              const path = resolve(__dirname, '../../../.env');
              //const tempPath=resolve(__dirname,"../../Cli/Shared/CLI/env.txt");

            //   let tempData=readFileSync(tempPath,"utf8");
            //   const tempParsedFile = envfile.parse(tempData);
            //   envVariables.forEach((envVar: { key: string; value: any }) => {
            //         if (envVar.key && envVar.value) {
            //             tempParsedFile[envVar.key] = envVar.value;
            //         }
            //     });
            //   writeFileSync(tempPath, envfile.stringify(tempParsedFile));
  
              let fileNumber:number=openSync(path,"r");

              let data=readFileSync(path,"utf-8");
  
              //const parsedFile = envfile.parse(data);
              const parsedFile = envfile.parse(data);
  
              envVariables.forEach((envVar: { key: string; value: any }) => {
                      if (envVar.key && envVar.value) {
                          parsedFile[envVar.key] = envVar.value;
                      }
              });
  
              writeFileSync(path, envfile.stringify(parsedFile));
              
              close(fileNumber);
          }
          catch(ex)
          {
              //reject(ex);
              throw ex;
          }
  
      //});
      
  };


// const fs = require("fs");
// const os = require("os");


// export function setEnvValue(key, value) {

//     // read file from hdd & split if from a linebreak to a array
//     const path = resolve(__dirname, '../.env');
//     const ENV_VARS = fs.readFileSync(path, "utf8").split(os.EOL);

//     // find the env we want based on the key
//     const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
//         return line.match(new RegExp(key));
//     }));

//     // replace the key/value with the new value
//     ENV_VARS.splice(target, 1, `${key}=${value}`);

//     // write everything back to the file system
//     fs.writeFileSync(path, ENV_VARS.join(os.EOL));

// }