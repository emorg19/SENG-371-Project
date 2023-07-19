import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import { IAccount } from '@/helpers/api/account-repo';

const baseUrl = '/api/user/account';

export type accContextType = {
  account: IAccount | null;
  getAccount: (accountId: number) => Promise<IAccount | undefined> | null;
  currentAccount: () => IAccount | undefined;
  addFunds: (value: number, updateAccount: string) => Promise<any | undefined> | null;
  subtractFunds: (value: number, updateAccount: string) => Promise<any | undefined> | null;
};

const accContextDefaultValues: accContextType = {
  account: null,
  getAccount: (x: any) => null,
  currentAccount: () => undefined,
  addFunds: (value: number, updateAccount: string) => null,
  subtractFunds: (value: number, updateAccount: string) => null
};

const AccContext = createContext<accContextType>(accContextDefaultValues);

export function useAcc() {
  return useContext(AccContext);
}

export function AccProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<accContextType['account']>(null);

  useEffect(() => {
    const getAcc = async (loginId: number) => {
      const loadedAccount = await getAccount(loginId);

      if (loadedAccount && loadedAccount != undefined) {
        setAccount(loadedAccount);
      }

      return loadedAccount;
    };
    const storageUser = localStorage.getItem('user');

    if (storageUser !== 'null') {
      if (storageUser) {
        getAcc(JSON.parse(storageUser).login_id).catch(() => {
          console.log('Error loading account');
        });
      }
    }
  }, []);

  /**
   * This useEffect is triggered anytime that the account state is changed
   * Which means if a account logs in then it will be cached into the webpage
   */
  useEffect(() => {
    if (account !== accContextDefaultValues.account) {
      localStorage.setItem('account', JSON.stringify(account));
    }
  }, [account]);

  /**
   * Login function for the UserContext
   *
   * @param {string} username
   * @param {string} password
   * @return {*}
   */
  const getAccount = async (accountId: number): Promise<IAccount | undefined> => {
    const currentAccount = await fetchWrapper.post(`${baseUrl}/info`, {
      accountId
    });

    if (currentAccount) {
      setAccount(currentAccount);
    }

    return currentAccount;
  };

  const currentAccount = () => {
    if (account) {
      return account;
    }
  };
  const addFunds = async (amount: number, accountUpdate: string): Promise<any | undefined> => {
    console.log('accountUpdate', accountUpdate);
    const currentAccount = await fetchWrapper.post(`${baseUrl}/update`, {
      accountId: account?.account_id,
      column: accountUpdate,
      value: amount
    });

    return currentAccount;
  };
  const subtractFunds = async (amount: number, accountUpdate: string): Promise<any | undefined> => {
    console.log('accountUpdate', accountUpdate);
    const currentAccount = await fetchWrapper.post(`${baseUrl}/update`, {
      accountId: account?.account_id,
      column: accountUpdate,
      value: -amount
    });

    return currentAccount;
  };
  const addBudget = async (amount: number, accountUpdate: string): Promise<any | undefined> => {
    console.log('accountUpdate', accountUpdate);
    const currentAccount = await fetchWrapper.post(`${baseUrl}/updateBudget`, {
      accountId: account?.account_id,
      column: accountUpdate,
      value: amount
    });

    return currentAccount;
  };
  const value = {
    account,
    getAccount,
    currentAccount,
    addFunds,
    subtractFunds,
    addBudget
  };

  return <AccContext.Provider value={value}>{children}</AccContext.Provider>;
}
