'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HeaderBox from '@/components/HeaderBox';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { getAccount, getAccounts } from '@/lib/actions/user.actions';
import { useAuth } from '@/components/AuthWrapper';

const PaymentTransferClient = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [page, setPage] = useState<string | null>(null);

  const { user } = useAuth();
  const [accounts, setAccounts] = useState<{
    data: { accounts: any[], totalBanks: number, totalCurrentBalance: number }
  } | null>(null);

  const [accountInfo, setAccount] = useState<{
    data: { data: Account, transactions: any[] }
  } | null>(null);

  const [appwriteItemId, setAppwriteItemId] = useState(null);

  useEffect(() => {
    setId(searchParams.get('id'));
    setPage(searchParams.get('page'));
  }, [searchParams]);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user?.userId) return;

      try {
        const accountsData = await getAccounts({ userId: user.userId });
        setAccounts(accountsData);
        console.log("In PaymentTransfer: AccountsData: ", accountsData);

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
    <>
      <HeaderBox 
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts?.data?.accounts || []} />
      </section>
    </>
  );
};

export default PaymentTransferClient;
