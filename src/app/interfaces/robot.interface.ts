export interface Robot {
  _id: string;
  name: string;
  battery: number;
  engines_status: number[] | null[];
}
