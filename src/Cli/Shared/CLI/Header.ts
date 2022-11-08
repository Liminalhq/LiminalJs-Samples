let clc=require('cli-color');
export const Header=(content:string)=>{

    console.log("\n");
    console.log(
        clc.white.bold(`***** ${content} *****`)
    );
}

export const InputWarningMessage=()=>{
    console.log(
        clc.white.bold(`Note: If the inputs are not visible, press the down or up arrow key.`)
    );
}