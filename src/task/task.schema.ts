import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  // Note: field name intentionally matches user's spec: "redy"
  @Prop({ required: true, default: false })
  redy: boolean;

  @Prop({ required: true, default: false })
  urgently: boolean;

  @Prop({ required: true, default: 0, min: 0 })
  priority: number;

  @Prop({ required: true, default: false })
  archive: boolean;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
