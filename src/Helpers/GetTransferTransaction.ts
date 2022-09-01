import { Pagination, TransferTransactionRequestResult, TransferTransactionWrapper, Wallet } from "@lmnl/liminaljs";
import { TransactionStatusAsync } from "./TransactionStatus";

export interface IGetTransferTransactionOptions{
    walletInstance:Wallet;
    sequenceId:string;
}

export const GetTransferTransactionAsync=async (params:IGetTransferTransactionOptions):Promise<TransferTransactionWrapper>=>{
    try
    {   
        let status:TransferTransactionRequestResult= await TransactionStatusAsync({
            walletInstance:params?.walletInstance,
            sequenceId:params?.sequenceId
        });


        return await params?.walletInstance?.GetTransfer({
            txId:status.identifier
        });
    }
    catch(ex)
    {
        throw ex;
    }
}

export interface IGetTransferTransactionListOptions{
    walletInstance:Wallet;
    pagination:Pagination
}

export const GetTransferTransactionListAsync=async(params:IGetTransferTransactionListOptions):Promise<TransferTransactionWrapper[]>=>{
    try
    {   
        return await params?.walletInstance?.Transfers({
            pageNumber:params?.pagination?.pageNumber,
            limit:params?.pagination?.pageSize ?? 50
        });
    }
    catch(ex)
    {
        throw ex;
    }
}