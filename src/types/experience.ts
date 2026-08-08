export interface Experience {
  slug: string;
  category: "wonder" | "wild" | "thrill" | "culture";
  label: string;
  title: string;
  description: string;
  image: string;
  destinations: string[];
  highlights: string[];
}
