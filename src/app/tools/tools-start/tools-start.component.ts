import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools-start',
  templateUrl: './tools-start.component.html',
  styleUrls: ['./tools-start.component.scss']
})
export class ToolsStartComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
