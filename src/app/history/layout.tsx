'use client'
import { useAuth } from "../auth/AutoWrapper";
import { redirect } from "next/navigation";

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const { user } = useAuth();

  if (user === null) {
    return redirect("/");
  }
  return <div>{children}</div>
}
