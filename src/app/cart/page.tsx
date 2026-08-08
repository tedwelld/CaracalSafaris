import type { Metadata } from "next";
import CartPageClient from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review selected safari activities before checkout.",
};

export default function CartPage() {
  return (
    <section className="section-padding pt-28 md:pt-32">
      <div className="container-luxury">
        <CartPageClient />
      </div>
    </section>
  );
}
