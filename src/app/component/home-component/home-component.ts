import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent
{
  appName = 'Mon Appli';
  subtitle = 'Une home page propre, moderne et facile à personnaliser.';



  // Exemple d’action (bouton)
  onPrimaryAction() {
    console.log('CTA cliqué ✅');
  }


}
