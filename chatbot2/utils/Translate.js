import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import { awsRegion, awsIdentityPool } from '../config'

AWS.config.region = awsRegion
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsIdentityPool
})

const translateRunner = new AWS.Translate();

export const TranslateText = (text, targetLang='en', soureLang='auto') => {
    return new Promise((resolve, reject) => {
        const params = {
            SourceLanguageCode: soureLang,
            TargetLanguageCode: targetLang,
            Text: text
        };
        translateRunner.translateText(params, (err, data) => {
            if (err){
                reject(err)
            }
            else {
                resolve(data);
            }
        })
    })
}
