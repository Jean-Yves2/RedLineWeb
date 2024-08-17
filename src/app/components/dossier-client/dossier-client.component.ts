import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dossier-client',
  templateUrl: './dossier-client.component.html',
  styleUrls: ['./dossier-client.component.scss'],
})
export class DossierClientComponent implements OnInit {
  activContainerDossier: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.showActiveContainerDossier('Menu');
  }
  showActiveContainerDossier(container: string) {
    console.log(`Section activée: ${container}`);
    this.activContainerDossier = container;

    if (container === 'Historique') {
    } else if (container === 'Favorie') {
    } else if (container === 'Panier') {
    } else if (container === 'Menu') {
    }
  }
}
