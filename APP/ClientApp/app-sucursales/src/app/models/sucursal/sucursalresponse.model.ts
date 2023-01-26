import { SucursalGetVM } from "./sucursalgetvm.model ";

export class SucursalResponse {
    success: boolean = false;
    sucursales: SucursalGetVM[] | null = null;
}