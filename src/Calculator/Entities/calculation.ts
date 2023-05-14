import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// this file could be renamed as calculation.schema.ts

@Schema({ timestamps: true })
export class Calculation extends Document {
  @Prop({ required: true })
  query: string;

  @Prop({ required: true })
  result: number;
}

export const CalculationSchema = SchemaFactory.createForClass(Calculation);
