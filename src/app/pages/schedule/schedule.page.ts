import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  date = new Date();

  constructor() {}

  ngOnInit() {}

  nextSchedule() {
    this.date = new Date(this.date.setDate(this.date.getDate() + 1));
  }

  previousSchedule() {
    this.date = new Date(this.date.setDate(this.date.getDate() - 1));
  }
}
