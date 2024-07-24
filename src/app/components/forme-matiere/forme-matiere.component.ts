import { Component } from '@angular/core';
import { Produit } from '../forme-matiere/interface/produit.model';

@Component({
  selector: 'app-forme-matiere',
  templateUrl: './forme-matiere.component.html',
  styleUrls: ['./forme-matiere.component.scss'],
})
export class FormeMatiereComponent {
  selectedCategory: string = 'inox';

  produits: { [key: string]: Produit[] } = {
    aluminium: [
      {
        nom: 'FER EN T',
        schema: 'assets/images/matiere/aluminium/fer_en_t/fer_t-alu.gif',
        image: 'assets/images/matiere/aluminium/fer_en_t/fer_t_img.gif',
      },
      {
        nom: 'CORNIER À AILES ÉGALES',
        schema:
          'assets/images/matiere/aluminium/corniere_egale/cornieres_egales-alu.gif',
        image:
          'assets/images/matiere/aluminium/corniere_egale/cornieres_egales_img.gif',
      },
      {
        nom: 'PROFILÉ H ALUMINIUM',
        schema: 'assets/images/matiere/aluminium/profile_h/poutrelles_he.gif',
        image:
          'assets/images/matiere/aluminium/profile_h/poutrelles_he_img.gif',
      },
      {
        nom: 'PROFILÉ U ALUMINIUM',
        schema:
          'assets/images/matiere/aluminium/profile_u/poutrelles_upn-alu.gif',
        image:
          'assets/images/matiere/aluminium/profile_u/poutrelles_upn_img.gif',
      },
      {
        nom: 'TUBE RECTANGULAIRE ALUMINIUM',
        schema:
          'assets/images/matiere/aluminium/tube_rectangulaire/tubes_rectangulaires-alu.gif',
        image:
          'assets/images/matiere/aluminium/tube_rectangulaire/tubes_rectangulaires_img-alu.gif',
        details: '• De 25 x 15 à 80 x 50',
      },
      {
        nom: 'TUBE RECTANGULAIRE ALUMINIUM',
        schema:
          'assets/images/matiere/aluminium/tube_rectangulaire/tubes_rectangulaires-alu.gif',
        image:
          'assets/images/matiere/aluminium/tube_rectangulaire/tubes_rectangulaires_img-alu.gif',
        details: '• De 100 x 40 à 200 x 100',
      },
    ],
    inox: [
      {
        nom: 'CORNIÈRE À AILES ÉGALES INOX 304L',
        schema:
          'assets/images/matiere/inox/corniere_egale/cornieres_egales.gif',
        image:
          'assets/images/matiere/inox/corniere_egale/cornieres_egales_img.gif',
      },
      {
        nom: 'FER EN T INOX 304L',
        schema: 'assets/images/matiere/inox/fer_t/fer_t.gif',
        image: 'assets/images/matiere/inox/fer_t/fer_t_img.gif',
      },
      {
        nom: 'POUTRELLE HEA / HEB INOX 304L',
        schema: 'assets/images/matiere/inox/poutrelle_hea/poutrelles_he.gif',
        image: 'assets/images/matiere/inox/poutrelle_hea/poutrelles_he_img.gif',
      },
      {
        nom: 'TUBE ROND INOX 304L',
        schema: 'assets/images/matiere/inox/tube_rond/tubes_ronds.gif',
        image: 'assets/images/matiere/inox/tube_rond/tubes_ronds_img.gif',
        details: '• 17,2 à 60,3',
      },
      {
        nom: 'TUBE ROND INOX 304L',
        schema: 'assets/images/matiere/inox/tube_rond/tubes_ronds.gif',
        image: 'assets/images/matiere/inox/tube_rond/tubes_ronds_img.gif',
        details: '• 76,1 à 406,4',
      },
      {
        nom: 'BARRE ROND PLEIN INOX 304L',
        schema:
          'assets/images/matiere/inox/barres_rondes_pleines/barres_rondes.gif',
        image:
          'assets/images/matiere/inox/barres_rondes_pleines/barres_rondes_img.gif',
      },
    ],
    acier: [
      {
        nom: 'CORNIÈRE À AILES ÉGALES ACIER E24.S235',
        schema:
          'assets/images/matiere/acier/corniere_egale/cornieres_egales.gif',
        image:
          'assets/images/matiere/acier/corniere_egale/cornieres_egales_img.gif',
      },
      {
        nom: 'CORNIÈRE À AILES INÉGALES ACIER E24.S235',
        schema:
          'assets/images/matiere/acier/corniere_inegale/cornieres_inegales.gif',
        image:
          'assets/images/matiere/acier/corniere_inegale/cornieres_inegales_img.gif',
      },
      {
        nom: 'FER EN T ACIER E24.S235',
        schema: 'assets/images/matiere/acier/fer_t/fer_t.gif',
        image: 'assets/images/matiere/acier/fer_t/fer_t_img.gif',
      },
      {
        nom: 'TUBE CARRÉ ACIER E24.S235',
        schema: 'assets/images/matiere/acier/tube_carrés/tubes_carres.gif',
        image: 'assets/images/matiere/acier/tube_carrés/tubes_carres_img.gif',
        details: '• De 20 x 20 à 35 x 35',
      },
      {
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
        nom: 'TOLES PERFORÉES EN GALVA A CHAUD NF EN 10346 À TROUS',
        schema: 'assets/images/matiere/galva/tole_perforees/toles.gif',
        image:
          'assets/images/matiere/galva/tole_perforees/tole-perforee-rond.jpg',
        details: 'CARRÉS OU RONDS',
      },
      {
        nom: 'CORNIÈRE À AILES ÉGALES GALVA',
        schema:
          'assets/images/matiere/galva/corniere_egale/cornieres_egales.gif',
        image:
          'assets/images/matiere/galva/corniere_egale/cornieres_egales_img.gif',
      },
      {
        nom: 'TUBE ROND GALVA SENDZINIR NF EN 10305-3 S4',
        schema: 'assets/images/matiere/galva/tube_rond/tubes_ronds.gif',
        image: 'assets/images/matiere/galva/tube_rond/tubes_ronds_img.gif',
      },
      {
        nom: 'TUBE CARRÉ GALVA SENDZINIR NF EN 10305-3 S4',
        schema: 'assets/images/matiere/galva/tube_carres/tubes_carres.gif',
        image: 'assets/images/matiere/galva/tube_carres/tubes_carres_img.gif',
      },
      {
        nom: 'TUBE RECTANGULAIRE GALVA SENDZINIR NF EN 10305-3 S4',
        schema:
          'assets/images/matiere/galva/tube_rectangulaire/tubes_rectangulaires-galva.gif',
        image:
          'assets/images/matiere/galva/tube_rectangulaire/tubes_rectangulaires_img-galva.gif',
      },
    ],
  };

  showCategory(category: string): void {
    this.selectedCategory = category;
  }
}
