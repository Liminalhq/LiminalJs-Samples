import { AddressType, CoinsEnum, LiminalEnvironment, LiminalJs, Wallet } from "@lmnl/liminaljs";
import { GenerateAddressAsync } from "../../Helpers/GenerateAddress";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../Helpers/WalletInstance";
import { clientId, clientSecretId } from "../../Settings";

const main=async (): Promise<void>=>{

    // Step 1: Auth
    let liminalJs:LiminalJs=await LiminalAuthAsync({
        liminalOptions:{
            clientId:clientId,
            clientSecret:clientSecretId
        },
        env:LiminalEnvironment.test
    });

    //Step 2: Get Wallet Instance
    let walletInstance:Wallet=await WalletInstanceAsync({
        liminalJs:liminalJs,
        coin:CoinsEnum.eth,
        walletId:928
    });

    let response:AddressType=await GenerateAddressAsync({
        walletInstance:walletInstance,
        path:0
    });

    console.log(`Address Response=> ${JSON.stringify(response)}`);

}

main()
.then(()=> console.log("Script Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
});