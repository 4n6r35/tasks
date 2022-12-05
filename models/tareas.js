
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

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
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

    Completadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoarr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completadas) {
                //Mostrar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.red} \n`);
                }
            } else {
                //Mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').red} ${desc} :: ${estado} \n`);
                }
            }


        });


    }

    Togglecomplete(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoarr.forEach(tarea=>{
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn=null;
            }
        })
    }

}

export { Tareas }