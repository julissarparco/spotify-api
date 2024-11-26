import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { MongoModule } from './mongo/mongo.module';
import { SpotifyModule } from './spotify/spotify.module';
import { VersionModule } from './version/version.module';

@Module({
  controllers: [AppController],
  imports: [ConfigurationModule, SpotifyModule, VersionModule, MongoModule],
  providers: [AppService],
})
export class AppModule {}
