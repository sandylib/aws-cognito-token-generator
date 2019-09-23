
const cognito = require('./cognito');

let jwt;
let jwtRefreshTime = new Date();

/*
* awsConfig : required 
  type: object
  example
  const awsConfig = {
  identityPoolId: 'ap-southeast-2:xxxxxxxxxxxxxxxxx',
  region: 'ap-southeast-2',
  userPoolId: 'ap-southeast-xxxxxx',
  clientId: '5oxxxxxxxxxxxxxxxxxxx',
  username: '<youremail@bla.com.au>',
  password: '<your password>'
};

* expiredMilliseconds: required
  type: number
  example:120000

}
*/
async function jwtGenerator(awsConfig, expiredMilliseconds) {
  const isJwtExpired = new Date().getTime() - jwtRefreshTime.getTime() > expiredMilliseconds;
  if (!jwt || isJwtExpired) {
    jwt = await cognito.getJwtToken(awsConfig);
    jwtRefreshTime = new Date();
    console.log('Login with cognito ', jwt ? 'SUCCESS' : 'FAIL');
  }
  return jwt;
}

module.exports = jwtGenerator;