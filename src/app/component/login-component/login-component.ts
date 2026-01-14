import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Utilisateur} from '../../models/models';
import {TierListService} from '../../service/TierListService';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [
    FormsModule
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
    private router: Router
  ) {}

  ngOnInit(): void {
    // On charge les utilisateurs pour la liste déroulante
    this.tierListService.getUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;

        if (this.utilisateurs.length > 0) {
          this.selectedUserId = this.utilisateurs[0].id;
        }
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs', err);
        this.errorMessage = "Impossible de charger les utilisateurs.";
      }
    });
  }

  onLogin(): void {
    if (!this.selectedUserId) return;

    this.tierListService.login(this.selectedUserId).subscribe({
      next: (response) => {
        console.log('Connexion réussie ! Token :', response.token);
        // Le token est stocké automatiquement par le service (voir étape précédente)

        // Redirection vers la liste des Tier Lists
        this.router.navigate(['/tierlists']);
      },
      error: (err) => {
        console.error('Erreur login', err);
        this.errorMessage = "Erreur lors de la connexion.";
      }
    });
  }
}
