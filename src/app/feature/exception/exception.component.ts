import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class ExceptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
