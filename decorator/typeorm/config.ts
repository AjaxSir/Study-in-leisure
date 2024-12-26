import dotenv from 'dotenv'
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
const envFile = process.env.NODE_ENV === 'development' ? '.env': ''

dotenv.config({ path: envFile })

export const { 
    MYSQL_HOST,
    MYSQL_HOST_PORT,
    MYSQL_HOST_USER,
    MYSQL_HOST_PASSWORD,
    MYSQL_DATABASE_NAME,
 } = process.env