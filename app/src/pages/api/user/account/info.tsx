const bcrypt = require("bcryptjs")
import { accountRepo } from "@/helpers/api/account-repo"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accountId } = req.body

  const account = await accountRepo.getRecord(accountId)

  if (!account) {
    throw "account not found"
  }

  // return basic account info
  return res.status(200).json({
    user_id: account.user_id,
    account_id: account.account_id,
    checking: account.checking,
    savings: account.savings,
    credit: account.credit,
    credit_limit: account.credit_limit,
    budget: account.budget
  })
}
