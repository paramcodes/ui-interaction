"use client";
import { useEffect } from "react";
import { reportError } from "@/lib/report";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { reportError(error); }, [error]);
  return (<main role="alert"><h1 className="text-2xl font-bold">Something went wrong</h1><button className="btn mt-3" onClick={reset}>Try again</button></main>);
}
