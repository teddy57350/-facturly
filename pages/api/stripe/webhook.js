import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readBuffer(req) {
  return await new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).send("Missing stripe-signature header");
  }

  let event;

  try {
    const buf = await readBuffer(req);

    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const email =
        session.customer_details?.email ||
        session.customer_email ||
        null;

      console.log("PAIEMENT OK:", session.id);
      console.log("EMAIL:", email);

      // =========================
      // ICI TU AJOUTERAS TA LOGIQUE PRO
      // =========================
      //
      // Exemple plus tard avec base de données :
      //
      // if (email) {
      //   await db.user.upsert({
      //     where: { email },
      //     update: {
      //       isPro: true,
      //       plan: "pro",
      //       stripeCustomerId: session.customer || null,
      //       stripeSubscriptionId: session.subscription || null,
      //     },
      //     create: {
      //       email,
      //       isPro: true,
      //       plan: "pro",
      //       stripeCustomerId: session.customer || null,
      //       stripeSubscriptionId: session.subscription || null,
      //     },
      //   });
      // }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
