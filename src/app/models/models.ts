export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
}

export interface Element {
  id: number;
  nom: string;
  categorie: string; // 'Film', 'Série', 'Jeu vidéo'
}

export interface ContenuTierList {
  id: number;
  tierListId: number;
  elementId: number;
  element?: Element;
  notation: string; // 'S', 'A', 'B', etc.
}

export interface TierList {
  id: number;
  nom: string;
  utilisateurId: number;
  utilisateur?: Utilisateur;
  contenus: ContenuTierList[];
}

// Pour la création (DTOs)
export interface TierListDto {
  nom: string;
}

export interface ContenuDto {
  elementId: number;
  notation: string;
}

export interface LoginResponse {
  token: string;
  user: Utilisateur;
}
