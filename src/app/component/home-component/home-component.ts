import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TierListService } from '../../service/TierListService';
import { TierList, TierListDto, Utilisateur } from '../../models/models';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadTierLists();
  }

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

    this.cd.detectChanges();
  }

  logout(): void {
    this.tierListService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
    this.cd.detectChanges();
  }

  loadTierLists(): void {
    this.tierListService.getTierLists().subscribe({
      next: (data) => {
        this.tierLists = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement listes', err);
      }
    });
  }

  onCreateTierList(): void {
    if (!this.newTierListName.trim()) return;

    const dto: TierListDto = { nom: this.newTierListName };

    this.tierListService.createTierList(dto).subscribe({
      next: () => {
        this.newTierListName = '';
        this.loadTierLists();
      },
      error: (err) => {
        alert("Erreur lors de la création.");
      }
    });
  }

  isOwner(tierList: TierList): boolean {
    return this.isLoggedIn && this.currentUser?.id === tierList.utilisateurId;
  }

  onDelete(id: number): void {
    if(!confirm("Voulez-vous vraiment supprimer cette liste ?")) return;

    this.tierListService.deleteTierList(id).subscribe({
      next: () => {
        this.loadTierLists();
      },
      error: (err) => alert("Impossible de supprimer cette liste.")
    });
  }
}
