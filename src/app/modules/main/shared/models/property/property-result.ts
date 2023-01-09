import { Property } from "./property";

export interface PropertyResult {
  count: number,
  limit: number,
  offse: number,
  results: Property[],
  total: number,
}