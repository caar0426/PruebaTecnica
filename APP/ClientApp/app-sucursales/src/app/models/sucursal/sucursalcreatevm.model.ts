export class SucursalCreateVM {
    id: number | null;
    codigo: number = 0;
    descripcion: string = "";
    direccion: string = "";
    identificacion: string = "";
    fechaCreacion: Date = new Date();
    monedaId: number = 0;

    constructor() {
      this.id = null;
    }
}
