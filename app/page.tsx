"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const { status } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/dashboard')
    }
  }, [status])

  return (
    <div>
      <button onClick={() => signIn("asgardeo")}>
        Sign in
      </button>
    </div>
  );
}
