import { SendManyOptions, SubmitOptions, Wallet } from "@lmnl/liminaljs";

export interface ISendManyTransactionOptions{
    walletInstance:Wallet;
    recipientsData:SendManyOptions; 
    submitOption?:SubmitOptions;
}

export const SendManyTransactionAsync=async(params:ISendManyTransactionOptions):Promise<any>=>{
    try
    {
        return await params?.walletInstance?.SendMany(params?.recipientsData,params?.submitOption);
    }
    catch(ex)
    {
        throw ex;
    }
}