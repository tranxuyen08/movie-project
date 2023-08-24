import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
  // Các trường thông tin khác của người dùng
});

userSchema.statics.findOrCreate = function(condition: any, callback: any) {
  const self = this;
  self.findOne(condition, (err : any, result: any) => {
    if (result) {
      callback(err, result);
    } else {
      self.create(condition, (err: any, newUser: any) => {
        callback(err, newUser);
      });
    }
  });
};

const UserGoogle = mongoose.model('UserGoogle', userSchema);

export default UserGoogle;
