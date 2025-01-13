"use client"
import HomePage from "../components/homepage";
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
    </div>
  );
}
