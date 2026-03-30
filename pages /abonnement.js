import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('VOTRE_CLÉ_PUBLIQUE'); // Remplacez par votre clé publique Stripe

function AbonneButton() {
  const handleSubscribe = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const data = await response.json();

    if (data.sessionId) {
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert('Erreur lors de la création de la session.');
    }
  };

  return (
    <button onClick={handleSubscribe}>S’abonner</button>
  );
}

export default function AbonnementPage() {
  return (
    <div>
      <h1>Abonnement</h1>
      <AbonneButton />
    </div>
  );
}
