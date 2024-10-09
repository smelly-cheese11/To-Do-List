let tasks = [];

const addTask = ()=> {
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.ariaValueMax.trim()

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats()
    }
    
}

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats()
}

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    updateStats()
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats()
}

const updateStats = ()=>{
    const completeTask = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length;
    const progress = (completeTask/totalTasks) *100;
    const progressBar = document.getElementById('progess')

    progressBar.style.width = `${progess}`
}
const updateTasksList = ()=> {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = ''

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = `
        <div class="taskItem">
               <div class="task ${task.completed ? 'completed':''}">
               <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
               <p>${task.text}</p>
            </div>
            <div class="icons">
              <img src="edit.png" onClick="editTask(${index})" />
              <img src="bin.png" onClick="deleteTask(${index})"   />
              </div>
            </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem)
    })
}

document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault()

    addTask()
})