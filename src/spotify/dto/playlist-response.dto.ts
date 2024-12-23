import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class PlaylistResponseDto {
  @ApiProperty({
    description: 'ID of the playlist',
    example: '5HYmNVSKZ0IXZ9XZzjUsN7',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: 'Name of the playlist', example: 'My Playlist' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Description of the playlist',
    example: 'A playlist created via the API',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Is the playlist public?', example: true })
  @IsBoolean()
  readonly public: boolean;

  @ApiProperty({
    description: 'Total number of tracks in the playlist',
    example: 0,
  })
  readonly tracks: { total: number };
}
