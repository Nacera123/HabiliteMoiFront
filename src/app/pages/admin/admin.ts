import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    Header, 
    Sidebar, 
    Footer,
    RouterOutlet
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  sidebarActive = false;
  overlayActive = false;
  mainWrapperActive = false;
  menuIcon: 'lni-chevron-left' | 'lni-menu' = 'lni-chevron-left';
  headerShadow = false;
  preloaderVisible = true;

  ngOnInit() {
    this.preloaderVisible = false;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.headerShadow = window.scrollY > 0;
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
    this.overlayActive = true;
    this.mainWrapperActive = !this.mainWrapperActive;

    if (document.body.clientWidth > 1200) {
      this.menuIcon = this.menuIcon === 'lni-chevron-left' ? 'lni-menu' : 'lni-chevron-left';
    } else if (this.menuIcon === 'lni-chevron-left') {
      this.menuIcon = 'lni-menu';
    }
  }

  closeSidebar() {
    this.sidebarActive = false;
    this.overlayActive = false;
    this.mainWrapperActive = false;
  }
}