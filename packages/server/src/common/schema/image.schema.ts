import { IImage } from '@MiN1One/interfaces';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Image implements IImage {
  @Prop({ type: String })
  alt: string;

  @Prop({ type: String, required: [true, 'Image URL must be defined'] })
  src: string;
}
