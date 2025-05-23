export const dynamic = "force-dynamic";
import TransactionHistoryClient from "./TransactionHistoryClient";

const TransactionHistory = () => {
  return <TransactionHistoryClient />;
};

export default TransactionHistory;





/*
'use client'
export const dynamic = "force-dynamic";
import { useAuth } from '@/components/AuthWrapper'
import HeaderBox from '@/components/HeaderBox'
import TransactionsTable from '@/components/TransactionsTable'
import { getAccount, getAccounts } from '@/lib/actions/user.actions'
import { formatAmount } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TransactionHistory = () => {
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
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox 
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{accountInfo?.data?.data?.name}</h2>
            <p className="text-14 text-blue-25">
              {accountInfo?.data?.data?.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {accountInfo?.data?.data?.mask}
            </p>
          </div>
          
          <div className='transactions-account-balance'>
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">{formatAmount(accountInfo?.data?.data?.currentBalance || 0)}</p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable 
            transactions={accountInfo?.data.transactions || []}
          />
            {/* {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={currentPage} />
              </div>
            )} */ /*}
        </section>
      </div>
    </div>
  )
}

export default TransactionHistory


*/