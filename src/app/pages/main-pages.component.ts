import { SidebarService } from './../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare var $: any;
declare function customInitFunction();
@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styles: [],
})
export class MainPagesComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    customInitFunction();
    this.sidebarService.cargarMenu();
    console.log(this.sidebarService.cargarMenu());

    // $('[data-widget="treeview"]').Treeview('init');
  }
}
