"use client";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { useAuth } from "@/components/AuthWrapper";
import React, { useEffect, useState } from "react";
import { getAccounts, getAccount } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import RecentTransactions from "@/components/RecentTransactions";

const Home = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const page = searchParams.get("page");

  const { user } = useAuth();
  const [accounts, setAccounts] = useState<{ data: { accounts: any[], totalBanks: number, totalCurrentBalance: number } } | null>(null);
  const [accountInfo, setAccount] = useState<{ data: {data: {}, transactions: any[] } } | null>(null);
  
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
  // console.log("AccountInfo: ", accountInfo);
  return (
    <section className="home">
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
        user={loggedIn}
        transactions={accountInfo?.data.transactions || []}
        banks={accounts?.data?.accounts?.slice(0, 2) || []}
      />
    </section>
  );
};

export default Home;

// const Home = async({searchParams: {id, page}}: SearchParamProps) => {
//   const { user } = useAuth();

//   const currentPage = Number(page as string) || 1
//   const loggedIn = user
//   const accounts = await getAccounts({userId: loggedIn.userId})
//   if (!accounts) return;
//   const accountsData = accounts?.data.accounts;
//   const appwriteItemId = accountsData[0]?.plaidTrackId;

//   const account = await getAccount({appwriteItemId}) // appwriteItemId is represented as plaidTrackId

//   return (
//     <section className="home">
//       <div className="home-content">
//         <header className="home-header">
//           <HeaderBox
//             type="greeting"
//             title="Welcome"
//             user={user?.firstName || "Guest"}
//             subtext="Access and manage your account and transactions efficiently."
//           />
//           <TotalBalanceBox  
//             accounts={accountsData} 
//             totalBanks={accounts?.data.totalBanks} 
//             totalCurrentBalance={accounts?.data.totalCurrentBalance} 
//           />
//         </header>

//         <RecentTransactions 
//           accounts={accountsData}
//           transactions={account?.transactions}
//           appwriteItemId={appwriteItemId}
//           page={currentPage}
//         />
//       </div>

//       <RightSidebar 
//         user={loggedIn} 
//         transactions={account?.transactions} 
//         banks={accountsData?.slice(0, 2)} 
//       />
//     </section>
//   );
// };

// export default Home;




// import HeaderBox from '@/components/HeaderBox'
// import RightSidebar from '@/components/RightSidebar';
// import TotalBalanceBox from '@/components/TotalBalanceBox';
// import { getLoggedInUser } from '@/lib/actions/user.server';
// import React from 'react'

// const Home = async () => {

//   const loggedIn = await getLoggedInUser();

//   return (
//     <section className='home'>
//       <div className='home-content'>
//         <header className='home-header'>
//           <HeaderBox
//             type="greeting"
//             title="Welcome"
//             user={loggedIn?.firstName || 'Guest'}
//             subtext="Access and manage your account and transactions efficiently."
//           />
//           <TotalBalanceBox  
//             accounts = {[]}
//             totalBanks = {1}
//             totalCurrentBalance = {1250.35}
//           />
//         </header>

//         RECENT TRANSACTIONS
//       </div>
      
//       <RightSidebar 
//         user={loggedIn}
//         transactions={[]}
//         banks={[{ currentBalance: 123.50}, { currentBalance: 500.50}]}
//       />
//     </section>
//   )
// }

// export default Home