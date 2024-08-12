import { Component } from '@angular/core';
import { MatiereDataService } from '../../services/table_data/matiere-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FavorieService } from '../../services/favorie/favorie.service';
import { PanierService } from '../../services/panier/panier.service';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../services/product/product.model.dto';
import { AuthService } from '../../services/auth/auth.service';

interface Ligne {
  epaisseur: number | undefined;
  hauteur: number | undefined;
  largeur: number | undefined;
  masse: number | undefined;
  additionalData1: number | string;
  additionalData2: number | string;
  additionalData3: number | string;
  additionalData4: number | string;
}

interface FavoriteItem {
  choix: number;
  urlPart: string;
  longueur: number;
  quantite: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  produits: { [key: string]: Produit[] } = {};
  selectedItem: any = null;
   url : string | undefined ;
   teste : any;

  fetchedproducts: Product[] = [];
  resolveproducts: Product[] = [];
  errorMessage: string = '';

  constructor(
    private matiereDataService: MatiereDataService,
    private activatedRoutes: ActivatedRoute,
    private formeMatiereService: FormeMatiereService,
    private favorieService: FavorieService,
    private cartService: PanierService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.produits = this.formeMatiereService.getProduits();
    console.log('image zone',this.produits);

    this.productService.getProductsByType('alu1').subscribe({
      next: (data) => {
        console.log('Products fetched:', data);
        this.fetchedproducts = data;
        this.fetchProducts('alu1');
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products';
      }
    });
  }


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

  fetchProducts(type: string): void {
    if(this.authService.isLoggedIn()){
      this.productService.getProductsByType(type).subscribe({
      next: (data) => {
        this.fetchedproducts = data;
        console.log('fetched product',this.fetchedproducts);

          console.log('url', this.url);
          this.chooseData('products/alu1');

      },
      error: (err) => {
        this.errorMessage = 'Failed to load products';
        console.error(err);
      }
    });}
    else{
      console.log("Not logged in");
    }

  }

  calcule(): void {
    this.updateSelectedItem();
    if (this.updateSelection) {
      const poidsUnitaire = this.updateSelection.masse ? this.updateSelection.masse * this.longueur : 0;
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
      case 'products/alu1':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: item.width,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `A<br />Épaisseur`;
        this.titreHauteur = 'B<br />Hauteur';
        this.titreLargeur = 'C<br />Largeur';
        this.titreMasse = 'Masse<br />(Kg/m)';
        console.log('produits on switch case',this.produits);

        this.titleProduct = this.titleProduct =
          this.produits['aluminium'][0]?.nom || 'Produit non trouvé';
        this.productImage = this.produits['aluminium'][0]?.image;
        this.productSchema = this.produits['aluminium'][0]?.schema;

        break;
      case 'products/alu2':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/alu3':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/alu4':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/alu5':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/inox1':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/inox2':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/inox3':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/inox4':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/inox5':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/acier1':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/acier2':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
            additionalData1: 0,
            additionalData2: 0,
            additionalData3: 0,
            additionalData4: 0,
            choix: index,
            urlPart: this.activatedRoutes.snapshot.url[1].path,
          })
        );

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
      case 'products/acier3':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/acier4':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/acier5':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/galva1':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/galva2':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/galva3':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/galva4':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
      case 'products/galva5':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse : item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
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
  selectItem(item: any): void {
    this.selectedItem = {
      choix: item.choix,
      urlPart: item.urlPart,
      longueur: this.longueur,
      quantite: this.quantite,
    };
  }
  updateSelectedItem(): void {
    if (this.selectedItem) {
      this.selectedItem.longueur = this.longueur;
      this.selectedItem.quantite = this.quantite;
    }
  }

  addToFavorites(): void {
    this.updateSelectedItem();
    this.favorieService.addFavorite(this.selectedItem);
  }
  removeFromFavorites(item: any): void {
    this.favorieService.removeFavorite(item);
  }
  getFavorites(): any[] {
    return this.favorieService.getFavorites();
  }

  getProductIdFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }

  // Cart

  addToCart(): void {
    this.updateSelectedItem();
    this.cartService.addToCart(this.selectedItem);
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
  }

  getCartItems(): any[] {
    return this.cartService.getCart();
  }


  findProductById(id: string, produits: { [key: string]: any[] }): any | null {
    for (const key in produits) {
      const productArray = produits[key];
      for (const product of productArray) {
        if (product.id === id) {
          return product;
        }
      }
    }
    return null;
  }



}
