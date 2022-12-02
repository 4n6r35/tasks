
import Tarea from './tarea.js'

class Tareas {

    _listado = {};

    get listadoarr() {

        const listado = [];
        Object.keys(this._listado).forEach(keys => {
            const tarea = this._listado[keys];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        console.log();
        this.listadoarr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado} \n`);

        });

    }

}

export { Tareas }