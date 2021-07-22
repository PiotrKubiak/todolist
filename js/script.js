{
  const welcome = () => {
    console.log("Hello developers!!! :) ");
  };

  let tasks = [];
  let hideDoneTasks = false;

  //let tasks jest zmienną, ponieważ za każdym razem nie będziemy modyfikować tylko przypisywać nową tablicę

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  //funkcja która dodaje nowy element, bierze sobie tasks kopiuje i tworzy nową tablicę i dodaje nowy element
  const deleteTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  // funkcja usuwająca zadania, która wcześniej bazowała na splice, teraz tworzymy nową tablicę tasks, w której mamy wszystkie taski które są przed elementem który chcemy usunąć i wszystkie które są po elemencie do usunięcia. Będzie tworzona nowa tablica, która się składa z 2 tablic za pomocą slice

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  // funkcja przełączająca gotowe zadania, stworzyliśmy nową tablicę, która składa się ze wszystkich elementów które były przed (...tasks.slice(0, taskIndex),), które były po (...tasks.slice(taskIndex + 1), i z nowego elementu (...tasks[taskIndex], done: !tasks[taskIndex].done,), który jest taki sam jak ten element i różni się tylko done.

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  //funkcja która oznacza wszystkie zadania jako wykonane, przelatujemy sobie po zadaniach funkcją map i zwracamy nowy task który ma done:true i który jest skopiowany,

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  //funkcja, która chowa wszystkie wykonane zadania.

  const bindDeleteEvents = () => {
    const deleteButtons = document.querySelectorAll(".js-delete");

    deleteButtons.forEach((deleteButton, taskIndex) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(taskIndex);
      });
    });
  };

  //funkcja która usuwa zadania

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  //funkcja, która przekreśla gotowe zadania

  const renderTasks = () => {
    const taskToHTML = (
      task
    ) => `                                                           
      <li class="
        tasks__item ${
          task.done && hideDoneTasks ? "tasks__item tasks__item--hidden" : ""
        } js-task
      ">
        <button class="tasks__button tasks__button--toggleDone js-toggleDone"> 
          ${task.done ? "✔" : ""}
        </button>
        <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
          ${task.content}
        </span>
        <button class="tasks__button tasks__button--delete js-delete"> 
          🗑 
        </button>                                                     
      </li>
      `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  //funkcja która dostaje w parametrze task i zwraca HTML'a, który reprezentuje ten task. Jest tutaj użyty map. Mamy tasksElement (js-tasks), bierzemy sobie tablicę tasks, mapujemy na tablicę HTML'i (używająć funkcji taskToHtml) i łączymy pustym łańcuchem znaków, dlatego wszystkie elementy łączymy w jeden string i wrzucamy do inner HTML.
  // Jeśli zadanie jest ukończone to dodajemy tasks__item--hidden (w css ukrywa on element)

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
      <button class="buttons__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button 
        class="buttons__button js-markAllDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}
      >
        Ukończ wszystkie
      </button>
    `;
  };

  //funkcja która dodaje buttony po ukazaniu się zadania i która je renderuje. Buttony mają albo ukrywać ukończone zadania albo pokazywać, albo oznaczać jako zrobione i nie oznaczać.
  //Jeśli nie ma żadnych zadań to nic nie będzie wpisane do buttonsElement. Natomiaast jeśli są to jest string.
  //Funkcją every sprawdzamy czy wszystkie zadania są zrobione i jeśli tak dodajemy atrybut disabled a jeśli nie to go nie dodawać.

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  //funkcja, która przypina te eventListener'y, które mają się odpalić po kliknięciu w jeden i drugi przycisk, natomiast te przyciski mogą się pojawić  ale nie muszą ponieważ one się renderują jeśli lista zadań nie jest pusta, dla tego mamy tutaj if, próbujemy sobie złapań tutaj przycisk markAllDoneButton jeśli on istnieje wtedy dodaje addEventListener, analogicznie z przyciskiem toggleHideDoneTasksButton.

  const render = () => {
    renderTasks();
    bindDeleteEvents();
    bindToggleDoneEvents();

    renderButtons();
    bindButtonsEvents();
  };

  //funkcja wywołująca

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  //funkcja dodawająca kolejne zadanie

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  welcome();

  init();
}
