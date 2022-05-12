# LiminalJs-Samples

SDK will help you to interact with multiple digital assets over a single robust interface. Several sensitive operations, such as signing transactions and status, must to be performed on the client-side.

We provide and recommend the use of our Software Development Kit (SDK), which implements these client-side wallet features and interfaces with our APIs.

## Node Version Support Policy
Currently, our SDK is available in JavaScript & Typescript and runs using Node.js. Please make sure you are running at least a greater version of Node 12 (LTS release is recommended) and the npm version must be greater than 6.

## Documentation
API and SDK documentation can be found at [https://docs.lmnl.app/docs](https://docs.lmnl.app/docs).

## Prerequisite
Aws/Azure client configuration is essential in the host machine.
<ul>
  <li>AWS : https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html</li>
  <li>Azure : https://docs.microsoft.com/en-us/cli/azure/get-started-with-azure-cli</li>
</ul> 

## Steps

#### Step 1:
On the top right click on the "Code" button. You can either download or clone the sample solution.

#### Step 2:
Create **.npmrc** file in the root folder.</br>
**Note**: We will provide npm settings to download our packages.

#### Step 3:
Run the following command in the terminal. Please ensure that you have linux machine.</br>
```
sudo apt-get install build-essential
```

#### Step 4:
Run the following command to download LiminalJs package.</br>
```
npm install
```

#### Step 5:
Open **.env** file for configuring setting of cloud and SDK key.

##### 5.1 Configure Cloud Settings
```
#Cloud Section

DEFAULT_KEY_ID=YOUR_DEFAULT_KEY_ID
#REGION=SET_AWS_REGION

# If you are using Azure Cloud Infrastructure otherwise comment the section.
AZURE_KEY_VAULT_URL=YOUR_AZURE_KEY_VAULT_URL
```
<ul>
  <li>DEFAULT_KEY_ID : here define key for AWS or Azure</li>
  <li>REGION : If you have AWS infrastructure then only add the Region specified in the AWS cloud.</li>
  <li>AZURE_KEY_VAULT_URL : If you have azure infrastructure then only add the key vault url.</li>
</ul> 

##### 5.2 Configure SDK Key Settings
```
#SDK Key

CLIENT_ID=YOUR_SDK_CLIENT_ID
CLIENT_SECRET_ID=YOUR_SDK_CLIENT_SECRET_ID
```
<ul>
  <li>CLIENT_ID : Define provided by liminal </li>
  <li>CLIENT_SECRET_ID : Define client secret id provided by liminal </li>
</ul>

#### Step 6
Run the following script to generate withdrwal wallet.
```
npm run start:gw
``` 
Sample Code Link : https://github.com/Liminalhq/LiminalJs-Samples/blob/main/src/Examples/Withdrawal/GenerateWalletExample.ts

Note:
<ul>
  <li>On line no. 21 kindly change the wallet name as per your preference.</li>
  <li>On line no. 22 kindly select the coin as per your requirement.</li>
</ul> 

Response: Here you will get following response.
```json
{
   "walletId":2064,
   "walletAddress":"0x9F947d144FEF971B7f09dd5A2eDA373F332d2896",
   "type":"pipeline",
   "subType":"hot",
   "chain":"ETH",
   "coin":"ETH",
   "parentChain":"EVM"
}
```

Sample Code:
```typescript
import { CloudProvider, CoinsEnum, GenerateWalletResultDataWrapper, LiminalEnvironment, LiminalJs, WalletType } from "@lmnl/liminaljs";
import { GenerateWalletAsync } from "../../Helpers/GenerateWallet";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { clientId, clientSecretId, keyId } from "../../Settings";

const main=async(): Promise<void>=>{
    
    // Step 1: Auth
    let liminalJs:LiminalJs=await LiminalAuthAsync({
        liminalOptions:{
            clientId:clientId,
            clientSecret:clientSecretId
        },
        env:LiminalEnvironment.test
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
                type:CloudProvider.AZURE
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
```

#### Step 7
Run the following script to send transactions.
```
npm run start:st
```
Sample Code Link : https://github.com/Liminalhq/LiminalJs-Samples/blob/main/src/Examples/Withdrawal/SendTransactionExample.ts

Note:
There are two options to add the wallet id either via **.env** file or via sample code(line no.26) 

.env File.
```
WALLET_ID=YOUR_WALLET_ID
```

Sample Code:
```typescript
import { CoinsEnum, LiminalEnvironment, LiminalJs,Wallet } from "@lmnl/liminaljs";
import { Guid } from "guid-typescript";
import { LiminalAuthAsync } from "../../Helpers/LiminalAuth";
import { WalletInstanceAsync } from "../../Helpers/WalletInstance";
import { ResendTransaction } from "../../Integration/ResendTransaction";
import { SendTransaction } from "../../Integration/SendTransaction";
import { clientId, clientSecretId, walletId } from "../../Settings";



const main=async():Promise<void>=>{

    // Step 1: Auth
    let liminalJs:LiminalJs=await LiminalAuthAsync({
        liminalOptions:{
            clientId:clientId,
            clientSecret:clientSecretId
        },
        env:LiminalEnvironment.test
    });

    //Step 2: Get Wallet Instance (Native Coin)
    let walletInstance:Wallet=await WalletInstanceAsync({
        liminalJs:liminalJs,
        coin:CoinsEnum.eth,
        walletId:Number(walletId)
    });

    // Step 2.1: Get Wallet Instance (Token)
    // let walletInstance:Wallet=await WalletInstanceAsync({
    //     liminalJs:liminalJs,
    //     coin:CoinsEnum.eth,
    //     walletId:Number(walletId),
    //     allToken:true,
    //     tokenOptions:{
    //         tokenName:"bat",
    //         tokenAddress:"0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99"
    //     }
    // });

    //Step 3: Resend Transaction (If transaction is not mined in the blockchain)
    ResendTransaction({
        walletInstance:walletInstance,
        sleepInMilliseconds:60000
    });

    // Step 4: Send Transaction

    let sequenceId:string=Guid.create().toString();
    console.log("sequenceId =>", sequenceId);

    await SendTransaction({
        walletInstance:walletInstance,
        recipients:[
            {
                address:"0x4014C023192ef37A91ADCEA4aC2fdD90914Bd76F",
                amount:0.00001
            }
        ],
        sequenceId: sequenceId
    });
}

main()
.then(()=> console.log("Script Complete"))
.catch((ex)=>{
    console.log("Error Message => ", ex.message);
});
```
