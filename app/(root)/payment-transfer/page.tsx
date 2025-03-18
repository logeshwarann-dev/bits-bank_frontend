"use client";
import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { useAuth } from '@/components/AuthWrapper'
import TransactionsTable from '@/components/TransactionsTable'
import { getAccount, getAccounts } from '@/lib/actions/user.actions'
import { formatAmount } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Transfer = async () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const page = searchParams.get("page");
  
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
    <section className="payment-transfer">
      <HeaderBox 
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts?.data.accounts || []} />
      </section>
    </section>
  )
}

export default Transfer