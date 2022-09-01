import { ApproxFeesResultDataWrapper, Wallet } from "@lmnl/liminaljs";

export interface IApproxFeeRateOption{
    walletInstance:Wallet;
}

export interface ApproxFeesResponseDataResult{
    fees?:string;
    feesRate?:string;
    ERC20TokenFees?: string;
}

export const ApproxFeesRateAsync=async(params:IApproxFeeRateOption):Promise<ApproxFeesResponseDataResult>=>{
    try
    {
        let approxFeesResultDataWrapper:ApproxFeesResultDataWrapper=await params?.walletInstance?.GetApproxFees();

        if(approxFeesResultDataWrapper.success){
            return approxFeesResultDataWrapper.data;
        }
        else
        {
            throw new Error(approxFeesResultDataWrapper?.message);
        }
    }
    catch(ex)
    {
        throw ex;
    }
}