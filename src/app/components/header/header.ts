import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuButton } from '../button/menu-button/menu-button';
import { SearchService } from '../../services/search-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuButton, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() menuIcon: 'lni-chevron-left' | 'lni-menu' = 'lni-chevron-left';
  @Output() menuToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.menuToggle.emit();
  }

    searchTerm = '';

  constructor(private searchService: SearchService) {}

  onSearchChange(value: string): void {
    console.log('Search term changed:', value);
    
    this.searchService.setSearchTerm(value);
  }
}