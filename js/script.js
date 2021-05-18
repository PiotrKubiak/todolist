{
  const tasks = [                                                                 //tablica obiektów
    {
      content: "wstać rano",
      done: true,
    },
    {
      content: "zjeść śniadanie",
      done: false,
    },
  ];


  const render = () => {                                                        //renderowanie listy
    let htmlString = "";

    for (const task of tasks) {                                                 //co robimy dla każdego zadania //konkatanacja  można przy każdym zadaniu coś dopisywać
      htmlString += `                                                           
        <li${task.done ? " style=\"text-decoration: line-trought\"" : ""}>
           ${task.content}
        </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const init = () => {
    render();
  };

  init();
}