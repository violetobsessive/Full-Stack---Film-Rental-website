export const oktaConfig = {
  clientId: "0oaboc1kxalfJrwAA5d7",
  issuer: "https://dev-12665995.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
