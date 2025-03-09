"use client";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { useAuth } from "@/components/AuthWrapper";
import React from "react";

const Home = () => {
  const { user } = useAuth(); // ✅ Get user from AuthWrapper

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
            accounts={[]} 
            totalBanks={1} 
            totalCurrentBalance={1250.35} 
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar 
        user={user} 
        transactions={[]} 
        banks={[{ currentBalance: 123.50 }, { currentBalance: 500.50 }]} 
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