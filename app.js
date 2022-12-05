import 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import {
    inquirerMenu,
    pausar,
    leerInput,
    Checklist,
    Borrartask,
    confirmar
} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) { //cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        //Imprimir el ménu
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3': //Listar completadas
                tareas.Completadas(true);
                break;

            case '4': //Listar pendientes
                tareas.Completadas(false);
                break;

            case '5': //Completado | Pendiente
                const ids = await Checklist(tareas.listadoarr);
                tareas.Togglecomplete(ids);
                break;
            case '6': //Borrar
                const id = await Borrartask(tareas.listadoarr);
                if (id !== '0') {
                    const confirm = await confirmar('¿Estas seguro?'.bgRed)
                    //TODO: preguntar si está seguro
                    if (confirm) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada exitosamente'.green);
                    }

                }

                break;
        }

        guardarDB(tareas.listadoarr);

        await pausar();

    } while (opt !== '0');

    //pausa();

}

main();