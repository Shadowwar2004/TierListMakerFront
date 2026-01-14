import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ContenuDto, LoginResponse, TierList, TierListDto, Utilisateur} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TierListService {
 private readonly API_URL = `${environment.API_URL}`;

  constructor(private http: HttpClient) {
  }


  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.API_URL}/auth/utilisateurs`);
  }

  login(id: number): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, id).pipe(
      tap(res => {
        // On stocke le token pour les futures requêtes
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // --- TIER LISTS ---
  getTierLists(): Observable<TierList[]> {
    return this.http.get<TierList[]>(`${this.API_URL}/TierList`);
  }


  createTierList(dto: TierListDto): Observable<TierList> {
    return this.http.post<TierList>(`${this.API_URL}/TierList`, dto, { headers: this.getAuthHeaders() });
  }


  deleteTierList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/TierList/${id}`, { headers: this.getAuthHeaders() });
  }


  addContenu(tierListId: number, dto: ContenuDto): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/TierList/${tierListId}/contenu`, dto, { headers: this.getAuthHeaders() });
  }

  // --- ELEMENTS ---
  getElements(): Observable<Element[]> {
    return this.http.get<Element[]>(`${this.API_URL}/Element`);
  }

  createElement(element: Element): Observable<Element> {
    return this.http.post<Element>(`${this.API_URL}/Element`, element, { headers: this.getAuthHeaders() });
  }
}
