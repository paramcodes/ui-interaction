// Replace console output with your error/observability vendor in production.
export async function POST(req: Request) {
  console.log("[client]", (await req.text()).slice(0, 2000));
  return new Response(null, { status: 204 });
}
