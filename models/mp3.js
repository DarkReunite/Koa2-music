import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mp3Schema = new Schema({
  name: String,
  artist: String,
  title: String,
  album: String,
  times: {type: Number, default: 0},
  saveAt: {type: String, default: ''},
  picture: {type: String, default: ''},
},
{
  timestamps: true
})

const mp3 = mongoose.model('mp3', mp3Schema);

export default mp3;