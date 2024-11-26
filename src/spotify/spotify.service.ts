import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { ConfigurationService } from '../configuration/configuration.service';
import { Token } from '../schemas/token.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { DeletePlaylistResponseDto } from './dto/delete-playlist-response.dto';
import { GetPlaylistsResponseDto } from './dto/get-playlists-response.dto';
import { PlaylistDetailsResponseDto } from './dto/playlist-details-response.dto';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class SpotifyService {
  private readonly spotifyApiUrl = 'https://api.spotify.com/v1';

  constructor(
    private readonly configurationService: ConfigurationService,
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  /**
   * Generate the Spotify authorization URL
   */
  getAuthorizationUrl(): string {
    const clientId = this.configurationService.spotify().clientId;
    const redirectUri = this.configurationService.spotify().redirectUri;
    const scopes = ['playlist-modify-public', 'playlist-modify-private'].join(
      ' ',
    );

    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
      scopes,
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  /**
   * Exchange the authorization code for an access token and refresh token
   * @param code - Authorization code received from Spotify
   */
  async exchangeCodeForToken(
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const clientId = this.configurationService.spotify().clientId;
    const clientSecret = this.configurationService.spotify().clientSecret;
    const redirectUri = this.configurationService.spotify().redirectUri;

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
      },
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // Save token and refresh token in the database
    await this.tokenModel.updateOne(
      {},
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expirationTime: Date.now() + expires_in * 1000,
      },
      { upsert: true },
    );

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    };
  }

  /**
   * Refresh the access token using the refresh token
   */
  async refreshAccessToken(): Promise<string> {
    const token = await this.tokenModel.findOne();
    if (!token || !token.refreshToken) {
      throw new Error('No refresh token available. Please reauthenticate.');
    }

    const clientId = this.configurationService.spotify().clientId;
    const clientSecret = this.configurationService.spotify().clientSecret;

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=refresh_token&refresh_token=${token.refreshToken}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
      },
    );

    const { access_token, expires_in } = response.data;

    // Update token in the database
    token.accessToken = access_token;
    token.expirationTime = Date.now() + expires_in * 1000;
    await token.save();

    return access_token;
  }

  /**
   * Get a valid access token
   */
  async getAccessToken(): Promise<string> {
    let token = await this.tokenModel.findOne();

    if (!token || Date.now() > token.expirationTime) {
      return await this.refreshAccessToken();
    }

    return token.accessToken;
  }

  /**
   * Get the Spotify user ID of the authenticated user
   */
  async getUserId(): Promise<string> {
    const token = await this.getAccessToken();

    const response = await axios.get(`${this.spotifyApiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.id;
  }

  /**
   * Get the playlists of the authenticated user
   */
  async getPlaylists(): Promise<GetPlaylistsResponseDto> {
    const token = await this.getAccessToken();

    const response = await axios.get(`${this.spotifyApiUrl}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  /**
   * Create a playlist for the authenticated user
   * @param createPlaylistDto - DTO with the playlist details
   * @param userId - Spotify user ID
   */
  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
    userId: string,
  ): Promise<PlaylistResponseDto> {
    const token = await this.getAccessToken();

    const response = await axios.post(
      `${this.spotifyApiUrl}/users/${userId}/playlists`,
      {
        name: createPlaylistDto.name,
        description: createPlaylistDto.description || '',
        public:
          createPlaylistDto.public !== undefined
            ? createPlaylistDto.public
            : true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  /**
   * Get details of a specific playlist
   * @param playlistId - Spotify playlist ID
   */
  async getPlaylistDetails(
    playlistId: string,
  ): Promise<PlaylistDetailsResponseDto> {
    const token = await this.getAccessToken();

    const response = await axios.get(
      `${this.spotifyApiUrl}/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  /**
   * Update a specific playlist
   * @param playlistId - Spotify playlist ID
   * @param updateData - Data to update the playlist
   */
  async updatePlaylist(
    playlistId: string,
    updateData: UpdatePlaylistDto,
  ): Promise<PlaylistDetailsResponseDto> {
    const token = await this.getAccessToken();

    const response = await axios.put(
      `${this.spotifyApiUrl}/playlists/${playlistId}`,
      {
        name: updateData.name,
        description: updateData.description,
        public: updateData.public,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  /**
   * Delete a specific playlist
   * @param playlistId - Spotify playlist ID
   */
  async deletePlaylist(playlistId: string): Promise<DeletePlaylistResponseDto> {
    const token = await this.getAccessToken();

    await axios.delete(
      `${this.spotifyApiUrl}/playlists/${playlistId}/followers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { message: 'Playlist unsubscribed successfully' };
  }
}
