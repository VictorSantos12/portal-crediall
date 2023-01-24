import { Property } from "./property";

export class PropertyResult {
  count: number = 0;
  limit: number = 0;
  offse: number = 0;
  results: Property[] = [];
  total: number = 0;
}