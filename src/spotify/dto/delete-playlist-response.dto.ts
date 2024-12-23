import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeletePlaylistResponseDto {
  @ApiProperty({
    description: 'Confirmation message',
    example: 'Playlist unsubscribed successfully',
  })
  @IsString()
  readonly message: string;
}
