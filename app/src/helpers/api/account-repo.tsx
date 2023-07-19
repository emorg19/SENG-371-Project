import excuteQuery from "../../lib/db"

export interface IAccount {
  user_id: number
  account_id: number
  checking: number
  savings: number
  credit: number
  credit_limit: number
  budget: number
}
export const accountRepo = {
  getRecord: (x: any) => getRecordByLoginId(x),
  updateCheckingAccount: (aID: number, val: number) =>
    updateCheckingAccount(aID, val),
  updatSavingsAccount: (aID: number, val: number) =>
    updatSavingsAccount(aID, val),
  updateCreditAccount: (aID: number, val: number) =>
    updateCreditAccount(aID, val),
  updateBudget: (aID: number, val: number) =>
    updateBudget(aID, val),
}

const getRecordByLoginId = async (
  accountId: number
): Promise<IAccount | undefined> => {
  try {
    const result = await excuteQuery(
      `
      SELECT * FROM accounts 
      WHERE account_id = ?;
      `,
      [accountId]
    )
    if (result && result[0]) {
      return result[0]
    }
  } catch (error) {
    console.log(error)
  }
}

const updateCheckingAccount = async (
  accountId: number,
  value: number
): Promise<IAccount | undefined> => {
  try {
    const result = await excuteQuery(
      `
      UPDATE accounts
      SET checking = '?'
      WHERE account_id = ?;
      `,
      [value, accountId]
    )
    if (result) {
      return result
    }
  } catch (error) {
    console.log(error)
  }
}

const updatSavingsAccount = async (
  accountId: number,
  value: number
): Promise<IAccount | undefined> => {
  try {
    const result = await excuteQuery(
      `
      UPDATE accounts
      SET savings = '?'
      WHERE account_id = ?;
      `,
      [value, accountId]
    )
    if (result) {
      return result
    }
  } catch (error) {
    console.log(error)
  }
}

const updateCreditAccount = async (
  accountId: number,
  value: number
): Promise<IAccount | undefined> => {
  try {
    const result = await excuteQuery(
      `
      UPDATE accounts
      SET credit = '?'
      WHERE account_id = ?;
      `,
      [value, accountId]
    )
    if (result) {
      return result
    }
  } catch (error) {
    console.log(error)
  }
}

const updateBudget = async (
  accountId: number,
  value: number
): Promise<IAccount | undefined> => {
  try {
    const result = await excuteQuery(
      `
      UPDATE accounts
      SET budget = '?'
      WHERE account_id = ?;
      `,
      [value, accountId]
    )
    if (result) {
      return result
    }
  } catch (error) {
    console.log(error)
  }
}
