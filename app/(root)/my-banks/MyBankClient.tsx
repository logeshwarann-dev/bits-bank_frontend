'use client';

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import HeaderBox from '@/components/HeaderBox'
import BankCard from '@/components/BankCard'
import { getAccount, getAccounts } from '@/lib/actions/user.actions'
import { useAuth } from '@/components/AuthWrapper'

const MyBanksClient = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [page, setPage] = useState<string | null>(null);

  const { user } = useAuth();
  const [accounts, setAccounts] = useState<{ data: { accounts: any[], totalBanks: number, totalCurrentBalance: number } } | null>(null);
  const [accountInfo, setAccount] = useState<{ data: { data: Account, transactions: any[] } } | null>(null);
  const [appwriteItemId, setAppwriteItemId] = useState(null);

  useEffect(() => {
    setId(searchParams.get("id"))
    setPage(searchParams.get("page"))
  }, [searchParams])

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user?.userId) return;

      try {
        const accountsData = await getAccounts({ userId: user.userId });
        setAccounts(accountsData);

        const firstItemId = accountsData?.data?.accounts?.[0]?.plaidTrackId;
        setAppwriteItemId(firstItemId);

        if (firstItemId) {
          const accountData = await getAccount({ appwriteItemId: firstItemId });
          setAccount(accountData);
        }
      } catch (error) {
        console.error("Error fetching accounts: ", error);
      }
    };

    fetchAccounts();
  }, [user?.userId]);

  return (
    <div className="my-banks">
      <HeaderBox 
        title="My Bank Accounts"
        subtext="Effortlessly manage your banking activites."
      />
      <div className="space-y-4">
        <h2 className="header-2">Your cards</h2>
        <div className="flex flex-wrap gap-6">
          {accounts?.data.accounts.map((a: Account) => (
            <BankCard
              key={a.id}
              account={a}
              userName={user?.firstName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBanksClient;
