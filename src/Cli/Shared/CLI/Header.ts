let clc=require('cli-color');
export const Header=(content:string)=>{

    console.log("\n");
    console.log(
        clc.white.bold(`***** ${content} *****`)
    );
}