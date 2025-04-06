export const dynamic = "force-dynamic";

import MyBanksClient from './MyBankClient'

const MyBanks = () => {
  return (
    <section className="flex">
      <MyBanksClient />
    </section>
  );
};

export default MyBanks;





/*

'use client'
export const dynamic = "force-dynamic";
import BankCard from '@/components/BankCard'
import HeaderBox from '@/components/HeaderBox'
import { getAccount, getAccounts } from '@/lib/actions/user.actions';
import { useAuth } from '@/components/AuthWrapper'
import TransactionsTable from '@/components/TransactionsTable'
import { formatAmount } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const  MyBanks = () => {
    const searchParams = useSearchParams();
    const [id, setId] = useState<string | null>(null)
    const [page, setPage] = useState<string | null>(null)
  
    useEffect(() => {
      // ✅ Access searchParams safely inside useEffect
      const paramId = searchParams.get("id")
      const paramPage = searchParams.get("page")
      
      setId(paramId)
      setPage(paramPage)
    }, [searchParams])
  
    const { user } = useAuth();
    const [accounts, setAccounts] = useState<{ data: { accounts: any[], totalBanks: number, totalCurrentBalance: number } } | null>(null);
    const [accountInfo, setAccount] = useState<{ data: {data: Account, transactions: any[] } } | null>(null);
    
    const [appwriteItemId, setAppwriteItemId] = useState(null);
  
    const currentPage = Number(page) || 1;
    const loggedIn = user;
  
    useEffect(() => {
      const fetchAccounts = async () => {
        if (!loggedIn?.userId) return;
  
        try {
          const accountsData = await getAccounts({ userId: loggedIn.userId });
          setAccounts(accountsData);
          const firstItemId = accountsData?.data?.accounts?.[0]?.plaidTrackId;
          setAppwriteItemId(firstItemId);
  
          if (firstItemId) {
            const accountData = await getAccount({ appwriteItemId: firstItemId });
            // console.log("AccountData: ", accountData);
            setAccount(accountData);
            
          }
        } catch (error) {
          console.error("Error fetching accounts: ", error);
        }
      };
  
      fetchAccounts();
    }, [loggedIn?.userId]);
  
  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.accounts.map((a: Account) => (
              <BankCard 
                key={a.id}
                account={a}
                userName={loggedIn?.firstName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks

*/