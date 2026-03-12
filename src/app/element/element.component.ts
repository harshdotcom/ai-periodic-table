import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AiElement {
  symbol: string;
  name: string;
  group: string;
  row: number;
  col: number;
  description?: string;
}

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="element-card" 
         [class.empty]="!element"
         [class.size-small]="size === 'small'"
         [ngClass]="getGroupClass()"
         (click)="toggleActive()"
         [class.active]="isActive">
      <ng-container *ngIf="element">
        <div class="symbol">{{ element.symbol }}</div>
        <div class="name">{{ element.name }}</div>
        
        <!-- Hover / Active Reaction Layer -->
        <!-- Disable reaction layer for small sized elements -->
        <div class="reaction-layer" *ngIf="isActive && size === 'normal'">
          <p class="desc">{{ element.description || 'Core AI Concept' }}</p>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./element.component.css']
})
export class ElementComponent {
  @Input() element!: AiElement | null;
  @Input() size: 'normal' | 'small' = 'normal';
  isActive = false;

  getGroupClass(): string {
    if (!this.element) return '';
    switch (this.element.group) {
      case 'REACTIVE': return 'group-reactive';
      case 'RETRIEVAL': return 'group-retrieval';
      case 'ORCHES.': return 'group-orchestration';
      case 'VALID.': return 'group-validation';
      case 'MODELS': return 'group-models';
      default: return '';
    }
  }

  toggleActive() {
    if (this.element) {
      this.isActive = !this.isActive;
    }
  }
}
