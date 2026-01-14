
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/models';
import { TierListService } from '../../service/TierListService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  selectedUserId: number | null = null;
  errorMessage: string = '';

  constructor(
    private tierListService: TierListService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tierListService.getUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;

        if (this.utilisateurs.length > 0) {
          this.selectedUserId = this.utilisateurs[0].id;
        }


        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs', err);
        this.errorMessage = "Impossible de charger les utilisateurs.";

        //  Affiche l'erreur
        this.cdr.detectChanges();
      }
    });
  }

  onLogin(): void {
    if (!this.selectedUserId) return;

    this.tierListService.login(this.selectedUserId).subscribe({
      next: () => {
        console.log('Connexion réussie !');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erreur login', err);
        this.errorMessage = "Erreur lors de la connexion.";

        //  Affiche l'erreur
        this.cdr.detectChanges();
      }
    });
  }
}

