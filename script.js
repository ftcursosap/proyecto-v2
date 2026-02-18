console.log("JavaScript se ha conectado en orden");

const btnCargar = document.getElementById("btnCargar");
const btnBorrar = document.getElementById("btnBorrar");
const lista = document.getElementById("lista");
const estado = document.getElementById("estado");
const contador = document.getElementById("contador");

//Estado central
let tareas = [];

//Render: el DOM siempre se dibuja desde el estado
function render() {
    lista.innerHTML = "";

    tareas.forEach(function (tarea) {
        const item = document.createElement("li");
        item.textContent = tarea.titulo;
        lista.appendChild(item);
    });

    contador.textContent = "Tareas: "+ tareas.length;
};

//Cargar datos desde API -> llenar datos -> render
async function cargarDesdeAPI() {
    estado.textContent = "Cargando...";
    lista.innerHTML = "";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

        if(!response.ok) {
            throw new Error("Error en la peticion");
        };
    

        const data = await response.json();

        //Transformamos la data a nuestra forma interna
        tareas = data.map(function (todo) {
            return {
                id: todo.id,
                titulo: todo.title,
                completada: todo.completed
            };
        });

        estado.textContent = "";
        render();
    } catch(error) {
        estado.textContent = "Ocurrio un error al cargar tareas";
        console.error(error);
    }
}

//Eventos
btnCargar.addEventListener("click", cargarDesdeAPI);

btnBorrar.addEventListener("click", function() {
    tareas = [];
    estado.textContent = "";
    render();
});

//render inicial
render();