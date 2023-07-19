const bcrypt = require("bcryptjs")
import { accountRepo } from "@/helpers/api/account-repo"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accountId, column, value } = req.body

  const account = await accountRepo.getRecord(accountId)

  if (!account) {
    throw "account not found"
  }

  let updatedAmount = 0

    updatedAmount = Number(account.budget) + Number(value)
    await accountRepo.updateBudget(accountId, updatedAmount)
  
  // return updated account info
  return res.status(200).json({
    user_id: account.user_id,
    account_id: account.account_id,
    checking: account.checking,
    savings: account.savings,
    credit: account.credit,
    credit_limit: account.credit_limit,
    budget: account.budget,
  })
}
