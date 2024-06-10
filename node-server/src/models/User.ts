import { Schema, model, Document, HookNextFunction } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  username: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next: HookNextFunction) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;
