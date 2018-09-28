import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  header = String('build a better you');
  subtitle = String ('Start youre weight loss journey here today!');
  constructor() { }

  ngOnInit() {
  }

}
