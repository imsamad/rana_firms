import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { t_z_user_schema } from '../z_schemas/User_Schema';

interface UserDoc extends t_z_user_schema, mongoose.Document {
  matchPassword(enteredPwd: string): Promise<boolean>;
}

const user_schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required!'],
      minlength: [5, "Username's minimum length must be 5."],
      unique: true,
    },
    fullname: {
      type: String,
      required: [true, 'Fullname is required!'],
      minlength: [8, "Fullname's minimum length must be 8."],
    },

    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [8, "Password's minimum length must be 8."],
      maxlength: [64, "Password's maximum length must be 64."],
      select: false,
    },
    is_confirmed: {
      type: Boolean,
      default: false,
    },

    is_blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

user_schema.pre('save', async function (next) {
  const user = this as UserDoc;

  if (!user.isModified) return next();

  const saltFactor: number = Number(process.env.SALT_FACTOR) || 10;

  const salt = await bcrypt.genSalt(saltFactor);

  user.password = bcrypt.hashSync(user.password, salt);

  next();
});

user_schema.methods.matchPassword = async function (
  enteredPwd: UserDoc['password']
) {
  return await bcrypt.compare(enteredPwd, this.password);
};

const User = mongoose.model<UserDoc>('User', user_schema);

export default User;
