import { CloudProvider, LiminalJs, GetSignerPublicKeyResultDataWrapper, tsmCreds } from "@lmnl/liminaljs";

export interface IGetSignerPublicKeyOptions{
    liminalJs:LiminalJs;
    cloudProvider:CloudProvider;
    tsmCred?:tsmCreds
}

export const GetSignerPublicKeyAsync=async(params:IGetSignerPublicKeyOptions):Promise<GetSignerPublicKeyResultDataWrapper[]>=>{
    try
    {   
        return await params?.liminalJs.GetSignerPublicKey({
            cloudProvider:params?.cloudProvider,
            tsmCreds:params?.tsmCred
        });
    }
    catch(ex)
    {
        throw ex;
    }
}