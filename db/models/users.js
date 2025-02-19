import mongoose, { Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    elo : {type : Number, default : 1000 , min: [0, 'ELO cannot be negative'] },
    played : { type: Number , default : 0 },
  }
)

 // creating a middlieware for password hashing
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });


  userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  
  // Create index for leaderboard lookups
  userSchema.index({ elo: -1 });


export const User = mongoose.model('user', userSchema)