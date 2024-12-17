import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from '@shared';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
})
export class PageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
