import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationVariables, SpotifyConfig } from './configuration.types';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService<ConfigurationVariables>) {}

  httpPort(): number {
    return this.configService.get<number>('http.port', { infer: true });
  }

  spotify(): SpotifyConfig {
    return this.configService.get<SpotifyConfig>('spotify', { infer: true });
  }

  environment(): string {
    return this.configService.get<string>('environment', { infer: true }) || '';
  }

  applicationName(): string {
    return (
      this.configService.get<string>('applicationName', { infer: true }) || ''
    );
  }

  databaseUri(): string {
    return this.configService.get<string>('databaseURL', { infer: true }) || '';
  }
}
