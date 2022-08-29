import inquirer from 'inquirer';
import { WriteEnvToFile } from '../SaveEnv';


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const CoSignerEmailIdInput=async():Promise<any>=>{
    try
    {
        let question=inquirer
                    .prompt([
                                {
                                    type: 'input',
                                    name: 'coSignerEmailId1',
                                    message: 'Co-Signer EmailId Id 1 =>',
                                    validate(value) {
                                        if(value===undefined || value===null || value===''){
                                            return "Email id is required"
                                        }  
                                        else
                                        {
                                            if(validateEmail(value)){
                                                return true;
                                            }
                                            else
                                            {
                                                return "Email id is not valid"
                                            }
                                        }
                                    },
                                    
                                },
                                {
                                    type: 'input',
                                    name: 'coSignerEmailId2',
                                    message: 'Co-Signer EmailId Id 2 =>',
                                    validate(value) {
                                        if(value===undefined || value===null || value===''){
                                            return "Email id is required"
                                        }  
                                        else
                                        {
                                            if(validateEmail(value)){
                                                return true;
                                            }
                                            else
                                            {
                                                return "Email id is not valid"
                                            }
                                        }
                                    },
                                    
                                },
                        ]);


        let answer=await question;

        return answer;
        
    }
    catch(ex)
    {
        throw ex;
    }
}




export const GetCoSignersEmailIds=async(): Promise<string[]>=>{
    // Get Co Signers Email Id.
    let coSignerEmailId:string=process?.env?.CO_SIGNERS_EMAILID;

    if(coSignerEmailId==="YOUR_CO_SIGNERS_EMAILID"){

        // If Co- Signer email id not found in env file then call Co Signer Input CLI
        let answer=await CoSignerEmailIdInput();

        // Write in the .env file.
        WriteEnvToFile([
            {
                key:"CO_SIGNERS_EMAILID",
                value:`${answer.coSignerEmailId1},${answer.coSignerEmailId2}`
            }
        ]);

        // Map 
        process.env.CO_SIGNERS_EMAILID=`${answer.coSignerEmailId1},${answer.coSignerEmailId2}`;

        return [
            answer.coSignerEmailId1,
            answer.coSignerEmailId2
        ]
    }
    else
    {
        // if co-Signer email id found in env file.
        let emailIds:string[]=coSignerEmailId?.split(",");
        return emailIds;
    }
}