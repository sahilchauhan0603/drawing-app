"use client"
import HomePage from "../components/homepage";
import Footer from "../components/footer";
import FeatureSectionPage from "@/components/featuresSection";
import { useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Page() {

  const { user } = useKindeBrowserClient();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <HomePage/>
      <FeatureSectionPage/>
      <Footer/>
    </div>
  );
}
