import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password:process.env.POSTGRES_PASSWORD,
  database:process.env.POSTGRES_DATABASE,
  port:5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    console.log('Database connected successfully')
})

const query= (text:string, params:Array<string>) => pool.query(text, params)

export {query }
