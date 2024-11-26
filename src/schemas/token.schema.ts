import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Token extends Document {
  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  expirationTime: number;

  @Prop({ required: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token).set(
  'collection',
  'tokens',
);
