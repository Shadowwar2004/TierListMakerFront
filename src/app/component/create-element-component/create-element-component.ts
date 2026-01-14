import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TierListService } from '../../service/TierListService';
import { Element } from '../../models/models';

@Component({
  selector: 'app-create-element',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: 'create-element-component.html',
  styleUrl: 'create-element-component.css'
})
export class CreateElementComponent {

  newElement: Element = { id: 0, nom: '', categorie: 'Film' };


  categories: string[] = ['Film', 'Série', 'Jeu vidéo'];
  successMessage: string = '';

  constructor(
    private tierListService: TierListService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.newElement.nom) return;

    this.tierListService.createElement(this.newElement).subscribe({
      next: (created) => {
        console.log('Élément créé', created);
        this.successMessage = `"${created.nom}" a été ajouté avec succès !`;

        // Reset du formulaire pour en ajouter un autre rapidement
        this.newElement.nom = '';

        // On enlève le message après 3 secondes
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la création (Vérifiez que vous êtes connecté).");
      }
    });
  }
}
