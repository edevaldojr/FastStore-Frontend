export class PageControl {
  pageSize: number = 10;
  order: 'DESC' | 'ASC';
  search: string;
  page: number = 0;
  count: number;
}
