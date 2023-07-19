const bcrypt = require('bcryptjs');

import type { NextApiRequest, NextApiResponse } from 'next';
import { usersRepo } from '../../../helpers/api/user-repo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  const user = await usersRepo.find(username);

  // Validate
  if (!(user && bcrypt.compareSync(password, user.password))) {
    throw 'username or password is incorrect';
  }

  // Return basic user details and token
  return res.status(200).json({
    login_id: user.login_id,
    username: user.username,
    email: user.email
  });
}
