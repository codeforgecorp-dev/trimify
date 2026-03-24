// app/lib/indexNow.js
export async function submitToIndexNow(urls = []) {
  const API_KEY = "e194ee704d1c4c37b530ace6d7903f59"; // your IndexNow key
  const DOMAIN = "trimify.xyz";
  const ENDPOINT = "https://api.indexnow.org/indexnow";

  if (urls.length === 0) return { success: false, message: "No URLs provided" };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: DOMAIN,
        key: API_KEY,
        urlList: urls,
      }),
    });

    if (response.ok) {
      console.log("✅ URLs submitted successfully:", urls);
      return { success: true, urls };
    } else {
      console.error("❌ IndexNow submission failed:", response.statusText);
      return { success: false, status: response.status, message: response.statusText };
    }
  } catch (err) {
    console.error("❌ Error submitting to IndexNow:", err);
    return { success: false, message: err.message };
  }
}
