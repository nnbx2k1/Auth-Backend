import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();


export function initDatabase() {
    const DB_URL = process.env.DATABASE_URL
    mongoose.connection.on('open', () => {
    console.info('successfully connected to database:', DB_URL)
  })
  const connection = mongoose.connect(DB_URL)
  return connection
}
