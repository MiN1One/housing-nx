import { IBill } from "@MiN1One/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Bill implements IBill {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  handle: string;

  @Prop({ type: String })
  icon: string;

  @Prop({ type: String })
  description: string;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
export type BillDocument = Bill & Document;