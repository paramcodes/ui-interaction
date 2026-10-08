import Link from "next/link";
import { concepts } from "@/lib/domain";
import { Demo, NextUp } from "@/components/Demos";
export default function Home() {
  return (<main><h1 className="text-3xl font-bold">UI Interaction Atlas</h1>
    <p className="mt-1 text-slate-600">Touch each demo, learn the term, then copy the prompt.</p><NextUp />
    {concepts.map((c) => (<section key={c.slug} className="my-8"><h2 className="text-xl font-semibold">{c.term}</h2>
      <p className="mb-2 text-slate-600">{c.what}</p><Demo k={c.slug} />
      <Link className="mt-2 inline-block text-indigo-700 underline" href={`/concepts/${c.slug}`}>Full lesson →</Link></section>))}</main>);
}
