import { SucursalCreateVM } from "./sucursalcreatevm.model";

export class SucursalCreateResponse {
    success: boolean = false;
    sucursales: SucursalCreateVM | null = null;
}