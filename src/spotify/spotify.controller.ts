import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { DeletePlaylistResponseDto } from './dto/delete-playlist-response.dto';
import { GetPlaylistsResponseDto } from './dto/get-playlists-response.dto';
import { PlaylistDetailsResponseDto } from './dto/playlist-details-response.dto';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { SpotifyService } from './spotify.service';

@ApiTags('Spotify')
@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('auth/redirect')
  @ApiResponse({
    status: 302,
    description: 'Redirects the user to Spotify for authorization.',
  })
  async redirectToSpotify() {
    const authorizationUrl = this.spotifyService.getAuthorizationUrl();
    return { url: authorizationUrl };
  }

  @Get('auth/callback')
  @ApiQuery({
    name: 'code',
    description: 'Authorization code from Spotify',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Exchanges the authorization code for an access token.',
  })
  async handleSpotifyCallback(@Query('code') code: string) {
    const token = await this.spotifyService.exchangeCodeForToken(code);
    return { message: 'Token generated successfully', token };
  }

  @Get('playlists')
  @ApiResponse({ status: 200, type: GetPlaylistsResponseDto })
  async getPlaylists(): Promise<GetPlaylistsResponseDto> {
    return await this.spotifyService.getPlaylists();
  }

  @Post('playlists')
  @ApiResponse({ status: 201, type: PlaylistResponseDto })
  async createPlaylist(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<PlaylistResponseDto> {
    const userId = await this.spotifyService.getUserId();
    return await this.spotifyService.createPlaylist(createPlaylistDto, userId);
  }

  @Get('playlists/:id')
  @ApiParam({
    name: 'id',
    description: 'Spotify playlist ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    type: PlaylistDetailsResponseDto,
    description: 'Gets details of a specific playlist.',
  })
  async getPlaylistDetails(
    @Param('id') id: string,
  ): Promise<PlaylistDetailsResponseDto> {
    return await this.spotifyService.getPlaylistDetails(id);
  }

  @Put('playlists/:id')
  @ApiParam({
    name: 'id',
    description: 'Spotify playlist ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    type: PlaylistDetailsResponseDto,
    description: 'Updates a specific playlist.',
  })
  async updatePlaylist(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistDetailsResponseDto> {
    return await this.spotifyService.updatePlaylist(id, updatePlaylistDto);
  }

  @Delete('playlists/:id')
  @ApiParam({
    name: 'id',
    description: 'Spotify playlist ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    type: DeletePlaylistResponseDto,
    description: 'Deletes a specific playlist.',
  })
  async deletePlaylist(
    @Param('id') id: string,
  ): Promise<DeletePlaylistResponseDto> {
    return await this.spotifyService.deletePlaylist(id);
  }
}
