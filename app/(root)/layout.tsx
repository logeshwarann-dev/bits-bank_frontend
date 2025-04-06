"use client";
export const dynamic = "force-dynamic";

import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { AuthProvider, useAuth } from "@/components/AuthWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
    );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { user } = useAuth(); // ✅ Now inside AuthProvider

    return (
        <main className="flex h-screen w-full font-inter">
            <Sidebar user={user} />

            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
                    <div>
                        <MobileNav user={user} />
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}






// import MobileNav from '@/components/MobileNav';
// import Sidebar from '@/components/Sidebar'
// import { getLoggedInUser } from '@/lib/actions/user.server';
// import Image from 'next/image';
// import { redirect } from 'next/navigation';

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//  const loggedIn = await getLoggedInUser();
//  if(!loggedIn) redirect('/sign-in')

//   return (
//     <main className="flex h-screen w-full font-inter">
//         <Sidebar user={loggedIn}/>

//         <div className='flex size-full flex-col'>
//           <div className='root-layout'>
//             <Image src="/icons/logo.svg" width={30} height={30} alt="logo"/>
//             <div>
//               <MobileNav user={loggedIn}/>
//             </div>
//           </div>
//           {children}
//         </div>        
//     </main>
//   );
// }
