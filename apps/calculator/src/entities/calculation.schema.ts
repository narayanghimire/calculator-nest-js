import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CalculationSchemaClass extends Document {
  @Prop({ required: true })
  query: string;

  @Prop({ required: true })
  result: number;
}

export const CalculationSchema = SchemaFactory.createForClass(
  CalculationSchemaClass,
);
