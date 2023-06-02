const prompt = require('prompt-sync')({sigint:true});
const fs = require('fs');
const { finished } = require('stream');

var data = fs.readFileSync("task.JSON")
var taskTab = JSON.parse(data)

let Hello = false
// let taskTab = []

function taskManager (taskTab){
    if (Hello === false){
        console.log("Good Morning ! Welcome on your Task Manager !")
        Hello = true
    }
    console.log("Please press,")
    console.log("1. to see all your tasks.")
    console.log("2. to add a task.")
    console.log("3. to delete a task.")
    console.log("4. to mark a task as done.")
    console.log("5. to Exit the task manager.")
    let x = parseInt(prompt(""))
    switch(x){
        case 1 :
            if (taskTab.length === 0){
                console.log("There's no task yet")
            }
            else{
                console.log(taskTab)
            }
            taskManager(taskTab)
        break

        case 2 :
            let task = prompt("Write the task you want to add :  ")
            let taskDone = " not done"
            let keyValue = [task,taskDone]
            taskTab.push(keyValue)
            taskManager(taskTab)
        break

        case 3 :
            console.log("What element do you want to remove ?")
            for (let i = 0 ; i < taskTab.length ; i ++){
                console.log(`${i + 1} : ${taskTab[i]}`)
            }
            let remove = parseInt(prompt(""))
            remove -= 1
            taskTab.splice(remove, 1)
            taskManager(taskTab)
        break

        case 4 :
            console.log("What element do you want to mark as done ?")
            for (let i = 0 ; i < taskTab.length ; i ++){
                console.log(`${i + 1} : ${taskTab[i]}`)
            }
            let done = parseInt(prompt(""))
            taskTab[done - 1][1] = " done"
            taskManager(taskTab)
        break

        case 5 :
            var data = JSON.stringify(taskTab, null, 2) // null and 2 are to make space into the JSON file
            fs.writeFile('task.JSON',data, finished)
            function finished(err){
                console.log("all set.")
            }

            return "Goodbye ! Have a nice day !"
        break

        default :
            console.log("The value was not correct")
            taskManager(taskTab)
    }
}


taskManager(taskTab)