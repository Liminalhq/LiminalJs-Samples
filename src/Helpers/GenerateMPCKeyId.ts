import { GenerateMPCKeyIDResultWrapper, tsmCreds, Wallet } from "@lmnl/liminaljs";

export interface IGenerateMPCKeyID{
    walletInstance:Wallet;
    tsmCred:tsmCreds;
}

export const GenerateMPCKeyIdAsync=async(params:IGenerateMPCKeyID) : Promise<GenerateMPCKeyIDResultWrapper>=>{
    try
    {
        return await params?.walletInstance?.GenerateMPCKeyID({
            tsmCreds:params?.tsmCred
        });
    }
    catch(ex)
    {
        throw ex;
    }
}