import { Component, OnInit } from '@angular/core';
import { Produit } from '../forme-matiere/interface/produit.model';
import { ActivatedRoute } from '@angular/router';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';

@Component({
  selector: 'app-forme-matiere',
  templateUrl: './forme-matiere.component.html',
  styleUrls: ['./forme-matiere.component.scss'],
})
export class FormeMatiereComponent implements OnInit {
  selectedCategory: string = '';

  produits: { [key: string]: Produit[] } = {};

  constructor(
    private route: ActivatedRoute,
    private formeMatiereService: FormeMatiereService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedCategory = params.get('category') || 'aluminium';
    });
    this.produits = this.formeMatiereService.getProduits();
  }
  showCategory(category: string): void {
    this.selectedCategory = category;
  }
}
