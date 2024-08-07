import { Component } from '@angular/core';
import { MatiereDataService } from 'src/app/services/table_data/matiere-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FavorieService } from 'src/app/services/favorie/favorie.service';

interface Ligne {
  epaisseur: number;
  hauteur: number;
  largeur: number;
  masse: number;
  additionalData1: number | string;
  additionalData2: number | string;
  additionalData3: number | string;
  additionalData4: number | string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  produits: { [key: string]: Produit[] } = {};

  constructor(
    private matiereDataService: MatiereDataService,
    private activatedRoutes: ActivatedRoute,
    private formeMatiereService: FormeMatiereService,
    private favorieService: FavorieService
  ) {}

  ngOnInit(): void {
    this.produits = this.formeMatiereService.getProduits();
    this.activatedRoutes.url.subscribe((urlSegments) => {
      const url = urlSegments.map((segment) => segment.path).join('/');
      this.chooseData(url);
    });
  }

  // Table Data

  /* *Aluminium */
  fer_t_aluminium = this.matiereDataService.fer_t_aluminium;
  corniere_egale_aluminium = this.matiereDataService.corniere_egale_aluminium;
  profile_h_aluminium = this.matiereDataService.profile_h_aluminium;
  profile_u_aluminium = this.matiereDataService.profile_u_aluminium;
  tube_rectangulaire_aluminium =
    this.matiereDataService.tube_rectangulaire_aluminium;

  /* *Inox */
  corniere_egale_inox = this.matiereDataService.corniere_egale_inox;
  fer_t_inox = this.matiereDataService.fer_t_inox;
  poutrelle_hea_heb_inox = this.matiereDataService.poutrelle_hea_heb_inox;
  tube_rond_inox_304l = this.matiereDataService.tube_rond_inox_304l;
  barre_rond_plein_inox_304l =
    this.matiereDataService.barre_rond_plein_inox_304l;

  /* *Acier */
  cornieres_ailes_egales_acier =
    this.matiereDataService.cornieres_ailes_egales_acier;
  cornieres_ailes_inegales_acier =
    this.matiereDataService.cornieres_ailes_inegales_acier;
  fers_t_acier = this.matiereDataService.fers_t_acier;
  tubes_carres_acier = this.matiereDataService.tubes_carres_acier;
  tubes_rectangulaires_acier =
    this.matiereDataService.tubes_rectangulaires_acier;

  /* *Galva */
  tole_perforee_galva = this.matiereDataService.tole_perforee_galva;
  cornieres_ailes_egales_galva =
    this.matiereDataService.cornieres_ailes_egales_galva;
  tubes_ronds_galva = this.matiereDataService.tubes_ronds_galva;
  tubes_carres_galva = this.matiereDataService.tubes_carres_galva;
  tubes_rectangulaires_galva =
    this.matiereDataService.tubes_rectangulaires_galva;

  lignes: Ligne[] = [];

  afficherEpaisseur = false;
  afficherHauteur = false;
  afficherLargeur = false;
  afficherMasse = false;
  infoSupplementaire1 = false;
  infoSupplementaire2 = false;
  infoSupplementaire3 = false;
  infoSupplementaire4 = false;

  // table columns name

  titreEpaisseur = '';
  titreHauteur = '';
  titreLargeur = '';
  titreMasse = '';
  titreInfoSupplementaire1 = '';
  titreInfoSupplementaire2 = '';
  titreInfoSupplementaire3 = '';
  titreInfoSupplementaire4 = '';

  //  + data

  titleProduct = '';
  productImage = '';
  productSchema = '';

  longueur: number = 0;
  quantite: number = 1;
  resultat: number = 0;
  updateSelection: Ligne | null = null;

  calcule(): void {
    if (this.updateSelection) {
      const poidsUnitaire = this.updateSelection.masse * this.longueur;
      this.resultat = poidsUnitaire * this.quantite;
    }
  }

  setupdateSelection(ligne: Ligne): void {
    this.updateSelection = ligne;
    this.calcule();
  }

  // Dynamique Table

  chooseData(url: string): void {
    switch (url) {
      case 'product/alu1':
        this.lignes = this.fer_t_aluminium.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: item.largeur,
          masse: item.masseKgM,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `A<br />Épaisseur`;
        this.titreHauteur = 'B<br />Hauteur';
        this.titreLargeur = 'C<br />Largeur';
        this.titreMasse = 'Masse<br />(Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['aluminium'][0]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['aluminium'][0]?.image;
        this.productSchema = this.produits['aluminium'][0]?.schema;

        break;
      case 'product/alu2':
        this.lignes = this.corniere_egale_aluminium.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteurAiles,
          largeur: 0,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = false;
        this.afficherMasse = true;

        this.titreEpaisseur = `A<br />Épaisseur`;
        this.titreHauteur = 'B<br />Hauteur';
        this.titreLargeur = 'C<br />Largeur';
        this.titreMasse = 'Masse<br />(Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['aluminium'][1]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['aluminium'][1]?.image;
        this.productSchema = this.produits['aluminium'][1]?.schema;

        break;
      case 'product/alu3':
        this.lignes = this.profile_h_aluminium.map((item) => ({
          epaisseur: item.a,
          hauteur: item.c,
          largeur: item.d,
          masse: item.masseKgM,
          additionalData1: item.h,
          additionalData2: item.b,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = false;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;
        this.infoSupplementaire2 = true;

        this.titreEpaisseur = `A <br /> Epaisseur <br /> de la Semelle`;
        this.titreHauteur = 'C  <br /> Hauteur <br /> de l âme';
        this.titreLargeur = 'D <br /> Largeur de <br />  la Semelle';
        this.titreMasse = 'Masse Kg/m';
        this.titreInfoSupplementaire1 = 'H';
        this.titreInfoSupplementaire2 = 'B <br /> Epaisseur de <br /> l âme';

        this.titleProduct = this.titleProduct =
          this.produits['aluminium'][2]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['aluminium'][2]?.image;
        this.productSchema = this.produits['aluminium'][2]?.schema;

        break;
      case 'product/alu4':
        this.lignes = this.profile_u_aluminium.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: item.largeur,
          masse: item.masse,
          additionalData1: item.U,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;
        this.infoSupplementaire2 = false;

        this.titreEpaisseur = `A <br /> Epaisseur <br /> de de l'âme`;
        this.titreHauteur = `B  <br /> Hauteur <br /> de l âme`;
        this.titreLargeur = `D <br /> Largeur de <br />  la Semelle`;
        this.titreMasse = `Masse Kg/m`;
        this.titreInfoSupplementaire1 = `U`;

        this.titleProduct = this.titleProduct =
          this.produits['aluminium'][3]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['aluminium'][3]?.image;
        this.productSchema = this.produits['aluminium'][3]?.schema;

        break;
      case 'product/alu5':
        this.lignes = this.tube_rectangulaire_aluminium.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: item.largeur,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `C <br /> Epaisseur`;
        this.titreHauteur = `A <br /> Hauteur`;
        this.titreLargeur = `B <br /> Largeur`;
        this.titreMasse = `Masse Kg/m`;

        this.titleProduct = this.titleProduct =
          this.produits['aluminium'][4]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['aluminium'][4]?.image;
        this.productSchema = this.produits['aluminium'][4]?.schema;

        break;
      case 'product/inox1':
        this.lignes = this.corniere_egale_inox.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteurAiles,
          largeur: 0,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = false;
        this.afficherMasse = true;

        this.titreEpaisseur = `A <br /> Épaisseur`;
        this.titreHauteur = 'B <br /> Hauteur';
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['inox'][0]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['inox'][0]?.image;
        this.productSchema = this.produits['inox'][0]?.schema;

        break;
      case 'product/inox2':
        this.lignes = this.fer_t_inox.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: item.largeur,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `A <br /> Épaisseur`;
        this.titreHauteur = 'B <br /> Hauteur';
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['inox'][1]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['inox'][1]?.image;
        this.productSchema = this.produits['inox'][1]?.schema;

        break;
      case 'product/inox3':
        this.lignes = this.poutrelle_hea_heb_inox.map((item) => ({
          epaisseur: item.A,
          hauteur: item.C,
          largeur: item.D,
          masse: item.Masse_kg_m,
          additionalData1: item.HEB_HEA,
          additionalData2: item.B,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;
        this.infoSupplementaire2 = true;

        this.titreEpaisseur = `A <br /> Epaisseur de<br /> la Semelle`;
        this.titreHauteur = 'H <br /> Hauteur';
        this.titreLargeur = 'B <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';
        this.titreInfoSupplementaire1 = `HEB <br /> HEA`;
        this.titreInfoSupplementaire2 = `B <br /> Epaisseur de l'âme `;

        this.titleProduct = this.titleProduct =
          this.produits['inox'][2]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['inox'][2]?.image;
        this.productSchema = this.produits['inox'][2]?.schema;

        break;
      case 'product/inox4':
        this.lignes = this.tube_rond_inox_304l.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.diametre_exterieur,
          largeur: 0,
          masse: item.masse_kg_m,
          additionalData1: item.diametre_exterieur,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = false;
        this.afficherLargeur = false;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;

        this.titreInfoSupplementaire1 = `	A<br />Diamètre`;
        this.titreEpaisseur = `B<br />Epaisseur`;
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['inox'][3]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['inox'][3]?.image;
        this.productSchema = this.produits['inox'][3]?.schema;

        break;
      case 'product/inox5':
        this.lignes = this.barre_rond_plein_inox_304l.map((item) => ({
          epaisseur: 0,
          hauteur: 0,
          largeur: 0,
          masse: item.section_cm2,
          additionalData1: item.diametre,
          additionalData2: item.circonference,
          additionalData3: 0,
          additionalData4: item.masse_kg_m,
        }));

        this.afficherEpaisseur = false;
        this.afficherHauteur = false;
        this.afficherLargeur = false;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;
        this.infoSupplementaire2 = true;
        this.infoSupplementaire4 = true;

        this.titreInfoSupplementaire1 = `Diamètre`;
        this.titreInfoSupplementaire2 = `Circonférence`;
        this.titreInfoSupplementaire4 = `Masse <br /> (Kg/m)`;
        this.titreMasse = 'Section cm²';

        this.titleProduct = this.titleProduct =
          this.produits['inox'][4]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['inox'][4]?.image;
        this.productSchema = this.produits['inox'][4]?.schema;

        break;
      case 'product/acier1':
        this.lignes = this.cornieres_ailes_egales_acier.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteurAiles,
          largeur: 0,
          masse: item.masseKgPerM,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = false;
        this.afficherMasse = true;

        this.titreEpaisseur = `A <br /> Épaisseur`;
        this.titreHauteur = 'B <br /> Hauteur Ailes	';
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['acier'][0]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['acier'][0]?.image;
        this.productSchema = this.produits['acier'][0]?.schema;

        break;
      case 'product/acier2':
        this.lignes = this.cornieres_ailes_inegales_acier.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: item.largeur,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `C <br /> Epaisseur`;
        this.titreHauteur = '	A <br /> Hauteur';
        this.titreLargeur = 'B <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['acier'][1]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['acier'][1]?.image;
        this.productSchema = this.produits['acier'][1]?.schema;

        break;
      case 'product/acier3':
        this.lignes = this.fers_t_acier.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: item.largeur,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `A <br /> Epaisseur`;
        this.titreHauteur = 'B <br /> Hauteur';
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';
        this.titreInfoSupplementaire1 = 'A';
        this.titreInfoSupplementaire2 = 'B';

        this.titleProduct = this.titleProduct =
          this.produits['acier'][2]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['acier'][2]?.image;
        this.productSchema = this.produits['acier'][2]?.schema;

        break;
      case 'product/acier4':
        this.lignes = this.tubes_carres_acier.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: 0,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = false;
        this.afficherMasse = true;

        this.titreEpaisseur = `B <br /> Epaisseur`;
        this.titreHauteur = 'A <br /> Hauteur';
        this.titreLargeur = 'B <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['acier'][3]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['acier'][3]?.image;
        this.productSchema = this.produits['acier'][3]?.schema;

        break;
      case 'product/acier5':
        this.lignes = this.tubes_rectangulaires_acier.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: item.largeur,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `C <br /> Epaisseur`;
        this.titreHauteur = 'A <br /> Hauteur';
        this.titreLargeur = 'B <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['acier'][4]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['acier'][4]?.image;
        this.productSchema = this.produits['acier'][4]?.schema;

        break;
      case 'product/galva1':
        this.lignes = this.tole_perforee_galva.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: 0,
          largeur: 0,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: item.typeTrous,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.infoSupplementaire2 = true;

        this.afficherMasse = true;

        this.titreEpaisseur = `A <br /> Épaisseur`;
        this.titreHauteur = 'B <br /> Hauteur';
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';
        this.titreInfoSupplementaire2 = 'Type de trous';

        this.titleProduct = this.titleProduct =
          this.produits['galva'][0]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['galva'][0]?.image;
        this.productSchema = this.produits['galva'][0]?.schema;

        break;
      case 'product/galva2':
        this.lignes = this.cornieres_ailes_egales_galva.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteurAiles,
          largeur: 0,
          masse: item.masseKg_m,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = false;
        this.afficherMasse = true;

        this.titreEpaisseur = `A <br /> Épaisseur`;
        this.titreHauteur = 'B <br /> Hauteur';
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['galva'][1]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['galva'][1]?.image;
        this.productSchema = this.produits['galva'][1]?.schema;

        break;
      case 'product/galva3':
        this.lignes = this.tubes_ronds_galva.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: 0,
          largeur: 0,
          masse: item.masseKg_m,
          additionalData1: item.diametreExterieur,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = false;
        this.afficherLargeur = false;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;

        this.titreInfoSupplementaire1 = `A<br />Diamètre extérieur`;
        this.titreEpaisseur = `B <br /> Épaisseur`;
        this.titreHauteur = 'D <br /> Diamètre';
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['galva'][2]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['galva'][2]?.image;
        this.productSchema = this.produits['galva'][2]?.schema;

        break;
      case 'product/galva4':
        this.lignes = this.tubes_carres_galva.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: 0,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = false;
        this.afficherMasse = true;

        this.titreEpaisseur = `B <br /> Épaisseur`;
        this.titreHauteur = 'A <br /> Hauteur';
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['galva'][3]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['galva'][3]?.image;
        this.productSchema = this.produits['galva'][3]?.schema;

        break;
      case 'product/galva5':
        this.lignes = this.tubes_rectangulaires_galva.map((item) => ({
          epaisseur: item.epaisseur,
          hauteur: item.hauteur,
          largeur: item.largeur,
          masse: item.masse,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `C <br /> Épaisseur`;
        this.titreHauteur = 'A <br /> Hauteur';
        this.titreLargeur = 'B <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';

        this.titleProduct = this.titleProduct =
          this.produits['galva'][4]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['galva'][4]?.image;
        this.productSchema = this.produits['galva'][4]?.schema;

        break;
      default:
        this.lignes = [];
        break;
    }
  }

  // Favorites

  addToFavorites(item: any): void {
    this.favorieService.addFavorite(item);
  }
  removeFromFavorites(item: any): void {
    this.favorieService.removeFavorite(item);
  }
  getFavorites(): any[] {
    return this.favorieService.getFavorites();
  }
}
