// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { usersRepo } from "../../../helpers/api/user-repo"
const bcrypt = require("bcryptjs")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // split out password from user details
  const { JSONdata } = req.body
  const { password, ...user } = JSON.parse(JSONdata)

  // validate
  const checkEmail = await usersRepo.findEmail(user.email)
  if (!checkEmail || !!checkEmail.length) {
    throw `User with the email "${user.email}" already exists`
  }

  // hash password
  user.hash = bcrypt.hashSync(password, 10)

  usersRepo.create(user)
  return res.status(200).json({})
}
