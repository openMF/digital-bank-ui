
export class Authentication {
  tokenType: string;
  accessToken: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
  passwordExpiration: string;

  constructor(tokenType: string,
              accessToken: string, accessTokenExpiration: string,
              refreshTokenExpiration: string,
              passwordExpiration: string) {
    this.tokenType = tokenType;
    this.accessToken = accessToken;
    this.accessTokenExpiration = accessTokenExpiration;
    this.refreshTokenExpiration = refreshTokenExpiration;
    this.passwordExpiration = passwordExpiration;
  }
}
