import {
  DEFAULT_USER,
  EMaritalStatuses,
  EUserTypes,
  IUser,
  MaritalStatusTypes,
  UserTypes,
} from '@MiN1One/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { IReview } from 'libs/interfaces/src/interfaces/review.interfaces';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export interface UserMethods {
  isPasswordCorrect: (
    candidatePassword: string,
    currentPassword: string
  ) => Promise<boolean>;
  hasPasswordChanged: (
    tokenIssueTimestamp: number,
    passwordChangedAt: string
  ) => boolean;
}
@Schema({
  toJSON: { virtuals: true },
  timestamps: true,
  virtuals: true,
})
export class User implements IUser {
  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, unique: true, required: true, index: 1 })
  phoneNumber: string;

  @Prop({ type: String, unique: true, index: 1 })
  email: string;

  @Prop({ type: String, enum: Object.keys(EMaritalStatuses), required: true })
  maritalStatus: MaritalStatusTypes;

  @Prop({ type: Number, default: 1 })
  rating: number;

  @Prop({ type: String, enum: Object.keys(EUserTypes), default: DEFAULT_USER })
  role: UserTypes;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Review' }])
  reviews: IReview[] | string[];

  @Prop({ type: String, select: false, required: true })
  password: string;

  @Prop({ type: String })
  passwordChangedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User & UserMethods>;

UserSchema.methods.isPasswordCorrect = function (
  candidatePassword: string,
  currentPassword: string
) {
  return bcrypt.compare(candidatePassword, currentPassword);
};

UserSchema.methods.hasPasswordChanged = function (
  tokenIssueTimestamp: number,
  passwordChangedAt: string
) {
  return tokenIssueTimestamp > new Date(passwordChangedAt).getTime();
};

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 14);
    this.passwordChangedAt = new Date().toISOString();
  }
  next();
});
