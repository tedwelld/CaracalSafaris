export interface Activity {
  id: string;
  name: string;
  experienceSlug: string;
  destinationHint: string;
  priceUsd: number;
  image: string;
  duration: string;
  description?: string;
}

export interface CartItem {
  activityId: string;
  quantity: number;
}

export interface CartLine extends Activity {
  quantity: number;
  lineTotal: number;
}
