import { CreateAWSKMSKeyAsync } from "../../Helpers/CreateAwsKMSKey";
import { regionName } from "../../Settings";
const main=async():Promise<void>=>{

    let keyId:string=await CreateAWSKMSKeyAsync({
        region:regionName,
        alias:"Hello"
    });

    console.log(`AWS KMS Id => ${keyId}`);
}

main()
    ?.then((resolve)=> console.log("Script Complete"))
    ?.catch((error)=> console.log(error?.message));

