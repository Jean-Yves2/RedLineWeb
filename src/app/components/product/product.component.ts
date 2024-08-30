import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FavorieService } from '../../services/favorie/favorie.service';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../services/product/product.model.dto';
import { AuthService } from '../../services/auth/auth.service';
import { Inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

interface Ligne {
  epaisseur: number | undefined;
  hauteur: number | undefined;
  largeur: number | undefined;
  masse: number | undefined;
  additionalData1: number | string | undefined;
  additionalData2: number | string | undefined;
  additionalData3: number | string | undefined;
  additionalData4: number | string | undefined;
  productCode: number | undefined;
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
  url: string | undefined;
  teste: any;
  isSelection = false;

  fetchedproducts: Product[] = [];
  resolveproducts: Product[] = [];
  errorMessage: string = '';

  constructor(
    private activatedRoutes: ActivatedRoute,
    private formeMatiereService: FormeMatiereService,
    @Inject(FavorieService) private favorieService: FavorieService,
    @Inject(CartService) private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.produits = this.formeMatiereService.getProduits();
    this.activatedRoutes.url.subscribe((urlSegments) => {
      const url = urlSegments.map((segment) => segment.path).join('/');
      const secondPart = url.split('/')[1];

      this.fetchProducts(secondPart, url);
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

  fetchProducts(type: string, oneUrl: string): void {
    if (this.authService.getIsAuthenticated()) {
      this.productService.getProductsByType(type).subscribe({
        next: (data) => {
          this.fetchedproducts = data;
          this.chooseData(oneUrl);
        },
        error: (err) => {
          this.errorMessage = 'Failed to load products';
          console.error(err);
        },
      });
    } else {
      this.fetchedproducts = this.productService.getLocalProductsByType(type);
      this.chooseData(oneUrl);
    }
  }

  calcule(): void {
    this.updateSelectedItem();
    if (this.updateSelection) {
      const poidsUnitaire = this.updateSelection.masse
        ? this.updateSelection.masse * this.longueur
        : 0;
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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
      case 'products/alu2':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
          largeur: item.width,
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `C <br /> Epaisseur`;
        this.titreHauteur = 'A <br /> Hauteur ';
        this.titreLargeur = 'B <br /> Largeur ';
        this.titreMasse = 'Masse Kg/m';

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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;

        this.afficherMasse = true;

        this.titreEpaisseur = `B <br /> Epaisseur `;
        this.titreHauteur = `A  <br /> Hauteur`;
        this.titreMasse = `Masse Kg/m`;

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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherHauteur = true;
        this.afficherMasse = true;

        this.titreHauteur = `A <br /> Hauteur`;
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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
          largeur: item.width,
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
          masse: item.linearWeight,
          additionalData1: item.diameter,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;

        this.titreEpaisseur = `B<br /> Epaisseur `;
        this.titreMasse = 'Masse <br /> (Kg/m)';
        this.titreInfoSupplementaire1 = `A <br /> Diamètre extérieur`;

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
          masse: item.linearWeight,
          additionalData1: item.diameter,
          additionalData2: item.circumference,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherHauteur = false;
        this.afficherLargeur = false;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;
        this.infoSupplementaire2 = true;

        this.titreInfoSupplementaire1 = `	A<br />Diamètre`;
        this.titreInfoSupplementaire2 = `Circonférence`;
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
          largeur: item.width,
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `B<br /> Epaisseur `;
        this.titreLargeur = `A <br /> Largeur`;
        this.titreMasse = 'Masse <br /> (Kg/m)';

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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
      case 'products/acier3':
        this.lignes = this.fetchedproducts.map((item, index) => ({
          epaisseur: item.thickness,
          hauteur: item.height,
          largeur: 0,
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `A <br /> Épaisseur`;
        this.titreHauteur = 'B <br /> Hauteur Ailes';
        this.titreMasse = 'Masse <br /> (Kg/m)';

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
          masse: item.linearWeight,
          additionalData1: item.diameter,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherLargeur = false;
        this.afficherMasse = true;
        this.infoSupplementaire1 = true;

        this.titreEpaisseur = `B<br /> Épaisseur`;
        this.titreLargeur = 'C <br /> Largeur';
        this.titreMasse = 'Masse <br /> (Kg/m)';
        this.titreInfoSupplementaire1 = 'A <br /> Diamètre extérieur';

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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherMasse = true;

        this.titreInfoSupplementaire1 = `A<br />Diamètre extérieur`;
        this.titreEpaisseur = `B <br /> Épaisseur`;
        this.titreHauteur = 'A <br /> Hauteur';
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
          largeur: item.width,
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherHauteur = true;
        this.afficherLargeur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `C<br /> Épaisseur`;
        this.titreHauteur = 'A <br /> Hauteur';
        this.titreLargeur = 'B <br /> Largeur';
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
          masse: item.linearWeight,
          additionalData1: 0,
          additionalData2: 0,
          additionalData3: 0,
          additionalData4: 0,
          choix: index,
          urlPart: this.activatedRoutes.snapshot.url[1].path,
          productCode: item.productCode,
        }));

        this.afficherEpaisseur = true;
        this.afficherMasse = true;

        this.titreEpaisseur = `A <br /> Épaisseur`;
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
      productCode: item.productCode,
    };
    this.isSelection = true;
  }
  updateSelectedItem(): void {
    if (this.selectedItem) {
      this.selectedItem.longueur = this.longueur;
      this.selectedItem.quantite = this.quantite;
    }
  }

  addToFavorites(): void {
    this.updateSelectedItem();
    if (this.selectedItem) {
      this.favorieService.addFavorite(this.selectedItem.productCode);
      this.isSelection = false;
    }
  }
  removeFromFavorites(item: any): void {
    this.favorieService.removeFavorite(item);
  }
  /*
  getFavorites(): any[] {
    return this.favorieService.getFavorites();
  }*/

  getProductIdFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }

  // Cart

  addToCart(): void {
    this.updateSelectedItem();
    console.log('selectedItem :', this.selectedItem);

    if (this.selectedItem) {
      console.log('selectedItem :', this.selectedItem);

      this.cartService
        .addItemToCart(
          this.selectedItem.productCode,
          this.selectedItem.quantite,
          this.selectedItem.longueur
        )
        .subscribe({
          next: () => {
            console.log('Produit ajouté au panier');
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      this.isSelection = false;
    }
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
