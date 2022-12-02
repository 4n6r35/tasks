import 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import {
    inquirerMenu,
    pausar,
    leerInput
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
        }

        guardarDB(tareas.listadoarr);

        await pausar();

    } while (opt !== '0');

    //pausa();

}

main();