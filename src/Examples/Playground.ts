import { LiminalJs, TransferTransactionRequestResult} from "@lmnl/liminaljs";
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
        let walletInstance = await liminalJs
            .Coin(CoinsEnum.xrp)
            .Wallets()
            .Get({ walletId: 3044 });

        console.log("Wallet details =>",await walletInstance.GetWallet())
        // Get Balance
        let response = await walletInstance?.GetBalance();
        console.log("Wallet Balance =>", response);

        while(true){
        let sequenceId: string = Guid.create().toString();
        let recipients = {
            recipients: [
                {
                    address: "rpDQiewxxXe6t9gK3aRY7tgjVNvipnPyri",
                    amount: 1
                }
            ],
            sequenceId: sequenceId
        };

        let transactionResponse = await walletInstance.SendMany(recipients);

        console.log("Send Many Transaction id: =>", transactionResponse);

        // let transactionStatus:TransferTransactionRequestResult=await TransactionStatusAsync({
        //     walletInstance:walletInstance,
        //     sequenceId:sequenceId
        // });

        // console.log(transactionStatus)
        await sleep(3000)
    }
    }
    catch (ex) {
        console.error(ex);
        throw ex;
    }
};
main().then((resolve) => console.log("Complete")).catch((error) => console.log(error.message));