var clc = require("cli-color");
const figlet = require('figlet');

export const Banner=()=>{
    console.log(
        clc.yellow(
          figlet.textSync('liminalJs', { horizontalLayout: 'full' })
        )
      );
}