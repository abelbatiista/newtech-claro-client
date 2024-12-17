import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'exception',
    loadComponent: () => import('./feature/exception/exception.component').then((m) => m.ExceptionComponent),
    children: [
      {
        path: 'not-found',
        loadComponent: () => import('./feature/exception/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
      {
        path: '',
        redirectTo: 'not-found',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'page',
    loadComponent: () => import('./feature/page/page.component').then((m) => m.PageComponent),
    children: [
      {
        path: 'book',
        loadComponent: () => import('./feature/page/book/book.component').then((m) => m.BookComponent),
      },
      {
        path: '',
        redirectTo: 'book',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'page',
  },
  {
    path: '**',
    redirectTo: 'exception',
    pathMatch: 'full',
  },
];
