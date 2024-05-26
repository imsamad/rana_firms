import mongoose from 'mongoose';

export const connect_db = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);

    console.log(`Connected to MONGO!`);
  } catch (err) {
    throw err;
  }
};
