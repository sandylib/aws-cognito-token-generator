const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
//warning: fetch is peer dependance by amazon-cognito-identity-js 
global.fetch = require('node-fetch');

// returns JWT promise based on cognito user pool
async function cognitoLogin({userPoolId, clientId, username, password, region, identityPoolId} ) {
  const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  return new Promise((resolve, reject) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
   
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
            if(region && identityPoolId) {
              AWS.config.region = region;
              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                  IdentityPoolId : identityPoolId,
                  Logins : { [`cognito-idp.ap-southeast-2.amazonaws.com/${userPoolId}`] : result.getIdToken().getJwtToken()}
              });
  
              AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                     // example: var s3 = new AWS.S3();
                     console.log('Successfully logged! Now could using your aws servers example s3 buckets');
                     result.getRefreshToken().getToken();
                     resolve(result.getAccessToken().getJwtToken());
                }
             });

            } else {
              resolve(result.getAccessToken().getJwtToken());
            }
      },
      onFailure(err) {
        reject(err);
      },
    });
  });
}


exports.getJwtToken = cognitoLogin;


