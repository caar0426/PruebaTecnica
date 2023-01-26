export class SucursalUpdateVm {
    id: number | null;
    codigo: number = 0;
    descripcion: string = "";
    direccion: string = "";
    identificacion: string = "";
    fechaCreacionString: string = "";
    monedaId: number = 0;

    constructor() {
      this.id = null;
    }
}