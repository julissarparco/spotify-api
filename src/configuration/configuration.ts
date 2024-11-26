import { ConfigurationVariables } from './configuration.types';

export default function configuration(): ConfigurationVariables {
  return {
    applicationName: 'spotify-api',
    environment: process.env.API_ENVIRONMENT || 'development',
    http: {
      host: 'localhost',
      port: parseInt(process.env.API_PORT || '4005'),
    },
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI!,
    },
    databaseURL: process.env.DATABASE_URL!,
  };
}
