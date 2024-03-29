import { WriteEnvToFile } from "./SaveEnv";

export const ResetEnvFile=():void=>{

    WriteEnvToFile([
        {
            key:"ENVIRONMENT",
            value:"YOUR_ENVIRONMENT"
        },
        {
            key:"PROVIDER_NAME",
            value:"YOUR_CLOUD_PROVIDER_NAME"
        },
        {
            key:"DEFAULT_KEY_ID",
            value:"YOUR_KMS_DEFAULT_KEY_ID"
        },
        {
            key:"REGION",
            value:"YOUR_AWS_REGION"
        },
        {
            key:"CLIENT_ID",
            value:"YOUR_SDK_CLIENT_ID"
        },
        {
            key:"CLIENT_SECRET_ID",
            value:"YOUR_SDK_CLIENT_SECRET_ID"
        },
        {
            key:"WITHDRAWAL_WALLET_ID",
            value:"YOUR_WITHDRAWAL_WALLETID"
        },
        {
            key:"DEPOSIT_WALLET_ID",
            value:"YOUR_DEPOSIT_WALLET_ID"
        },
        {
            key:"TSM_URL",
            value:"YOUR_TSM_URL"
        },
        {
            key:"TSM_USER_ID",
            value:"YOUR_TSM_USER_ID"
        },
        {
            key:"TSM_PASSWORD",
            value:"YOUR_TSM_PASSWORD"
        },
        {
            key:"TSM_PUBLIC_KEY",
            value:"YOUR_TSM_PUBLIC_KEY"
        },
        {
            key:"TARGET_ADDRESS",
            value:"YOUR_TARGET_ADDRESS"
        },
        {
            key:"CONSOLIDATE_TRANSACTION_INTERVAL_IN_HOURS",
            value:"INTERVAL"
        },
        {
            key:"CO_SIGNERS_EMAILID",
            value:"YOUR_CO_SIGNERS_EMAILID"
        },
        {
            key:"AZURE_KEY_VAULT_URL",
            value:"YOUR_AZURE_KEY_VAULT_URL"
        }
    ]);

    console.log(`.env file is reset`);
}

ResetEnvFile();