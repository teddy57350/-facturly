import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 
export const config = {
  api: {
    bodyParser: false,
  },
};
 
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
 
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const rawBody = await getRawBody(req);
  const sig = req.headers["stripe-signature"];
 
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }
 
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
 
  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "invoice.payment_succeeded": {
        // Abonnement actif → is_pro = true
        const customerId = event.data.object.customer;
        const customer = await stripe.customers.retrieve(customerId);
        const email = customer.email;
 
        if (email) {
          await supabase
            .from("users")
            .upsert({ email, is_pro: true });
          console.log(`Pro activé pour ${email}`);
        }
        break;
      }
 
      case "customer.subscription.deleted": {
        // Abonnement annulé → is_pro = false
        const customerId = event.data.object.customer;
        const customer = await stripe.customers.retrieve(customerId);
        const email = customer.email;
 
        if (email) {
          await supabase
            .from("users")
            .update({ is_pro: false })
            .eq("email", email);
          console.log(`Pro désactivé pour ${email}`);
        }
        break;
      }
 
      default:
        console.log(`Event non géré : ${event.type}`);
    }
 
    return res.status(200).json({ received: true });
 
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
