{
  const tasks = [                                                                       
  ];                                                                                    

  const deleteTask = (taskIndex) => {                                                    
    tasks.splice(taskIndex, 1);
    render();
  }

  const toggleTaskDone = (taskIndex) => {                                                 
    tasks[taskIndex].done = !tasks[taskIndex].done;                                      
    render();
  }

  const addNewTask = (newTaskContent) => {
    tasks.push({                                                                        
      content: newTaskContent,
    });
    render();                                                                           
  };

  const bindsdeleteEvents = () => {
    const deleteButtons = document.querySelectorAll(".js-delete");

    deleteButtons.forEach((deleteButton, taskIndex) => {                                    
      deleteButton.addEventListener("click", () => {
        deleteTask(taskIndex);
      })
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {                           
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });                                                                                     
  };

  const render = () => {                                                               
    let htmlString = "";                                                                
                                                                                        
    for (const task of tasks) {
      htmlString += `                                                           
        <li 
          class= "tasks__item js-task"
        >
          <button class="tasks__button tasks__button--toggleDone js-toggleDone"> 
            ${task.done ? "✔" : ""}
          </button>           
            <span class="tasks__content${ task.done ? " tasks__content--done" : ""}">${task.content}</span>
            <button class="tasks__button tasks__button--delete js-delete"> 🗑 </button>                                                     
        </li>
      `;                                                                                
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindsdeleteEvents();
    bindToggleDoneEvents();
    
  };

  const onFormSubmit = (event) => {                                                   
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();                              

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);                                                     
      newTaskElement.value = "";
    }

      newTaskElement.focus();                                                         
  }

  const init = () => {                                                                
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}