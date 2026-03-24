import { submitToIndexNow } from "@/app/lib/indexNow";

export async function GET(req) {
  const urls = [
    "https://trimify.xyz/privacy-policy",
    "https://trimify.xyz/refund-policy",
    "https://trimify.xyz/terms-and-services",
    "https://trimify.xyz/pricing",
    "https://trimify.xyz/reset_password"
  ];

  const result = await submitToIndexNow(urls);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
