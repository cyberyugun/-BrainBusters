export interface HttpResponseEntity<i> {
  code: number;
  message: string;
  data: i;
  meta: any;
}
