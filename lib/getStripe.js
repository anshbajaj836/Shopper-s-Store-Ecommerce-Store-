import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
// initially it is gonna be empty object
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
}

export default getStripe;