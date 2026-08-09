/**
 * Re-export Aphalis-compatible Bokun client from the consolidated module.
 * Prefer importing from `@/lib/bokun` in new code.
 */
export {
  bokunFetch,
  searchProducts,
  getProduct,
  getAvailabilities,
  getPriceList,
  createBooking,
  type BokunProduct,
  type BokunAvailability,
  type BokunSearchResult,
  type BokunBookingRequest,
  type BokunBookingResponse,
  type BokunBookingParticipant,
} from "@/lib/bokun";

import { bokunFetch, searchProducts, getProduct, getAvailabilities } from "@/lib/bokun";

/** Legacy object-style client kept for existing call sites. */
export const bokunClient = {
  searchActivities: (page = 1, pageSize = 50) =>
    searchProducts({ page, pageSize }),
  getActivity: (id: string | number) => getProduct(Number(id)),
  getAvailabilities: (id: string | number, start: string, end: string) =>
    getAvailabilities(Number(id), start, end),
  submitCheckout: (payload: unknown) =>
    bokunFetch("POST", "/checkout.json/submit", payload),
  confirmReserved: (confirmationCode: string, payload: unknown) =>
    bokunFetch("POST", `/checkout.json/confirm-reserved/${confirmationCode}`, payload),
};
