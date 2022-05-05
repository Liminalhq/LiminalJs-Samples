import * as dotenv from "dotenv";
dotenv.config();

export const clientId=process?.env?.CLIENT_ID;
export const clientSecretId=process?.env?.CLIENT_SECRET_ID;

export const walletId=process?.env?.WALLET_ID;