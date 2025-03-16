"use client";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { useAuth } from "@/components/AuthWrapper";
import React from "react";
import { getAccounts } from "@/lib/actions/user.actions";

const Home = async({searchParams: {id, page}}: SearchParamProps) => {
  const { user } = useAuth();

  const currentPage = Number(page as string) || 1
  const loggedIn = user
  const accounts = await getAccounts({userId: loggedIn.userId})
  if (!accounts) return;
  const accountsData = accounts?.data.accounts;
  const appwriteItemId = (id as string) || accountsData[0]?.plaidTrackId;

  const account = await getAccount({appwriteItemId}) // appwriteItemId is represented as plaidTrackId

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
            accounts={accountsData} 
            totalBanks={accounts?.data.totalBanks} 
            totalCurrentBalance={accounts?.data.totalCurrentBalance} 
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedIn} 
        transactions={account?.transactions} 
        banks={accountsData?.slice(0, 2)} 
      />
    </section>
  );
};

export default Home;




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