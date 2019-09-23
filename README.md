# aws-cognito-token-generator library provides function to generator an aws user pool access token also aws identity pool access token

### the idea is come from my last project that is aws AppSync, aws cognito and working with react project. the aws amplify has provide UI and backend access to AppSync graphql, but when the testers came, they requires that access token (it is userpool access token also is identity pool access token, due to the project will also uses for internal staff, they don't need to signup again). here is the solution for the tests. 

## example for how to using 
## identityPoolId is optional, only required if you created identityPoolId

```javascript


const jwtGenerator = require('aws-cognito-token-generator');
const millisencondRefreshToken = 120000;
const awsConfig = {
  identityPoolId: '<your identity poolId only required when your user pool also allow identity pool access',
  region: '<region>',
  userPoolId: '<userPoolId>',
  clientId: '<clientId>',
  username: '<username>',
  password: '<password>'
};


jwtGenerator(awsConfig, millisencondRefreshToken).then( jwt => console.log('jwt', jwt));


```