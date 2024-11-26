import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaylistDto {
  @ApiProperty({
    description: 'Name of the playlist',
    example: 'Updated Playlist Name',
    required: false,
  })
  readonly name?: string;

  @ApiProperty({
    description: 'Description of the playlist',
    example: 'Updated playlist description',
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
