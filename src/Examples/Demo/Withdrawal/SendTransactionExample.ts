import { CoinsEnum, LiminalEnvironment, LiminalJs, TransferTransactionRequestResult, tsmCreds, Wallet } from "@lmnl/liminaljs";
import { GetTransferTransactionListAsync, GetWalletBalanceAsync, LiminalAuthAsync, ResendEVMTransactionAsync, SendManyTransactionAsync, TransactionStatusLoopSuccessOrFailedAsync, WalletInstanceAsync } from "@lmnl/liminaljs/lib/V2/LiminalClientHelper";
import { Guid } from "guid-typescript";
import { clientId, clientSecretId, env, tsmCred, withdrawalWalletId } from "../../../Settings";

/**
 * Run Command : npm run start:st
 */

const main = async (): Promise<void> => {

    // Step 1: Auth
    let liminalJs: LiminalJs = await LiminalAuthAsync({
        liminalOptions: {
            clientId: clientId,
            clientSecret: clientSecretId
        },
        env: LiminalEnvironment[env]
    });

    //Step 2: Get Wallet Instance (Native Coin)
    let walletInstance: Wallet = await WalletInstanceAsync({
        liminalJs: liminalJs,
        coin: CoinsEnum.eth,
        walletId: Number(withdrawalWalletId)
    });

    // Step 2.1: Get Wallet Instance (Token)
    // let walletInstance:Wallet=await WalletInstanceAsync({
    //     liminalJs:liminalJs,
    //     coin:CoinsEnum.eth,
    //     walletId:Number(withdrawalWalletId),
    //     allToken:true,
    //     tokenOptions:{
    //         tokenName:"bat",
    //         tokenAddress:"0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99"
    //     }
    // });

    //Step 3: Resend Transaction (If transaction is not mined in the blockchain)
    if (walletInstance.ParentChain == "EVM"){

        // Resend Transaction method used for EVM base chain only.
        // This is CRON base method hence do not call this method in your API.

        ResendTransaction({
            walletInstance: walletInstance,
            sleepInMilliseconds: 60000
        });
    }

    // Step 4:Generate SequenceId and Send Transaction
    let sequenceId: string = Guid.create().toString();
    console.log("sequenceId =>", sequenceId);

    await SendTransaction({
        walletInstance: walletInstance,
        recipients: [
            {
                address:"3xZrNy2CdZ5yVoX9eSinrVuxWVH8t8ezp3eyCRGsrUNM",
                amount:0.01,
            }
        ],
        sequenceId: sequenceId,
        tsmCred:tsmCred
    });
}

main()
    .then(() => console.log("Script Complete"))
    .catch((ex) => {
        console.log("Error Message => ", ex.message);
});



export interface ISendTransactionOptions{
    walletInstance:Wallet;
    recipients:{
        address: string;
        amount: string | number;
        data?: string;
    }[],
    sequenceId?:string;
    tsmCred?:tsmCreds
}


const SendTransaction=async(params:ISendTransactionOptions):Promise<void>=>{

    try
    {
        // Get Wallet instance
        let walletInstance:Wallet=params?.walletInstance;
        
        if(walletInstance!==undefined){
            
            // Step 3.1: Get Wallet Balance
            let walletBalance=await GetWalletBalanceAsync({
                walletInstance:walletInstance
            });

            if(walletBalance?.success===true){

                console.log(`Wallet Balance Response => ${JSON.stringify(walletBalance)}`);

                // Check given recipients amount is less than Wallet balance
                if(Number(params?.recipients[0].amount)<=Number(walletBalance?.data?.balanceString)){

                    // Step 3.2: Send Transaction
                    let sendManyResponse=await SendManyTransactionAsync({
                        walletInstance:walletInstance,
                        recipientsData:{
                            recipients:params.recipients,
                            sequenceId:params?.sequenceId,
                            tsmCreds:params?.tsmCred
                        }
                    });

                    if(sendManyResponse?.success===false) 
                        throw new Error(sendManyResponse?.message);
    
                    console.log(`Send Many Response => `, JSON.stringify(sendManyResponse?.data));
    
    
                    // Step 3.3 : Check Transaction Status 
                    // This function used for demo purpose only.
                    // It will run until transaction status has not been changed from 4 or 5.
                    // Status 4 => Transaction successfully mined in the blockchain
                    // Status 5 => Transaction either canceled or failed.
                    let transactionStatus:TransferTransactionRequestResult=await TransactionStatusLoopSuccessOrFailedAsync({
                        walletInstance:walletInstance,
                        sequenceId:params?.sequenceId
                    });
    
                    console.log(`Transaction Status Response => ${JSON.stringify(transactionStatus)}`);
    
                    let statusLiteral={
                        1:'Pending',
                        2:'Broadcasted',
                        4:'Confirmed',
                        5:'Cancelled-Failed',
                    }
                    // Get Transaction Status by status literal
                    console.log("Transaction Status =>",statusLiteral[transactionStatus?.status]);
            
                    // Get Transaction Hash
                    console.log("Transaction Hash =>",transactionStatus?.identifier);
    
    
                    // Step 3.4: List of Transfer List
                    let listOfTransfers=await GetTransferTransactionListAsync({
                        walletInstance:walletInstance,
                        pagination:{
                            pageNumber:1,
                            pageSize:50
                        }
                    });

                    if(listOfTransfers?.success===false)
                        throw new Error(listOfTransfers?.message);
    
                    console.log(`List of Transfers Response =>`, JSON.stringify(listOfTransfers));
                }
                else
                {
                    throw new Error("Insufficient balance");
                }

            }
            else
            {
                throw new Error(walletBalance?.message);
            }
        }
    }
    catch(ex)
    {
        throw ex;
    }
}

export interface IResendTransactionOptions{
    walletInstance:Wallet;
    sleepInMilliseconds:number
}

export const ResendTransaction=async(params:IResendTransactionOptions) : Promise<void>=>{
    try
    {
        let walletInstance:Wallet=params?.walletInstance;

        await ResendEVMTransactionAsync({
            walletInstance:walletInstance,
            walletIdList:[Number(params?.walletInstance?.WalletId)],
            sleepInMilliseconds:params?.sleepInMilliseconds // 1 Min
        });
    }
    catch(ex)
    {
        throw ex;
    }
}



