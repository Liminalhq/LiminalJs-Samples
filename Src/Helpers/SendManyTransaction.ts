import { SendManyOptions, SubmitOptions, Wallet } from "@lmnl/liminaljs";

export interface ISendManyTransactionOptions{
    walletInstance:Wallet;
    recipientsData:SendManyOptions; 
    submitOption?:SubmitOptions;
}

export const SendManyTransactionAsync=(params:ISendManyTransactionOptions):Promise<any>=>{
    try
    {
        return params?.walletInstance?.SendMany(params?.recipientsData,params?.submitOption);
    }
    catch(ex)
    {
        throw ex;
    }
}