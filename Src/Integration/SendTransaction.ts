import { GetBalanceResultDataWrapper, TransferTransactionRequestResult, TransferTransactionWrapper, Wallet } from "@lmnl/liminaljs";
import { GetTransferTransactionListAsync } from "../Helpers/GetTransferTransaction";
import { GetWalletBalanceAsync } from "../Helpers/GetWalletBalance";
import { SendManyTransactionAsync } from "../Helpers/SendManyTransaction";
import { TransactionStatusAsync } from "../Helpers/TransactionStatus";

export interface ISendTransactionOptions{
    walletInstance:Wallet;
    recipients:{
        address: string;
        amount: string | number;
        data?: string;
    }[],
    sequenceId?:string;
}


export const SendTransaction=async(params:ISendTransactionOptions):Promise<void>=>{

    try
    {
        
        let walletInstance:Wallet=params?.walletInstance;
        
        if(walletInstance!==undefined){
            
            // Step 3.1: Get Wallet Balance
            let walletBalance:GetBalanceResultDataWrapper=await GetWalletBalanceAsync({
                walletInstance:walletInstance
            });

            console.log(`Wallet Balance Response => ${JSON.stringify(walletBalance)}`);

            
            if(Number(params?.recipients[0].amount)<=Number(walletBalance?.balanceString)){

                // Step 3.2: Send Transaction
                let sendManyResponse:any=await SendManyTransactionAsync({
                    walletInstance:walletInstance,
                    recipientsData:{
                        recipients:params.recipients,
                        sequenceId:params?.sequenceId
                    }
                });

                console.log(`Send Many Response => `, JSON.stringify(sendManyResponse));


                // Step 3.3 : Check Transaction Status

                let transactionStatus:TransferTransactionRequestResult=await TransactionStatusAsync({
                    walletInstance:walletInstance,
                    sequenceId:params?.sequenceId
                });

                console.log(`Transaction Status Response => ${JSON.stringify(transactionStatus)}`);

                let statusLiteral={
                    1:'Pending',
                    2:'Broadcasted',
                    4:'Confirmed',
                    5:'Cancelled',
                    6:'Failed'
                }
                // Get Transaction Status by status literal
                console.log("Transaction Status =>",statusLiteral[transactionStatus?.status]);
        
                // Get Transaction Hash
                console.log("Transaction Hash =>",transactionStatus?.identifier);


                // Step 3.4: List of Transfer List

                let listOfTransfers:Array<TransferTransactionWrapper>=await GetTransferTransactionListAsync({
                    walletInstance:walletInstance,
                    pagination:{
                        pageNumber:1,
                        pageSize:50
                    }
                });

                console.log(`List of Transfers Response =>`, JSON.stringify(listOfTransfers));
            }
            else
            {
                throw new Error("Insufficient balance");
            }
            
        }
    }
    catch(ex)
    {
        throw ex;
    }
}