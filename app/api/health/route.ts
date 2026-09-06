export async function GET() {
  return Response.json({
    status: "ok",
    service: "the-eclipse-ai",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
}
