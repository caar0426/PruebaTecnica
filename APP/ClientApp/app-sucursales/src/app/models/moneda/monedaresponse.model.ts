import { MonedaGetVM } from "./monedagetvm.model";

export class MonedaResponse {
    success: boolean = false;
    monedas: MonedaGetVM[] | null = null;
}