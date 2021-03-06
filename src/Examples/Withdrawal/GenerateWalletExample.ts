import { CloudProvider, CoinsEnum, GenerateWalletResultDataWrapper, LiminalEnvironment, LiminalJs, WalletType } from "@lmnl/liminaljs";
import { GenerateWalletAsync } from "../../Helpers/GenerateWallet";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { clientId, clientSecretId, cloudProviderName, env, keyId } from "../../Settings";

const main=async(): Promise<void>=>{
    
    // Step 1: Auth
    let liminalJs:LiminalJs=await LiminalAuthAsync({
        liminalOptions:{
            clientId:clientId,
            clientSecret:clientSecretId
        },
        env:LiminalEnvironment[env]
    });

    // Step 2: Generate Wallet
    let wallet:GenerateWalletResultDataWrapper=await GenerateWalletAsync({
        liminalJs:liminalJs,
        wallet:{
            name:"YOUR_WALLET_NAME",
            coin:CoinsEnum.eth,
            walletType:WalletType.Withdrawal
        },
        signers:[
            {
                keyId:keyId,
                type:CloudProvider[cloudProviderName]
            }
        ]
    });

    if(wallet.success===true){
        console.log(`Wallet Response =>`, JSON.stringify(wallet.data));
    }
    else
    {
        console.log(`Error Message => ${wallet.message}`);
    }

}

main()
.then(()=> console.log("Script Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
});