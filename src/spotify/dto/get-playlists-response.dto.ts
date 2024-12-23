import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PlaylistTracksDto {
  @ApiProperty({
    description: 'Total number of tracks in the playlist',
    example: 10,
  })
  @IsNumber()
  total: number;
}

export class PlaylistItemDto {
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
    type: PlaylistTracksDto,
  })
  @ValidateNested()
  @Type(() => PlaylistTracksDto)
  readonly tracks: PlaylistTracksDto;
}

export class GetPlaylistsResponseDto {
  @ApiProperty({ description: 'Array of playlists', type: [PlaylistItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlaylistItemDto)
  readonly items: PlaylistItemDto[];

  @ApiProperty({ description: 'Total number of playlists', example: 5 })
  @IsNumber()
  readonly total: number;
}
