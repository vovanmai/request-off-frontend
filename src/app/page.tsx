'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SpinLoading from "../components/SpinLoading";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/dashboard')
  }, [router])

  return (
    <SpinLoading/>
  );
}
