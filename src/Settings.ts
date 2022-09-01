import { tsmCreds } from "@lmnl/liminaljs";

import * as dotenv from "dotenv";
//import path from "path";
dotenv.config(
    {
        override:true
    }
);

export let keyId=process?.env?.DEFAULT_KEY_ID;

export let clientId=process?.env?.CLIENT_ID;
export let clientSecretId=process?.env?.CLIENT_SECRET_ID;

export let withdrawalWalletId=process?.env?.WITHDRAWAL_WALLET_ID;

export let depositWalletId=process?.env?.DEPOSIT_WALLET_ID;

export let tsmCred:tsmCreds={
    url:process?.env?.TSM_URL,
    userID:process?.env?.TSM_USER_ID,
    password:process?.env?.TSM_PASSWORD,
    publicKey:process?.env?.TSM_PUBLIC_KEY
}

export let targetAddress=process?.env?.TARGET_ADDRESS;

export let consolidateTransactionInterval=process?.env?.CONSOLIDATE_TRANSACTION_INTERVAL_IN_HOURS;

export let env=process?.env?.ENVIRONMENT;

export let cloudProviderName=process?.env?.PROVIDER_NAME;

export let regionName=process?.env?.REGION;