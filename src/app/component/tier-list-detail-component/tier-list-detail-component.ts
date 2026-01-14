import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ContenuDto, TierList, Utilisateur} from '../../models/models';
import {ActivatedRoute} from '@angular/router';
import {TierListService} from '../../service/TierListService';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-tier-list-detail-component',
  imports: [
    NgClass
  ],
  templateUrl: './tier-list-detail-component.html',
  styleUrl: './tier-list-detail-component.css',
})
export class TierListDetailComponent implements OnInit {
  tierList: TierList | null = null;
  allElements: Element[] = [];
  availableElements: Element[] = [];

  tiers: string[] = ['S', 'A', 'B', 'C', 'D'];
  currentUser: Utilisateur | null = null;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tierListService: TierListService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData(id);
  }

  checkLogin(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
  }

  loadData(id: number): void {
    this.tierListService.getTierLists().subscribe(lists => {
      this.tierList = lists.find(l => l.id === id) || null;

      if (this.tierList && this.currentUser) {
        this.isOwner = this.tierList.utilisateurId === this.currentUser.id;
      }

      this.tierListService.getElements().subscribe(elements => {
        this.allElements = elements;
        this.updateAvailableElements();
        this.cd.detectChanges();
      });
    });
  }

  updateAvailableElements(): void {
    if (!this.tierList) return;
    const usedIds = this.tierList.contenus.map(c => c.elementId);
    this.availableElements = this.allElements.filter(e => !usedIds.includes(Number(e.id)));
  }

  getContentsByTier(tier: string): any[] {
    if (!this.tierList) return [];
    return this.tierList.contenus.filter(c => c.notation === tier);
  }

  addToTier(element: Element, tier: string): void {
    if (!this.tierList) return;

    const dto: ContenuDto = {
      elementId : element.id,
      notation: tier
    };

    this.tierListService.addContenu(this.tierList.id, dto).subscribe({
      next: () => {
        if (this.tierList) this.loadData(this.tierList.id);
      },
      error: (err) => console.error('Erreur ajout', err)
    });
  }
}


