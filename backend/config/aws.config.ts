import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });



const s3Config: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_KEY_ID!,
  },
  region: process.env.BUCKET_REGION,
};
const s3 = new S3Client(s3Config);
export default s3;
