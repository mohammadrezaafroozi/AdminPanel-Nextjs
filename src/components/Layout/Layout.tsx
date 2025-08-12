import SideMenu from "@/components/SideMenu";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Head>
        <title>Afroozidev Admin panel</title>
      </Head>

      <main
        className="max-w-[85rem] m-auto 2xl:max-w-[92rem]"
        style={{ padding: isLoggedIn ? "0 24px 0 80px" : 0 }}
      >
        {isLoggedIn && <SideMenu />}
        {children}
         {isLoggedIn && <Footer />}
        
      </main>
    </>
  );
};

export default Layout;
