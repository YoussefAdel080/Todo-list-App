let todoInput = document.getElementById("todo-input");
let todoBtn = document.getElementById('todo-btn');

let todoCheck = document.querySelectorAll('.todo-task input');
let todoCheckArr = [];
for(check of todoCheck)
{
    todoCheckArr.push(check);
};

let filters = document.querySelectorAll('.filter');
let filtersArr = [];
for(filter of filters)
{
    filtersArr.push(filter);
};

let todoList = document.getElementById('todo-list');
allTasks = [];
activeTasks = [];
completedTasks = [];

deleteOptions=document.getElementsByClassName('delete');
deleteOptionsArr = [];
for(deleteOption of deleteOptions)
{
    deleteOptionsArr.push(deleteOption);
};

editOptions = document.getElementsByClassName('edit');
editOptionsArr = [];
for(editOption of editOptions)
{
    editOptionsArr.push(editOption);
};


let labelToEdit;
todoBtn.addEventListener('click',function(e)
{
    if(todoInput.value)
    {
        if(e.target.innerText== 'ADD')
        {
            const newListElement = document.createElement('li');

            const taskContainer = document.createElement('div');
            taskContainer.classList.add("todo-cont");

            const newTask = document.createElement('div');
            newTask.classList.add("todo-task");

            const taskCheck = document.createElement('input');
            taskCheck.type = 'checkbox'
            todoCheckArr.push(taskCheck);

            const taskLabel = document.createElement('label');
            taskLabel.innerText = todoInput.value;

            newTask.appendChild(taskCheck);
            newTask.appendChild(taskLabel);

            const taskOptions = document.createElement('div');
            taskOptions.classList.add("todo-options");
            
            const taskDelete = document.createElement('span');
            taskDelete.innerText = 'delete'
            taskDelete.classList.add("material-symbols-outlined");
            taskDelete.classList.add("delete");
            deleteOptionsArr.push(taskDelete);

            const taskEdit = document.createElement('span');
            taskEdit.innerText = 'edit'
            taskEdit.classList.add("material-symbols-outlined");
            taskEdit.classList.add("edit");
            editOptionsArr.push(taskEdit);

            taskOptions.appendChild(taskDelete);
            taskOptions.appendChild(taskEdit);

            taskContainer.appendChild(newTask);
            taskContainer.appendChild(taskOptions);

            newListElement.appendChild(taskContainer);

            allTasks.push(newListElement);
            activeTasks.push(newListElement);
            todoList.appendChild(newListElement);

        }
        else
        {
            labelToEdit.innerText = todoInput.value;
            todoBtn.innerText = 'ADD'
        };
    };
    updateEventListeners();
    todoInput.value = '';
});

for(filter of filters)
{
    filter.addEventListener('click',function(e)
    {
        resetFilters();
        e.target.classList.add('current');
        resetToDoList();
        if(e.target.innerText == 'ALL')
        {
            for(task of allTasks)
            {
                todoList.appendChild(task)
            };
        }
        else if(e.target.innerText == 'ACTIVE')
        {
            for(task of activeTasks)
            {
                todoList.appendChild(task)
            };
        }
        else if(e.target.innerText == 'COMPLETED')
        {
            for(task of completedTasks)
            {
                todoList.appendChild(task)
            };
        };              
    });
};


function resetFilters()
{
    for(filter of filtersArr)
    {
        if(filter.classList.contains('current'))
        {
            filter.classList.remove('current');
        };
    };
};

function resetToDoList()
{
    todoList.innerHTML='';
};

function deleteListItem(listItem)
{
    todoList.removeChild(listItem);

    allTasks = allTasks.filter((task) => task != listItem);
    activeTasks = activeTasks.filter((task) => task != listItem);
    completedTasks = completedTasks.filter((task) => task != listItem);
};

function updateEventListeners()
{
    for(check of todoCheckArr)
    {
        check.addEventListener('change',function(e)
        {
            if(e.target.checked)
            {
                e.target.nextElementSibling.classList.add('done');

                checkedActiveTask = e.target.parentElement.parentElement.parentElement;

                todoList.removeChild(checkedActiveTask);
                
                activeTasks = activeTasks.filter((task) => task!=checkedActiveTask)

                completedTasks.push(checkedActiveTask);
            }
            else
            {
                e.target.nextElementSibling.classList.remove('done');

                unCheckedCompletedTask = e.target.parentElement.parentElement.parentElement;

                todoList.removeChild(unCheckedCompletedTask);
                
                completedTasks = completedTasks.filter((task) => task!=unCheckedCompletedTask);

                allTasks.push(unCheckedCompletedTask);
                activeTasks.push(unCheckedCompletedTask);
            }
        });
    }

    for(deleteOption of deleteOptionsArr)
    {   
        deleteOption.addEventListener('click',function(e)
        {
            deleteListItem(e.target.parentElement.parentElement.parentElement);
        });
    };

    for(editOption of editOptionsArr)
    {
        editOption.addEventListener('click',function(e)
        {   
            todoBtn.innerText = 'EDIT';
            labelToEdit = e.target.parentElement.previousElementSibling.lastElementChild;
        });
    };
};