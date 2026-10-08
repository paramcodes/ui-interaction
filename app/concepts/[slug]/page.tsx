import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts } from "@/lib/domain";
import { Demo, Status } from "@/components/Demos";
export const generateStaticParams = () => concepts.map((c) => ({ slug: c.slug }));
const T = (h: string, b: string) => (<section className="mt-5"><h2 className="font-semibold">{h}</h2><p>{b}</p></section>);
const L = (h: string, a: string[]) => (<section className="mt-5"><h2 className="font-semibold">{h}</h2><ul className="list-disc pl-5">{a.map((x) => <li key={x}>{x}</li>)}</ul></section>);
export default async function Lesson({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = concepts.find((x) => x.slug === slug); if (!c) notFound();
  return (<main><h1 className="text-3xl font-bold">{c.term}</h1>
    {T("What is it?", c.what)}{T("Problem without it", c.problem)}{T("When to use it", c.when)}{T("When not to", c.whenNot)}{T("How it works", c.how)}
    <section className="mt-5"><h2 className="mb-2 font-semibold">Live example</h2><Demo k={c.slug} /></section>
    {L("Trade-offs", c.tradeoffs)}{L("Accessibility", c.a11y)}{L("Performance", c.perf)}
    {T("Observe it in DevTools", c.evidence)}{T("Prompt vocabulary", c.prompt)}{T("Goes deeper (Frontend Atlas)", c.deeper)}
    <section className="mt-5"><h2 className="font-semibold">Related</h2><ul className="list-disc pl-5">{c.related.map((r) => <li key={r}><Link className="underline" href={`/concepts/${r}`}>{r}</Link></li>)}</ul></section>
    <Status slug={c.slug} /></main>);
}
