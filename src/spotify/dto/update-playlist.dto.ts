import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePlaylistDto {
  @ApiProperty({
    description: 'Name of the playlist',
    example: 'Updated Playlist Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description: 'Description of the playlist',
    example: 'Updated playlist description',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Is the playlist public?',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly public?: boolean;
}
