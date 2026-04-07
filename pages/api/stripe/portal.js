import Stripe from "stripe";
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { customerId } = req.body;
 
  if (!customerId) {
    return res.status(400).json({ error: "Customer ID manquant" });
  }
 
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_URL,
    });
 
    return res.status(200).json({ url: session.url });
 
  } catch (error) {
    console.error("Portal error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
