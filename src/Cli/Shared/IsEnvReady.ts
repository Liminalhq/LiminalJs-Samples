import Enumerable from "linq";

export const IsEnvReady=(): boolean=>{

    let countBool:Array<boolean>=new Array<boolean>();
    let counterCondition:number=0;

    let env=process?.env?.ENVIRONMENT;
    if(env==="YOUR_ENVIRONMENT" || env===undefined || env===""){
        countBool.push(false);
        counterCondition++;
    }
    else
    {
        countBool.push(true);
        counterCondition++;
    }

    let providerName=process?.env?.PROVIDER_NAME;
    if(providerName==="YOUR_CLOUD_PROVIDER_NAME" || providerName===undefined || providerName==="")
    {
        countBool.push(false);
        counterCondition++;
    }
    else
    {
        countBool.push(true);
        counterCondition++;
    }

    if(providerName==="AWS" || providerName==="AZURE")
    {
        let keyId=process?.env?.DEFAULT_KEY_ID;
        if(keyId==="YOUR_KMS_DEFAULT_KEY_ID" || keyId===undefined || keyId==="")
        {
            countBool.push(false);
            counterCondition++;
        }
        else
        {
            countBool.push(true);
            counterCondition++;
        }

        let region=process?.env?.REGION;
        if(region==="YOUR_AWS_REGION" || region===undefined || region==="")
        {
            countBool.push(false);
            counterCondition++;
        }
        else
        {
            countBool.push(true);
            counterCondition++;
        }
    }
    
    let clientId=process?.env?.CLIENT_ID;
    if(clientId==="YOUR_SDK_CLIENT_ID" || clientId===undefined || clientId==="")
    {
        countBool.push(false);
        counterCondition++;
    }
    else
    {
        countBool.push(true);
        counterCondition++;
    }

    let clientSecretId=process?.env?.CLIENT_SECRET_ID;
    if(clientSecretId==="YOUR_SDK_CLIENT_SECRET_ID" || clientSecretId===undefined || clientSecretId==="")
    {
        countBool.push(false);
        counterCondition++;
    }
    else
    {
        countBool.push(true);
        counterCondition++;
    }

    let countFlag:number=Enumerable.from(countBool)
                                    .where((element)=> element===true)
                                    .count();
    
    if(countFlag===counterCondition){
        return true;
    }
    else
    {
        return false;
    }

    
}

export const IsEnvReadyMPC=(coin:string): boolean=>{

    if(coin==="TRX" || coin==="ETH" || coin==="MATIC" || coin==="BNB"){
        let countBool:Array<boolean>=new Array<boolean>();
        let counterCondition:number=0;

        let tsmUrl:string=process?.env?.TSM_URL;
        if(tsmUrl==="YOUR_TSM_URL" || tsmUrl===undefined || tsmUrl===""){
            countBool.push(false);
            counterCondition++;
        }
        else
        {
            countBool.push(true);
            counterCondition++;
        }

        let tsmUserId:string=process?.env?.TSM_USER_ID;
        if(tsmUserId==="YOUR_TSM_USER_ID" || tsmUserId===undefined || tsmUrl===""){
            countBool.push(false);
            counterCondition++;
        }
        else
        {
            countBool.push(true);
            counterCondition++;
        }

        let tsmPassword:string=process?.env?.TSM_PASSWORD;
        if(tsmPassword==="YOUR_TSM_PASSWORD" || tsmPassword===undefined || tsmPassword===""){
            countBool.push(false);
            counterCondition++;
        }
        else
        {
            countBool.push(true);
            counterCondition++;
        }

        let tsmPublicKey:string=process?.env?.TSM_PUBLIC_KEY;
        if(tsmPublicKey==="YOUR_TSM_PUBLIC_KEY" || tsmPublicKey===undefined || tsmPublicKey===""){
            countBool.push(false);
            counterCondition++;
        }
        else
        {
            countBool.push(true);
            counterCondition++;
        }

        let countFlag:number=Enumerable.from(countBool)
                                    .where((element)=> element===true)
                                    .count();
    
        if(countFlag===counterCondition){
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return true;
    }
}

export const IsSDKKeyEnvReady=(): boolean=>{

    let countBool:Array<boolean>=new Array<boolean>();
    let counterCondition:number=0;

    let env=process?.env?.ENVIRONMENT;
    if(env==="YOUR_ENVIRONMENT" || env===undefined || env===""){
        countBool.push(false);
        counterCondition++;
    }
    else
    {
        countBool.push(true);
        counterCondition++;
    }

    let clientId=process?.env?.CLIENT_ID;
    if(clientId==="YOUR_SDK_CLIENT_ID" || clientId===undefined || clientId==="")
    {
        countBool.push(false);
        counterCondition++;
    }
    else
    {
        countBool.push(true);
        counterCondition++;
    }

    let clientSecretId=process?.env?.CLIENT_SECRET_ID;
    if(clientSecretId==="YOUR_SDK_CLIENT_SECRET_ID" || clientSecretId===undefined || clientSecretId==="")
    {
        countBool.push(false);
        counterCondition++;
    }
    else
    {
        countBool.push(true);
        counterCondition++;
    }

    let countFlag:number=Enumerable.from(countBool)
                                    .where((element)=> element===true)
                                    .count();
    
    if(countFlag===counterCondition){
        return true;
    }
    else
    {
        return false;
    }
} 
