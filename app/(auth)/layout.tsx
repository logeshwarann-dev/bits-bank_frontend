import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between font-inter">
          {children}
          <div className="auth-asset">
            <div>
              <Image src="/icons/auth-img.png" alt="Auth image" width={650} height={900}/>
            </div>
            
          </div>
      </main>
    );
  }
  