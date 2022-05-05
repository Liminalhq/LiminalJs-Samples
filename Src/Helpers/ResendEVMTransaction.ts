import { PendingEVMTransactionResultDataWrapper, SignedTransaction, sleep, Wallet } from "@lmnl/liminaljs";

export interface IResendEVMTransactionAsync{
    walletInstance:Wallet;
    walletIdList:number[];
    sleepInMilliseconds:number;
}


export const ResendEVMTransactionAsync=async(params:IResendEVMTransactionAsync): Promise<void>=>{
    try
    {
        while(true){

            try
            {
                let pendingTransaction:PendingEVMTransactionResultDataWrapper=await params?.walletInstance?.PendingEVMTransaction({
                    walletIdList:params?.walletIdList
                });

                if(pendingTransaction!==undefined){
                    //SignTransaction
                    let halfSigned:SignedTransaction=await params?.walletInstance?.SignTransaction(null,pendingTransaction);

                    // Get sequenceId from the pending Transaction
                    let sequenceId=pendingTransaction.sequenceId;

                    // Submit Transaction
                    let transactionResponse:any=await params?.walletInstance?.ResendTransaction(halfSigned,sequenceId);

                    console.log("Resend Transaction Response: =>", JSON.stringify(transactionResponse));
            
                }
                else
                {
                    console.log("Resend Transaction => Pending Transaction Not Found");
                }
                
                await sleep(params.sleepInMilliseconds ?? 60000);
            }
            catch(ex)
            {
                console.log("Resend EVM Transaction => ",ex.message);
            }
        }
    }
    catch(ex)
    {
        throw ex;
    }
}