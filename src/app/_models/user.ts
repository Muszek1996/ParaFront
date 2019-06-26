export class User {
  id: number;
  email: string;
  name?: string;
  role: string;
  items: Array<object>;
  games: Array<object>;
}
