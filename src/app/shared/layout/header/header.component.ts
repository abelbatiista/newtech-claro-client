import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class HeaderComponent implements OnInit {
  public title: string = '';

  public constructor(
  ) {
    this.title = 'Claro';
  }

  public ngOnInit(): void {
  }

}
