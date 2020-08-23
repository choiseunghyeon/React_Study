import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
  //여기서 this는 문서 인스턴스를 가리킨다.
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫 번째 파라미터에는 토큰에 넣고 싶은 데이터
    {
      _id: this.id,
      username: this.username,
    },
    // 두 번째는 JWT암호
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // 7일 동안 유효
    },
  );
  return token;
};

UserSchema.statics.findByUsername = function (username) {
  // 스태틱 함수에서의 this는 모델을 가리킨다 즉 User.
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);

export default User;
