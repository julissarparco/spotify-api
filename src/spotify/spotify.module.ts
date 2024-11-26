import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { Token, TokenSchema } from 'src/schemas/token.schema';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [SpotifyService],
  controllers: [SpotifyController],
})
export class SpotifyModule {}
