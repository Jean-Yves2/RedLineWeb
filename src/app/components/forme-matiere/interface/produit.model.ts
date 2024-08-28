export interface Produit {
  id: string;
  nom: string;
  schema: string;
  image: string;
  details?: string;
  quantite?: number;
  longueur?: number;
  description?: string;
  basePrice?: number;
  unitPriceExclTax?: number;
  VATRate?: number;
  marginPercent?: number;
  sellingPrice?: number;
  linearWeight?: number;
  thickness?: number;
  height?: number;
  width?: number | null;
  diameter?: number | null;
  circumference?: number | null;
  sectionArea?: number | null;
  weight?: number | null;
  matiere?: string;
  productCode?: number;
}
