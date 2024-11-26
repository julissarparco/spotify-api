export interface HostConfig {
  host: string;
  port: number;
}

export interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface ConfigurationVariables {
  applicationName: string;
  environment: string;
  http: HostConfig;
  spotify: SpotifyConfig;
  databaseURL: string;
}
