import { Component, OnInit } from '@angular/core';
import { Produit } from '../forme-matiere/interface/produit.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forme-matiere',
  templateUrl: './forme-matiere.component.html',
  styleUrls: ['./forme-matiere.component.scss'],
})
export class FormeMatiereComponent implements OnInit {
  selectedCategory: string = '';

  produits: { [key: string]: Produit[] } = {
    aluminium: [
      {
        id: 'alu1',
        nom: 'FER EN T',
        schema: 'assets/images/matiere/aluminium/fer_en_t/fer_t-alu.gif',
        image: 'assets/images/matiere/aluminium/fer_en_t/fer_t_img.gif',
      },
      {
        id: 'alu2',
        nom: 'CORNIER À AILES ÉGALES',
        schema:
          'assets/images/matiere/aluminium/corniere_egale/cornieres_egales-alu.gif',
        image:
          'assets/images/matiere/aluminium/corniere_egale/cornieres_egales_img.gif',
      },
      {
        id: 'alu3',
        nom: 'PROFILÉ H ALUMINIUM',
        schema: 'assets/images/matiere/aluminium/profile_h/poutrelles_he.gif',
        image:
          'assets/images/matiere/aluminium/profile_h/poutrelles_he_img.gif',
      },
      {
        id: 'alu4',
        nom: 'PROFILÉ U ALUMINIUM',
        schema:
          'assets/images/matiere/aluminium/profile_u/poutrelles_upn-alu.gif',
        image:
          'assets/images/matiere/aluminium/profile_u/poutrelles_upn_img.gif',
      },
      {
        id: 'alu5',
        nom: 'TUBE RECTANGULAIRE ALUMINIUM',
        schema:
          'assets/images/matiere/aluminium/tube_rectangulaire/tubes_rectangulaires-alu.gif',
        image:
          'assets/images/matiere/aluminium/tube_rectangulaire/tubes_rectangulaires_img-alu.gif',
        details: '• De 25 x 15 à 80 x 50',
      },
      {
        id: 'alu6',
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
        id: 'inox1',
        nom: 'CORNIÈRE À AILES ÉGALES INOX 304L',
        schema:
          'assets/images/matiere/inox/corniere_egale/cornieres_egales.gif',
        image:
          'assets/images/matiere/inox/corniere_egale/cornieres_egales_img.gif',
      },
      {
        id: 'inox2',
        nom: 'FER EN T INOX 304L',
        schema: 'assets/images/matiere/inox/fer_t/fer_t.gif',
        image: 'assets/images/matiere/inox/fer_t/fer_t_img.gif',
      },
      {
        id: 'inox3',
        nom: 'POUTRELLE HEA / HEB INOX 304L',
        schema: 'assets/images/matiere/inox/poutrelle_hea/poutrelles_he.gif',
        image: 'assets/images/matiere/inox/poutrelle_hea/poutrelles_he_img.gif',
      },
      {
        id: 'inox4',
        nom: 'TUBE ROND INOX 304L',
        schema: 'assets/images/matiere/inox/tube_rond/tubes_ronds.gif',
        image: 'assets/images/matiere/inox/tube_rond/tubes_ronds_img.gif',
        details: '• 17,2 à 60,3',
      },
      {
        id: 'inox5',
        nom: 'TUBE ROND INOX 304L',
        schema: 'assets/images/matiere/inox/tube_rond/tubes_ronds.gif',
        image: 'assets/images/matiere/inox/tube_rond/tubes_ronds_img.gif',
        details: '• 76,1 à 406,4',
      },
      {
        id: 'inox6',
        nom: 'BARRE ROND PLEIN INOX 304L',
        schema:
          'assets/images/matiere/inox/barres_rondes_pleines/barres_rondes.gif',
        image:
          'assets/images/matiere/inox/barres_rondes_pleines/barres_rondes_img.gif',
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
        nom: 'TOLES PERFORÉES EN GALVA A CHAUD NF EN 10346 À TROUS',
        schema: 'assets/images/matiere/galva/tole_perforees/toles.gif',
        image:
          'assets/images/matiere/galva/tole_perforees/tole-perforee-rond.jpg',
        details: 'CARRÉS OU RONDS',
      },
      {
        id: 'galva2',
        nom: 'CORNIÈRE À AILES ÉGALES GALVA',
        schema:
          'assets/images/matiere/galva/corniere_egale/cornieres_egales.gif',
        image:
          'assets/images/matiere/galva/corniere_egale/cornieres_egales_img.gif',
      },
      {
        id: 'galva3',
        nom: 'TUBE ROND GALVA SENDZINIR NF EN 10305-3 S4',
        schema: 'assets/images/matiere/galva/tube_rond/tubes_ronds.gif',
        image: 'assets/images/matiere/galva/tube_rond/tubes_ronds_img.gif',
      },
      {
        id: 'galva4',
        nom: 'TUBE CARRÉ GALVA SENDZINIR NF EN 10305-3 S4',
        schema: 'assets/images/matiere/galva/tube_carres/tubes_carres.gif',
        image: 'assets/images/matiere/galva/tube_carres/tubes_carres_img.gif',
      },
      {
        id: 'galva5',
        nom: 'TUBE RECTANGULAIRE GALVA SENDZINIR NF EN 10305-3 S4',
        schema:
          'assets/images/matiere/galva/tube_rectangulaire/tubes_rectangulaires-galva.gif',
        image: 'assets/images/matiere/galva/tube_rectangulaires_img-galva.gif',
      },
    ],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedCategory = params.get('category') || 'aluminium';
    });
  }
  showCategory(category: string): void {
    this.selectedCategory = category;
  }
}
