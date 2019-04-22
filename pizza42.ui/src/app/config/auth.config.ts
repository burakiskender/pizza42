interface AuthConfig {
    domain: string;
    clientId: string;
    callbackUrl: string;
    apiUrl: string;
  }

export const AUTH_CONFIG: AuthConfig = {
      domain: 'dev-wxbf7czc.au.auth0.com',
      clientId: 'WPLgYmuVZ3R2ea6b4V69g7eCxSnAjJkp',
      callbackUrl: 'http://localhost:4200/callback',
      apiUrl: 'http://localhost:4201',
  };
