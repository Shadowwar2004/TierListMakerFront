
import { Component, ChangeDetectorRef } from '@angular/core';
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
  newElement: Element = {id: 0, nom: '', categorie: 'Film'};
  categories: string[] = ['Film', 'Série', 'Jeu vidéo'];
  successMessage: string = '';

  constructor(
    private tierListService: TierListService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  onSubmit(): void {
    if (!this.newElement.nom) return;

    this.tierListService.createElement(this.newElement).subscribe({
      next: (created) => {
        this.successMessage = `"${created.nom}" a été ajouté avec succès !`;
        this.newElement.nom = '';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      },
      error: () => {
        alert("Erreur lors de la création (Vérifiez que vous êtes connecté).");
        this.cdr.detectChanges();
      }
    });
  }
}
