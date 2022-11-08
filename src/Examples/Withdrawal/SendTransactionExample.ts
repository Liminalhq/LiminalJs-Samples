import { CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../Helpers/WalletInstance";
import { ResendTransaction } from "../../Integration/ResendTransaction";
import { SendTransaction } from "../../Integration/SendTransaction";
import { clientId, clientSecretId, env, withdrawalWalletId } from "../../Settings";

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
        coin: CoinsEnum.xrp,
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
    if (walletInstance.ParentChain == "EVM")
        ResendTransaction({
            walletInstance: walletInstance,
            sleepInMilliseconds: 60000
        });

    // Step 4: Send Transaction

    let sequenceId: string = Guid.create().toString();
    console.log("sequenceId =>", sequenceId);

    await SendTransaction({
        walletInstance: walletInstance,
        recipients: [
            {
                address: "r9Q9aUA8pizNmznrCisDssQQZew5o3bZWN",
                amount: 1
            }
        ],
        sequenceId: sequenceId
    });
}

main()
    .then(() => console.log("Script Complete"))
    .catch((ex) => {
        console.log("Error Message => ", ex.message);
    });




