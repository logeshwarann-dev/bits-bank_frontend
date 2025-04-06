'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthWrapper";
import HeaderBox from "@/components/HeaderBox";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";

const TransactionHistoryClient = () => {
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

  const currentPage = Number(page) || 1;

  useEffect(() => {
    const paramId = searchParams.get("id");
    const paramPage = searchParams.get("page");

    setId(paramId);
    setPage(paramPage);
  }, [searchParams]);

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
            <h2 className="text-18 font-bold text-white">
              {accountInfo?.data?.data?.name}
            </h2>
            <p className="text-14 text-blue-25">
              {accountInfo?.data?.data?.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {accountInfo?.data?.data?.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(accountInfo?.data?.data?.currentBalance || 0)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable 
            transactions={accountInfo?.data.transactions || []}
          />
        </section>
      </div>
    </div>
  );
};

export default TransactionHistoryClient;
