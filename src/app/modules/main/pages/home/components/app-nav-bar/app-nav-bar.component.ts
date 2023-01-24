import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-nav-bar',
  templateUrl: './app-nav-bar.component.html',
  styleUrls: ['./app-nav-bar.component.css']
})
export class AppNavBarComponent implements OnInit {

  constructor(private scroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  scrollToEstateHall() {
    this.scroller.scrollToAnchor("estateHall");
  }
  scrollToFindProperty() {
    this.scroller.scrollToAnchor("findProperty");
  }
  scrollToSimulate() {
    this.scroller.scrollToAnchor("simulate");
  }

}
