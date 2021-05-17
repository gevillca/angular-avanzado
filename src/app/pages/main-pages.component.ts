import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// declare var $: any;
// declare function customInitFunction();
@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styles: [],
})
export class MainPagesComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    // customInitFunction();
    // $('[data-widget="treeview"]').Treeview('init');
  }
}
