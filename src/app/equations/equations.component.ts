import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiEquation } from '../app.component';
import { ElementComponent } from '../element/element.component';

@Component({
  selector: 'app-equations',
  standalone: true,
  imports: [CommonModule, ElementComponent],
  templateUrl: './equations.component.html',
  styleUrl: './equations.component.css'
})
export class EquationsComponent {
  @Input() equations: AiEquation[] = [];
}
