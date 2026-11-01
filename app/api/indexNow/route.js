import { submitToIndexNow } from "@/app/lib/indexNow";

export async function GET(req) {
  const urls = [
    "https://trimy.me/privacy-policy",
    "https://trimy.me/refund-policy",
    "https://trimy.me/terms-and-services",
    "https://trimy.me/pricing",
    "https://trimy.me/reset_password"
  ];

  const result = await submitToIndexNow(urls);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
