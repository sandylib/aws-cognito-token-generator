
const jwtGenerator = require('../src/index');
const awsConfig = require('./config');

function printBanner() {
  console.log(`
        Loaded aws config values:
        ----------------------------------------------------------
        identityPoolId:\t${awsConfig.identityPoolId}
        userPoolId:\t${awsConfig.userPoolId}
        clientId:\t${awsConfig.clientId}
        userName:\t${awsConfig.username}
        password:\txxxxxxxxxx
        region: \t${awsConfig.region}
    `);
}
printBanner();

jwtGenerator(awsConfig, 120000).then( jwt => console.log('jwt', jwt));
