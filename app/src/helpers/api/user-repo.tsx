import excuteQuery from '../../lib/db';

/**
 * User Repository is a file that is the only access to the data base for user information
 * This file should be used to access/create/delete/edit any user data
 * This file is used in conjuction with UserContext to support the login functionality
 */
export const usersRepo = {
  getAll: () => getAll(),

  /*
   * GetById: (id: number) =>
   *   users.find((x: any) => x.id.toString() === id.toString()),
   */
  find: (x: any) => find(x),
  findEmail: (x: any) => findEmail(x),
  create

  /*
   * Update,
   * delete: _delete,
   */
};

/**
 * Get all user in the login table.
 * Test function, wouldnt be used regularly
 *
 * @return {*}
 */
const getAll = async () => {
  try {
    const result = await excuteQuery('SELECT * FROM login;', []);

    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Find user is useful to access and compare user details for login
 *
 * @param {string} username
 * @return {*}
 */
const find = async (username: string) => {
  try {
    const result = await excuteQuery(
      'SELECT `login_id`,`username`,`password`, `email` FROM login WHERE `username` = ?;',
      [username]
    );

    if (result && result[0]) {
      return result[0];
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Find email is used during signup, to check if an email is already in use
 *
 * @param {string} email
 * @return {*}
 */
const findEmail = async (email: string) => {
  try {
    const result = await excuteQuery('SELECT * FROM login WHERE email = ?;', [email]);

    console.log('result', result);
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create function is used for the signup, to insert a new user record into the db
 *
 * @param {*} user
 * @return {*}
 */
async function create(user: any) {
  try {
    const loginResult = await excuteQuery(
      `
      INSERT INTO login(username,password, email) VALUES(?,?,?);
      `,
      [user.username, user.hash, user.email]
    );
    // Console.log("loginResult", loginResult)

    const userResult = await excuteQuery(
      `
      INSERT INTO users(login_id,user_last_name, user_first_name) VALUES(?,?,?);
      `,
      [loginResult.insertId, user.username, user.username]
    );
    // Console.log("userResult", userResult)
    console.log("before")
    const accountResult = await excuteQuery(
      `
      INSERT INTO accounts(user_id,checking, savings, credit,credit_limit, budget, spent) VALUES(?,?,?,?,?,?,?);
      `,
      [userResult.insertId, 100, 100, 100, 1000, 2000, 10]
    );
    // Console.log("accountResult", accountResult)
    console.log("after")
    return loginResult;
  } catch (error) {
    console.log(error);
  }
}

async function getLastId(): Promise<number> {
  const lastId = await excuteQuery(
    `
      SELECT LAST_INSERT_ID();
      `,
    []
  );

  return lastId;
}

/*
 * Function update(id: number, params: any) {
 *   Const user = users.find((x: any) => x.id.toString() === id.toString())
 */

/*
 *   // set date updated
 *   user.dateUpdated = new Date().toISOString()
 */

/*
 *   // update and save
 *   Object.assign(user, params)
 *   SaveData()
 * }
 */

// // prefixed with underscore '_' because 'delete' is a reserved word in javascript
// Function _delete(id: number) {
//   // filter out deleted user and save
//   Users = users.filter((x: any) => x.id.toString() !== id.toString())
//   SaveData()
// }
