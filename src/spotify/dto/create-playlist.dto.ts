import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty({ description: 'Name of the playlist', example: 'My Playlist' })
  readonly name: string;

  @ApiProperty({
    description: 'Description of the playlist',
    example: 'A playlist created via the API',
    required: false,
  })
  readonly description?: string;

  @ApiProperty({
    description: 'Is the playlist public?',
    example: true,
    required: false,
  })
  readonly public?: boolean;
}
