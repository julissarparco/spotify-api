import { ApiProperty } from '@nestjs/swagger';

export class DeletePlaylistResponseDto {
  @ApiProperty({
    description: 'Confirmation message',
    example: 'Playlist unsubscribed successfully',
  })
  readonly message: string;
}
