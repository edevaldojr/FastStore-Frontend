export class PageControl {
  pageSize: Number = 10;
  order: 'DESC' | 'ASC';
  search: string;
  page: Number = 0;
  count: number;
}
