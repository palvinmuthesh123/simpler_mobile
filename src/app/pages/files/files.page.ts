import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {
  showSearchbar = false;

  constructor() {}

  ngOnInit() {}

  showSearchbarHandler(): void {
    this.showSearchbar = !this.showSearchbar;
  }
}
