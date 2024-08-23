export interface Product {
  id: number; // Identifiant du produit
  name: string; // Nom du produit
  description?: string; // Description détaillée du produit, optionnel
  basePrice?: number; // Prix de base, optionnel
  unitPriceExclTax: number; // Prix par kilogramme (px_kg)
  VATRate: number; // Taux de TVA appliqué
  marginPercent?: number; // Marge bénéficiaire en pourcentage, optionnel
  sellingPrice: number; // Prix de vente final
  linearWeight?: number;
  productCode?: number; // Poids linéaire, optionnel

  // Propriétés spécifiques aux produits
  thickness?: number; // Épaisseur, optionnel
  height?: number; // Hauteur, optionnel
  width?: number; // Largeur, optionnel
  diameter?: number; // Diamètre, optionnel
  circumference?: number; // Circonférence, optionnel
  sectionArea?: number; // Section en cm², optionnel
  weight?: number; // Masse totale, optionnel
  pxKg: number; // Prix par kilogramme (px_kg)
  galvanizedPrice?: number; // Prix pour une version galvanisée, optionnel
}
