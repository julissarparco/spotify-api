import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ description: 'Name of the playlist', example: 'My Playlist' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the playlist',
    example: 'A playlist created via the API',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Is the playlist public?',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public?: boolean;
}
