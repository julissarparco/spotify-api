import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class PlaylistOwnerDto {
  @ApiProperty({ description: 'Spotify user ID', example: 'spotify_user123' })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Display name of the playlist owner',
    example: 'Spotify',
  })
  @IsString()
  display_name: string;
}

export class PlaylistTracksDto {
  @ApiProperty({
    description: 'Total number of tracks in the playlist',
    example: 50,
  })
  @IsNumber()
  total: number;
}

export class PlaylistDetailsResponseDto {
  @ApiProperty({
    description: 'Spotify playlist ID',
    example: '37i9dQZF1DXcBWIGoYBM5M',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: 'Name of the playlist',
    example: 'Top Hits 2024',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Description of the playlist',
    example: 'The hottest hits of 2024!',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Owner of the playlist', type: PlaylistOwnerDto })
  @ValidateNested()
  @Type(() => PlaylistOwnerDto)
  readonly owner: PlaylistOwnerDto;

  @ApiProperty({
    description: 'Tracks in the playlist',
    type: PlaylistTracksDto,
  })
  @ValidateNested()
  @Type(() => PlaylistTracksDto)
  readonly tracks: PlaylistTracksDto;
}
