import { Module } from '@nestjs/common';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';

@Module({
  controllers: [VersionController],
  providers: [ConfigurationService, VersionService],
  exports: [VersionService],
})
export class VersionModule {}
