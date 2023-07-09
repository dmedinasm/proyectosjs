# proyectosjs

## Lógica de la Aplicación Pomodoro

1. Se declaran las variables necesarias: `tasks` (un array vacío para almacenar las tareas), `time` (el tiempo restante en segundos), `timer` (un temporizador para la tarea actual), `timerBreak` (un temporizador para el descanso), y `current` (el ID de la tarea actual).

2. Se obtienen referencias a los elementos del DOM necesarios para interactuar con la interfaz de usuario, como botones y campos de texto.

3. Se llama a las funciones `renderTime()` y `renderTasks()` para mostrar el tiempo actual y las tareas en la interfaz de usuario.

4. Se agrega un event listener al formulario para capturar el evento de envío. Cuando se envía el formulario, se crea una nueva tarea con el valor ingresado en el campo de texto, se limpia el campo de texto y se actualizan las tareas mostradas en la interfaz de usuario.

5. La función `createTask()` se encarga de crear una nueva tarea y agregarla al inicio del array `tasks`. Cada tarea tiene un ID único generado aleatoriamente, un título y un estado de completado inicialmente establecido en falso.

6. La función `renderTasks()` genera el HTML necesario para mostrar todas las tareas en la interfaz de usuario. Por cada tarea, se crea un div con clases CSS correspondientes y se muestra su estado de completado y título.

7. Los botones de inicio de cada tarea tienen event listeners que capturan el clic. Cuando se hace clic en un botón de inicio, se verifica si no hay ningún temporizador en ejecución. Si es así, se obtiene el ID de la tarea asociada al botón, se llama a la función `startButtonHandler()`, se actualiza el texto del botón y se inicia el temporizador.

8. La función `startButtonHandler()` se encarga de iniciar el temporizador para la tarea seleccionada. Establece el tiempo inicial en 5 segundos, actualiza la tarea actual, muestra el título de la tarea en la interfaz de usuario, llama a `renderTime()` para mostrar el tiempo actual y comienza un temporizador que ejecuta la función `timeHandler()` cada segundo.

9. La función `timeHandler()` maneja el tiempo restante para la tarea. Reduce el tiempo en 1 segundo, actualiza la interfaz de usuario llamando a `renderTime()` y verifica si el tiempo ha llegado a cero. Si es así, se detiene el temporizador, se marca la tarea como completada, se actualizan las tareas en la interfaz de usuario y se inicia el temporizador de descanso llamando a `startBreak()`.

10. La función `startBreak()` inicia el temporizador de descanso. Establece el tiempo inicial en 3 segundos, muestra "Break" como título de la tarea en la interfaz de usuario, llama a `renderTime()` para mostrar el tiempo actual y comienza un temporizador que ejecuta la función `timerBreakHandler()` cada segundo.

11. La función `timerBreakHandler()` maneja el tiempo restante para el descanso. Reduce el tiempo en 1 segundo, actualiza la interfaz de usuario llamando a `renderTime()` y verifica si el tiempo ha llegado a cero. Si es así, se detiene el temporizador de descanso, se restablece la tarea actual a null, se elimina el título de la tarea en la interfaz de usuario y se actualizan las tareas.

12. La función `renderTime()` muestra el tiempo actual en la interfaz de usuario. Calcula los minutos y segundos restantes a partir del tiempo actual y actualiza el contenido de un elemento en el DOM para mostrar el tiempo en el formato "mm : ss".

13. La función `markCompleted()` marca una tarea como completada. Busca la tarea en el array `tasks` que coincide con el ID proporcionado y actualiza su estado de completado a true.
