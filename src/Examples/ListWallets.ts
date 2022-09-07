import { GetBalanceResultDataWrapper, Wallet } from "@lmnl/liminaljs";
import { Pagination, TransferTransactionRequestResult, TransferTransactionWrapper } from "@lmnl/liminaljs";
import { SendManyOptions, SubmitOptions } from "@lmnl/liminaljs";
import { CloudProvider, LiminalJs, GetSignerPublicKeyResultDataWrapper, tsmCreds } from "@lmnl/liminaljs";
import { sleep, LiminalEnvironment, CoinsEnum } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { TransactionStatusAsync } from "../Helpers/TransactionStatus";




const main = async () => {
    try {
        // Instance of Liminal Js
        let liminalJs = new LiminalJs(LiminalEnvironment.test);
        await liminalJs
            .Authenticate({
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET_ID
            })
            .AuthenticateWithAccessToken();

        // Get Wallet Instance
        let walletList = await liminalJs
            .Coin(CoinsEnum.xrp)
            .Wallets()
            .WalletList();

        for(let i=0 ;i<walletList.length;i++){
            console.log(walletList[i].id,walletList[i].label,walletList[i].balanceString);
        }
    }
    catch (ex) {
        console.error(ex);
        throw ex;
    }
};
main().then((resolve) => console.log("Complete")).catch((error) => console.log(error));