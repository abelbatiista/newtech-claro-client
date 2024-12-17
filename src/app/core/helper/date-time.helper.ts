export class DateTime {
  public static parse(stringDate: string): Date {
    const dateRegex: RegExp = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    const match: RegExpMatchArray | null = stringDate.match(dateRegex);
    if (!match) {
      console.error('Invalid date format . use dd/MM/yyyy instead.');
      return new Date();
    }

    const day: number = parseInt(match[1], 10);
    const month: number = parseInt(match[2], 10) - 1;
    const year: number = parseInt(match[3], 10);
    const date: Date = new Date(year, month, day);

    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    } else {
      console.error('Invalid parsed date.');
      return new Date();
    }
  }

  public static toString(date: Date): string {
    const newDate: Date = new Date(date);
    const day: string = String(newDate.getDate()).padStart(2, '0');
    const month: string = String(newDate.getMonth() + 1).padStart(2, '0');
    const year: number = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
