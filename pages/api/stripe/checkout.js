import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log("PRICE ID:", process.env.STRIPE_PRICE_ID);

export default async function handler(req, res) {
  // ✅ Autoriser uniquement POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ✅ Protection basique (évite abuse externe)
  const origin = req.headers.origin || "";
  if (!origin.includes("localhost") && !origin.includes("vercel.app")) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/?canceled=true`,
    });

    return res.status(200).json({ url: session.url });

} catch (error) {
  console.error("STRIPE ERROR:", error.message);
  return res.status(500).json({ error: error.message }); // ← change ici
}
  }
