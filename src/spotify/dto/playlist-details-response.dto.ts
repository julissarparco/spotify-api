import { ApiProperty } from '@nestjs/swagger';

export class PlaylistDetailsResponseDto {
  @ApiProperty({
    description: 'Spotify playlist ID',
    example: '37i9dQZF1DXcBWIGoYBM5M',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Name of the playlist',
    example: 'Top Hits 2024',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Description of the playlist',
    example: 'The hottest hits of 2024!',
  })
  readonly description: string;

  @ApiProperty({ description: 'Owner of the playlist', example: 'Spotify' })
  readonly owner: { id: string; display_name: string };

  @ApiProperty({ description: 'Tracks in the playlist', example: 50 })
  readonly tracks: { total: number };
}
