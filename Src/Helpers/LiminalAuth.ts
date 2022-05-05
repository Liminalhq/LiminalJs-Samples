import { ILiminalOptions, LiminalEnvironment, LiminalJs } from "@lmnl/liminaljs";

export interface LiminalAuthOptions{
    liminalOptions:ILiminalOptions,
    env:LiminalEnvironment
}

export const LiminalAuthAsync=async(params:LiminalAuthOptions):Promise<LiminalJs>=>{
    try
    {
        let liminalJs:LiminalJs = new LiminalJs(params?.env);
        await liminalJs.Authenticate(params?.liminalOptions).AuthenticateWithAccessToken();

        return liminalJs;
    }
    catch(ex)
    {
        throw ex;
    }
}