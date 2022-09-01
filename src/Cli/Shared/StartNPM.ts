
const npm = require('npm-commands');
export const StartNPMCommand=(scriptName:string)=>{
    npm().run(scriptName);
    //process.exit(0);
}