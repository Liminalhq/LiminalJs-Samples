import { sleep, TransferTransactionRequestResult, Wallet } from "@lmnl/liminaljs";

export interface ITransactionStatusOptions{
    walletInstance:Wallet;
    sequenceId:string;
}

export const TransactionStatusAsync=async(params:ITransactionStatusOptions):Promise<TransferTransactionRequestResult>=>{

    let transactionStatusResult:TransferTransactionRequestResult;

    try
    {
        while(true){

            transactionStatusResult=await params?.walletInstance?.TransferStatus({
                sequenceId:params?.sequenceId
            });

            if(transactionStatusResult.status===4 || transactionStatusResult.status===5 || transactionStatusResult.status===6){
                break;
            }

            await sleep(10000); //10 Seconds
        }

        return transactionStatusResult;
        
    }
    catch(ex)
    {
        throw ex;
    }
}