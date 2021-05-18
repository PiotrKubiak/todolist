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


  const render = () => {                                                                //funkcja render na podstawie której wyrenderują się dane
    let htmlString = "";

    for (const task of tasks) {                                                 
      htmlString += `                                                           
        <li
           ${task.done ? " style=\"text-decoration: line-through\"" : ""}>              
           ${task.content}                                                              
        </li>
      `;                                                                                //dodawanie przekreślenia do zrobionych zadań
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({                                                                       //co robimy jeśli się coś wpisze
      content: newTaskContent,
    });

    render();                                                                         //żeby się coś wypisało trzeba znowu wywołać funkcję render
  };

  const onFormSubmit = (event) => {                                                   //blokada wysłania formularza, biore treść tego inputa 
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();        //jeśli tekst pusty nic nie rób
    
    if(newTaskContent === "") {                                                       
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