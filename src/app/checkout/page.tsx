import type { Metadata } from "next";
import CheckoutForm from "@/components/cart/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Request a booking for your selected safari activities.",
};

export default function CheckoutPage() {
  return (
    <section className="section-padding pt-28 md:pt-32">
      <div className="container-luxury">
        <CheckoutForm />
      </div>
    </section>
  );
}
