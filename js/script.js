{
  const tasks = [
    {
      content: "zjeść śniadanie",
      done: false,
    },
    {
      content: "wstać rano",
      done: true,
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({                                                                       //co robimy jeśli się coś wpisze
      content: newTaskContent,
    });

    render();                                                                         //żeby się coś wypisało trzeba znowu wywołać funkcję render
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  }

  const toggleTaskDone = (taskIndex) => {                                               //fukkcja zmienia done w danym tasku, w tasku mamy taskIndex i teraz done i zaprzeczamy 
    tasks[taskIndex].done = !tasks[taskIndex].done;                                      //teraz do done wpisujemy przeciwieństwo done
    render();
  }

  const bindsEvent = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {                                    //usuwamy zadania buttonem usuń index potrzebny żeby przekazać do remove task
      removeButton.addEventListener("click", () => {
        removeTask(index);
      })
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {                                    //skreślamy zadania buttonem skreśl index
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      })
    });
  }

  const render = () => {                                                                //funkcja render na podstawie której wyrenderują się dane
    let htmlString = "";                                                                //później zajmuje się tym żeby przypisać to usuwanie do przycisków removeButtons

    for (const task of tasks) {
      htmlString += `                                                           
        <li
           ${task.done ? " style=\"text-decoration: line-through\"" : ""}
           >
            <button class="js-done">zrobione?</button>
            <button class="js-remove">usuń</button>              
           ${task.content}                                                              
        </li>
      `;                                                                                //dodawanie przekreślenia do zrobionych zadań
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindsEvent();
  };

  const onFormSubmit = (event) => {                                                   //blokada wysłania formularza, biore treść tego inputa 
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();        //jeśli tekst pusty nic nie rób

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  }

  const init = () => {                                                                //funkcja init przypisuje do form na submit funkcje onFormSubmit
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}