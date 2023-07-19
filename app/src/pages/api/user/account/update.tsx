const bcrypt = require('bcryptjs');

import { accountRepo } from '@/helpers/api/account-repo';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accountId, column, value } = req.body;

  const account = await accountRepo.getRecord(accountId);

  if (!account) {
    throw 'account not found';
  }

  let updatedAmount = 0;

  if (column === 'checking') {
    updatedAmount = Number(account.checking) + Number(value);
    await accountRepo.updateCheckingAccount(accountId, updatedAmount);
  } else if (column === 'savings') {
    updatedAmount = Number(account.savings) + Number(value);
    await accountRepo.updatSavingsAccount(accountId, updatedAmount);
  } else if (column === 'credit') {
    updatedAmount = Number(account.credit) + Number(value);
    await accountRepo.updateCreditAccount(accountId, updatedAmount);
  }
  if (Number(value) < 0) {
    updatedAmount = Number(account.spent) + (Number(value) * -1);
    await accountRepo.updateSpent(accountId, updatedAmount);
  }

  // Return updated account info
  return res.status(200).json({
    user_id: account.user_id,
    account_id: account.account_id,
    checking: account.checking,
    savings: account.savings,
    credit: account.credit,
    credit_limit: account.credit_limit,
    budget: account.budget
  });
}
