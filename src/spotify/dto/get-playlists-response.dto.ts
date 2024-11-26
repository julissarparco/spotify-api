import { ApiProperty } from '@nestjs/swagger';

export class PlaylistItemDto {
  @ApiProperty({
    description: 'ID of the playlist',
    example: '5HYmNVSKZ0IXZ9XZzjUsN7',
  })
  readonly id: string;

  @ApiProperty({ description: 'Name of the playlist', example: 'My Playlist' })
  readonly name: string;

  @ApiProperty({
    description: 'Description of the playlist',
    example: 'A playlist created via the API',
  })
  readonly description: string;

  @ApiProperty({ description: 'Is the playlist public?', example: true })
  readonly public: boolean;

  @ApiProperty({
    description: 'Total number of tracks in the playlist',
    example: 10,
  })
  readonly tracks: { total: number };
}

export class GetPlaylistsResponseDto {
  @ApiProperty({ description: 'Array of playlists', type: [PlaylistItemDto] })
  readonly items: PlaylistItemDto[];

  @ApiProperty({ description: 'Total number of playlists', example: 5 })
  readonly total: number;
}
