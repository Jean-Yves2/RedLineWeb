import { Injectable } from '@angular/core';
import { Produit } from '../../components/forme-matiere/interface/produit.model';

@Injectable({
  providedIn: 'root',
})
export class FormeMatiereService {
  constructor() {}

  produits: {
    [key: string]: {
      id: string;
      details?: string;
      range?: { start: number; end: number };
      nom: string;
      schema: string;
      image: string;
    }[];
  } = {
    aluminium: [
      {
        id: 'alu1',
        range: { start: 1, end: 8 },
        nom: 'FER EN T',
        schema: 'assets/images/matiere/aluminium/fer_en_t/fer_t-alu.gif',
        image: 'assets/images/matiere/aluminium/fer_en_t/fer_t_img.gif',
      },
      {
        id: 'alu2',
        range: { start: 9, end: 28 },
        nom: 'CORNIER À AILES ÉGALES',
        schema:
          'assets/images/matiere/aluminium/corniere_egale/cornieres_egales-alu.gif',
        image:
          'assets/images/matiere/aluminium/corniere_egale/cornieres_egales_img.gif',
      },

      {
        id: 'alu3',
        range: { start: 29, end: 48 },
        nom: 'TUBE RECTANGULAIRE ALUMINIUM',
        schema:
          'assets/images/matiere/aluminium/tube_rectangulaire/tubes_rectangulaires-alu.gif',
        image:
          'assets/images/matiere/aluminium/tube_rectangulaire/tubes_rectangulaires_img-alu.gif',
        details: '• De 25 x 15 à 80 x 50',
      },
      {
        id: 'alu4',
        range: { start: 49, end: 56 },
        nom: 'Tube carré',
        schema:
          'assets/images/matiere/aluminium/tube_carres/tubes_carres-alu.gif',
        image:
          'assets/images/matiere/aluminium/tube_carres/tubes_carres-alu_img.gif',
        details: '• De 20 x 20 à 35 x 35',
      },
      {
        id: 'alu5',
        range: { start: 57, end: 73 },
        nom: 'Barre carrée pleine',
        schema:
          'assets/images/matiere/aluminium/barre_carres_pleines/barres_carrees.gif',
        image:
          'assets/images/matiere/aluminium/barre_carres_pleines/barres_carrees_img.gif',
      },
    ],
    inox: [
      {
        id: 'inox1',
        range: { start: 74, end: 82 },
        nom: 'CORNIÈRE À AILES ÉGALES INOX 304L',
        schema:
          'assets/images/matiere/inox/corniere_egale/cornieres_egales.gif',
        image:
          'assets/images/matiere/inox/corniere_egale/cornieres_egales_img.gif',
      },
      {
        id: 'inox2',
        range: { start: 83, end: 91 },
        nom: 'FER EN T INOX 304L',
        schema: 'assets/images/matiere/inox/fer_t/fer_t.gif',
        image: 'assets/images/matiere/inox/fer_t/fer_t_img.gif',
      },

      {
        id: 'inox3',
        range: { start: 92, end: 109 },
        nom: 'TUBE ROND INOX 304L',
        schema: 'assets/images/matiere/inox/tube_rond/tubes_ronds.gif',
        image: 'assets/images/matiere/inox/tube_rond/tubes_ronds_img.gif',
        details: '• 17,2 à 60,3',
      },
      {
        id: 'inox4',
        range: { start: 110, end: 124 },
        nom: 'BARRE ROND PLEIN INOX 304L',
        schema:
          'assets/images/matiere/inox/barres_rondes_pleines/barres_rondes.gif',
        image:
          'assets/images/matiere/inox/barres_rondes_pleines/barres_rondes_img.gif',
      },
      {
        id: 'inox5',
        range: { start: 125, end: 134 },
        nom: 'Fer plat',
        schema: 'assets/images/matiere/inox/fer_plat/fer_plat.gif',
        image: 'assets/images/matiere/inox/fer_plat/fer_plat_img.gif',
      },
    ],
    acier: [
      {
        id: 'acier1',
        nom: 'CORNIÈRE À AILES ÉGALES ACIER E24.S235',
        schema:
          'assets/images/matiere/acier/corniere_egale/cornieres_egales.gif',
        image:
          'assets/images/matiere/acier/corniere_egale/cornieres_egales_img.gif',
      },
      {
        id: 'acier2',
        nom: 'CORNIÈRE À AILES INÉGALES ACIER E24.S235',
        schema:
          'assets/images/matiere/acier/corniere_inegale/cornieres_inegales.gif',
        image:
          'assets/images/matiere/acier/corniere_inegale/cornieres_inegales_img.gif',
      },
      {
        id: 'acier3',
        nom: 'FER EN T ACIER E24.S235',
        schema: 'assets/images/matiere/acier/fer_t/fer_t.gif',
        image: 'assets/images/matiere/acier/fer_t/fer_t_img.gif',
      },
      {
        id: 'acier4',
        nom: 'TUBE CARRÉ ACIER E24.S235',
        schema: 'assets/images/matiere/acier/tube_carrés/tubes_carres.gif',
        image: 'assets/images/matiere/acier/tube_carrés/tubes_carres_img.gif',
        details: '• De 20 x 20 à 35 x 35',
      },
      {
        id: 'acier5',
        nom: 'TUBE RECTANGULAIRE ACIER E24.S235 ',
        schema:
          'assets/images/matiere/acier/tube_rectangulaire/tubes_rectangulaires.gif',
        image:
          'assets/images/matiere/acier/tube_rectangulaire/tubes_rectangulaires_img.gif',
        details: '• De 30 x 20 à 80 x 40',
      },
    ],
    galva: [
      {
        id: 'galva1',
        range: { start: 135, end: 138 },
        nom: 'CORNIÈRE À AILES ÉGALES GALVA',
        schema:
          'assets/images/matiere/galva/corniere_egale/cornieres_egales.gif',
        image:
          'assets/images/matiere/galva/corniere_egale/cornieres_egales_img.gif',
      },
      {
        id: 'galva2',
        range: { start: 139, end: 149 },
        nom: 'TUBE ROND GALVA SENDZINIR NF EN 10305-3 S4',
        schema: 'assets/images/matiere/galva/tube_rond/tubes_ronds.gif',
        image: 'assets/images/matiere/galva/tube_rond/tubes_ronds_img.gif',
      },
      {
        id: 'galva3',
        range: { start: 150, end: 160 },
        nom: 'TUBE CARRÉ GALVA SENDZINIR NF EN 10305-3 S4',
        schema: 'assets/images/matiere/galva/tube_carres/tubes_carres.gif',
        image: 'assets/images/matiere/galva/tube_carres/tubes_carres_img.gif',
      },
      {
        id: 'galva4',
        range: { start: 161, end: 169 },
        nom: 'TUBE RECTANGULAIRE GALVA SENDZINIR NF EN 10305-3 S4',
        schema:
          'assets/images/matiere/galva/tube_rectangulaire/tubes_rectangulaires-galva.gif',
        image:
          'assets/images/matiere/galva/tube_rectangulaire/tubes_rectangulaires_img-galva.gif',
      },
      {
        id: 'galva5',
        range: { start: 170, end: 172 },
        nom: 'TOLES PERFORÉES EN GALVA A CHAUD NF EN 10346 À TROUS',
        schema: 'assets/images/matiere/galva/tole_perforees/toles.gif',
        image:
          'assets/images/matiere/galva/tole_perforees/tole-perforee-rond.jpg',
        details: 'CARRÉS OU RONDS',
      },
    ],
  };

  getProduits() {
    return this.produits;
  }

  getProduitsParCategorie(categorie: string): Produit[] {
    return this.produits[categorie] || [];
  }
}
