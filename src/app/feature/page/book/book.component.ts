import {Component, OnInit} from '@angular/core';
import {Book, BookService, DateTime} from '@core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgTemplateOutlet} from '@angular/common';

enum Action {
  List = 0,
  Add = 1,
  Update = 2,
  View = 3,
}

@Component({
  selector: 'app-book',
  imports: [ReactiveFormsModule, NgTemplateOutlet, DatePipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  standalone: true,
})
export class BookComponent implements OnInit {

  public action: Action = Action.List;
  public items: Book[] = [];
  public item: Book | undefined = undefined;
  public id: number = 0;
  public form: FormGroup = new FormGroup({});

  public get actionList(): Action {
    return Action.List;
  }

  public get actionAdd(): Action {
    return Action.Add;
  }

  public get actionUpdate(): Action {
    return Action.Update;
  }

  public get actionView(): Action {
    return Action.View;
  }

  public constructor(
    private readonly service: BookService,
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl({
        disabled: false,
        value: ''
      }, []),
      description: new FormControl({
        disabled: false,
        value: ''
      }, []),
      pageCount: new FormControl({
        disabled: false,
        value: ''
      }, []),
      excerpt: new FormControl({
        disabled: false,
        value: ''
      }, []),
      publishDate: new FormControl({
        disabled: false,
        value: ''
      }, []),
    });
  }

  private set(): void {
    const formValue: any = this.form.value;
    const publishDate: Date = DateTime.parse(formValue.publishDate);
    this.item = {
      ...formValue,
      publishDate,
    };
  }

  private get(): void {
    this.service.get().subscribe({
      next: (items: Book[]): void => {
        this.items = [...items];
      },
      error: (): void => {
        return;
      },
      complete: (): void => {
        return;
      },
    })
  }

  public changeAction(action: Action): void {
    this.action = action;
  }

  public delete(id: number): void {
    this.service.delete(id).subscribe({
      next: (): void => {
        return;
      },
      error: (): void => {
        return;
      },
      complete: (): void => {
        this.get();
      },
    })
  }

  public view(item: Book): void {
    this.item = item;
    this.action = this.actionView;
  }

  public update(item: Book): void {
    this.item = item;
    this.id = item.id;
    this.form.patchValue({
      ...this.item,
      publishDate: DateTime.toString(item.publishDate),
    });
    this.changeAction(this.actionUpdate);
  }

  public cancel(): void {
    this.item = undefined;
    this.id = 0;
    this.get();
    this.action = this.actionList;
    this.form.reset({});
  }

  public save(): void {
    this.set();
    if (!this.item)
      return;
    else if (this.action === this.actionAdd)
      this.service.create({ ...this.item }).subscribe({
        next: (): void => {
          return;
        },
        error: (): void => {
          return;
        },
        complete: (): void => {
          this.cancel();
        },
      });
    else if (this.action === this.actionUpdate)
      this.service.update(this.id, { ...this.item }).subscribe({
        next: (): void => {
          return;
        },
        error: (): void => {
          return;
        },
        complete: (): void => {
          this.cancel();
        },
      });
    else return;
  }
}
