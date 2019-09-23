const awsConfig = {
  identityPoolId: '<your identity poolId only required when your user pool also allow identity pool access',
  region: '<region>',
  userPoolId: '<userPoolId>',
  clientId: '<clientId>',
  username: '<username>',
  password: '<password>'
};

module.exports = awsConfig;
