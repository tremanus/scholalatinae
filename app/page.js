import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Home from "@/src/components/home";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/home');
  }

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}