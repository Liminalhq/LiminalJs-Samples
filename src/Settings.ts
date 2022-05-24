import { tsmCreds } from "@lmnl/liminaljs";

import * as dotenv from "dotenv";
dotenv.config();

export const keyId=process?.env?.DEFAULT_KEY_ID;

export const clientId=process?.env?.CLIENT_ID;
export const clientSecretId=process?.env?.CLIENT_SECRET_ID;

export const walletId=process?.env?.WALLET_ID;

export const depositWalletId=process?.env?.DEPOSIT_WALLET_ID;

export const tsmCred:tsmCreds={
    url:process?.env?.TSM_URL,
    userID:process?.env?.TSM_USER_ID,
    password:process?.env?.TSM_PASSWORD,
    publicKey:process?.env?.TSM_PUBLIC_KEY
}

export const targetAddress=process?.env?.TARGET_ADDRESS;

export const consolidateTransactionInterval=process?.env?.CONSOLIDATE_TRANSACTION_INTERVAL_IN_HOURS;

export const env=process?.env?.ENVIRONMENT;
