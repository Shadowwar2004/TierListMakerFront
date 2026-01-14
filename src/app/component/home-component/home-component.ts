import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TierList, TierListDto, Utilisateur} from '../../models/models';
import {TierListService} from '../../service/TierListService';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home-component',
  imports: [
    FormsModule

  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  tierLists: TierList[] = [];
  newTierListName: string = '';
  isLoggedIn: boolean = false;
  currentUser: Utilisateur | null = null;

  constructor(
    private tierListService: TierListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadTierLists();
  }

  // Vérifie si l'utilisateur est connecté via le localStorage (stocké lors du login)
  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(userStr);
    } else {
      this.isLoggedIn = false;
      this.currentUser = null;
    }
  }

  // Déconnexion simple
  logout(): void {
    this.tierListService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  // Charge toutes les listes (Action "Consulter" - Visiteur & Utilisateur)
  loadTierLists(): void {
    this.tierListService.getTierLists().subscribe({
      next: (data) => {
        this.tierLists = data;
      },
      error: (err) => console.error('Erreur chargement listes', err)
    });
  }

  // Action "Créer" - Utilisateur connecté uniquement
  onCreateTierList(): void {
    if (!this.newTierListName.trim()) return;

    const dto: TierListDto = { nom: this.newTierListName };

    this.tierListService.createTierList(dto).subscribe({
      next: () => {
        this.newTierListName = ''; // Reset du champ
        this.loadTierLists(); // Rafraichissement automatique (Points gagnés !)
      },
      error: (err) => alert("Erreur lors de la création.")
    });
  }

  // Vérifie si l'utilisateur connecté est le propriétaire de la liste
  isOwner(tierList: TierList): boolean {
    return this.isLoggedIn && this.currentUser?.id === tierList.utilisateurId;
  }

  // Action "Supprimer" - Propriétaire uniquement
  onDelete(id: number): void {
    if(!confirm("Voulez-vous vraiment supprimer cette liste ?")) return;

    this.tierListService.deleteTierList(id).subscribe({
      next: () => this.loadTierLists(), // Mise à jour auto de la liste
      error: (err) => alert("Impossible de supprimer cette liste.")
    });
  }
}
