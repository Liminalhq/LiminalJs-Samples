import { KMS } from "aws-sdk";
var clc = require("cli-color");

const AWS_KMS_Instance = (region:string): KMS => new KMS({
    region: region,
    apiVersion: '2014-11-01'
});

export interface ICreateAWSKMSKeyOption{
    region:string;
    alias:string
}

export const CreateAWSKMSKeyAsync=async(params:ICreateAWSKMSKeyOption): Promise<string>=>{
    try
    {
        let awsKMS:KMS=AWS_KMS_Instance(params?.region);

        var requestKMS=awsKMS?.createKey({
            MultiRegion:true,
            Origin:"AWS_KMS",
            KeySpec:"ECC_SECG_P256K1",
            KeyUsage:"SIGN_VERIFY",
        });

        let data:KMS.CreateKeyResponse=await requestKMS?.promise();
        
        let setAliasName:string=`alias/${params?.alias}`;
        // Create Alies
        await awsKMS.createAlias({
            AliasName:setAliasName,
            TargetKeyId:data.KeyMetadata.Arn
        })?.promise();

        console.log(
            clc.green(
                `Response => ${JSON.stringify({
                    kms:data?.KeyMetadata
                })}`
            )
        );

        return data?.KeyMetadata?.KeyId;

    }
    catch(ex)
    {
        throw ex;
    }

}