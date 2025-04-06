'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RecentTransactions from "@/components/RecentTransactions";
import { getAccounts, getAccount } from "@/lib/actions/user.actions";
import { useAuth } from "@/components/AuthWrapper";

const HomeClient = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [page, setPage] = useState<string | null>(null);

  const { user } = useAuth();
  const [accounts, setAccounts] = useState<{
    data: { accounts: any[], totalBanks: number, totalCurrentBalance: number }
  } | null>(null);
  const [accountInfo, setAccount] = useState<{
    data: { data: {}, transactions: any[] }
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
    <>
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={accounts?.data?.accounts || []}
            totalBanks={accounts?.data?.totalBanks || 0}
            totalCurrentBalance={accounts?.data?.totalCurrentBalance || 0}
          />
        </header>

        <RecentTransactions
          accounts={accounts?.data?.accounts || []}
          transactions={accountInfo?.data.transactions || []}
          appwriteItemId={appwriteItemId || ""}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={user}
        transactions={accountInfo?.data.transactions || []}
        banks={accounts?.data?.accounts?.slice(0, 2) || []}
      />
    </>
  );
};

export default HomeClient;
