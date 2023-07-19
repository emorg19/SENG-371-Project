import mysql from 'mysql2';

// Create the connection to database, the pool will maintain connection while app is up
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  database: process.env.MYSQL_DATABASE || 'db',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'pass'
});

const promisePool = pool.promise();

/**
 * Execute Query run any query given to it. With query and values.
 * if no values leave values = []
 *
 * @export
 * @param {string} query
 * @param {((string | number)[])} values
 * @return {*}
 */
export default async function excuteQuery(query: string, values: (string | number)[]) {
  try {
    const [rows] = await promisePool.query(query, values);

    return rows;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
