import { SucursalUpdateVm } from "./sucursalupdatevm.model";

export class SucursalUpdateResponse {
    success: boolean = false;
    sucursal: SucursalUpdateVm | null = null;
}