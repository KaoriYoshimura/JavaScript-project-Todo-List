// Set a array in localStrage and collect a array from localStrage
function localStrageTodos () {

    // If localStrage is empty add default todos in localStorage
    if (JSON.parse(localStorage.getItem('todo')) == null){

        function TodoTask (checkBox, date, importance, task){

            this.todoCheck = checkBox;
            this.todoDate = date;
            this.todoImportance = importance;
            this.todoTask = task;

        }

        var todo1 = new TodoTask (false, '2019-03-10', 'Normal', 'Tvättstugan');
        var todo2 = new TodoTask (false, '2019-03-01', 'Low', 'Buy a present');
        var todo3 = new TodoTask (false, '2019-03-05', 'Normal', 'See a dentist');
        var todo4 = new TodoTask (false, '2019-03-01', 'Urgent', 'See a doctor');

        var todoTasks = [todo1, todo2, todo3, todo4];

        localStorage.setItem('todo', JSON.stringify(todoTasks));

    }

    // Run function to display todos
    displayList();

}

// Function to display todos
function displayList() {

    // Fetch the list
    var todoTasks = JSON.parse(localStorage.getItem('todo'));

    // Display a message instead of the list if the array is empty
    if(todoTasks.length === 0) {

        document.getElementById('displayTodoList').innerHTML = '<p>Your list is empty.</p>';

    // Otherwise run a for loop to display the list and to set addEventListener for delete button
    } else {

        // Define variables for todo table tags (tr, td, input)
        var todoTable = '',
            todoTrOpenTag = '<tr>',
            checkBoxTd = '<td><input type="checkbox"></input></td>'; // Name is used in form submission
            TdOpenTag = '<td>',
            TdCloseTag = '</td>',
            deleteTdOpenTag = '<td><button class="deleteBtnInTable" id=',
            deleteTdCloseTag = '>Delete</button></td>',
            todoTrCloseTag = '<tr>';

        // Define table tag, table header tag
        var tableOpenTag = '<table class="table table-bordered">',
            todoTh = '<tr><th>Check</th><th>Date</th><th>Importance</th><th>Task</th><th></th></tr>',
            tableCloseTag = '</table>';

        // Run a loop to print out a list
        for(var i=0; i < todoTasks.length; i++) {

            todoTable +=
            todoTrOpenTag + checkBoxTd + TdOpenTag + todoTasks[i].todoDate + TdCloseTag + TdOpenTag + todoTasks[i].todoImportance + TdCloseTag + TdOpenTag + todoTasks[i].todoTask + TdCloseTag + deleteTdOpenTag + [i] + deleteTdCloseTag + todoTrCloseTag;

        };


        // Print out in html
        document.getElementById('displayTodoList').innerHTML = tableOpenTag + todoTh + todoTable + tableCloseTag;


        // Define variable for checkboxes
        var checkBoxesInTable = document.querySelectorAll("input[type=checkbox]");

        // Reflect checkbox value of localStorage
        for(var i=0; i < checkBoxesInTable.length; i++) {

            checkBoxesInTable[i].checked = todoTasks[i].todoCheck;

            // If a checkbox is checked apply a class to line-through
            if(checkBoxesInTable[i].checked){

                checkBoxesInTable[i].parentNode.parentNode.classList.add('checked');

            }

        };


        var deleteBtns = document.getElementsByClassName("deleteBtnInTable");

        // Set addEventlistener for each delete button.
        for(var i=0; i<deleteBtns.length; i++){

            deleteBtns[i].addEventListener("click", function(){

            var deleteId = this.getAttribute('id');

            // Remove one object from todoTask array
            todoTasks.splice(deleteId, 1);
            
            // Update localStorage
            localStorage.setItem('todo', JSON.stringify(todoTasks));

            // Run the function to display updated list
            displayList();

            });

        };


        for(let i=0; i<checkBoxesInTable.length; i++){

            checkBoxesInTable[i].addEventListener("click", function() {

                // If a checkbox is checked update checkbox value in in the object as true and add 'checked' style
            if(this.checked){

                    todoTasks[i].todoCheck = true;
                    this.parentNode.parentNode.classList.add('checked');

                // If a checkbox is checked update checkbox value in in the object as true and remove 'checked' style
                } else {

                    todoTasks[i].todoCheck = false;
                    this.parentNode.parentNode.classList.remove('checked');

                }

                // Store the result in the localStrage
                localStorage.setItem('todo', JSON.stringify(todoTasks));

            });

        };

    }

}


document.addEventListener("DOMContentLoaded", function(){

    // Clear localStrage
    var clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener("click", function(){
        
        localStorage.clear();

        // Print out default list
        localStrageTodos();

    });

    

    // Sort the list by date
    var isSortingByDate = false;
    var sortBtnDate = document.getElementById("sortBtnDate");
    sortBtnDate.addEventListener("click", function(){

        // Fetch the list
        var todoTasks = JSON.parse(localStorage.getItem('todo'));

        todoTasks.sort(function(a, b){

            // Define variables for the first criteria
            var dateA = new Date(a.todoDate), dateB = new Date(b.todoDate);

            // Define variables for the second criteria
            var importanceA = a.todoImportance, importanceB = b.todoImportance;

            // Define variables for the third criteria (& convert the string to lowercase/uppcase letters)
            var taskA = a.todoTask.toString().toLocaleLowerCase(), taskB = b.todoTask.toString().toLocaleLowerCase();

            // String comparison
            if(dateA < dateB) return -1; // Date Ascending
            if(dateA > dateB) return 1;
            if(importanceA > importanceB) return -1; // Importance descending
            if(importanceA < importanceB) return 1;
            if(taskA < taskB) return -1; // Task Ascending
            if(taskA > taskB) return 1;
            return 0;
        });

        // Toggle sort
        if(isSortingByDate) {
            todoTasks.reverse();
        }

        isSortingByDate = !isSortingByDate;

        // Update localStorage
        localStorage.setItem('todo', JSON.stringify(todoTasks));

        // Run the function to display updated list
        displayList();

    });


    // Sort the list by importance
    var isSortingByImportance = false;
    var sortBtnImp = document.getElementById("sortBtnImportance");
    sortBtnImp.addEventListener("click", function(){

        // Fetch the list
        var todoTasks = JSON.parse(localStorage.getItem('todo'));

        // Sort function
        todoTasks.sort(function(a, b){
    
            // Define variables for the first criteria
            var dateA = new Date(a.todoDate), dateB = new Date(b.todoDate);
        
            // Define variables for the second criteria
            var importanceA = a.todoImportance, importanceB = b.todoImportance;
        
            // Define variables for the third criteria (& convert the string to lowercase/uppcase letters)
            var taskA = a.todoTask.toString().toLocaleLowerCase(), taskB = b.todoTask.toString().toLocaleLowerCase();
        
            // String comparison
            if(importanceA > importanceB) return -1; // Importance descending
            if(importanceA < importanceB) return 1;
            if(dateA < dateB) return -1; // Date Ascending
            if(dateA > dateB) return 1;
            if(taskA < taskB) return -1; // Task Ascending
            if(taskA > taskB) return 1;
            return 0;
        });

        // Toggle sort
        if(isSortingByImportance) {
            todoTasks.reverse();
        }
        isSortingByImportance = !isSortingByImportance;

        // Update localStorage
        localStorage.setItem('todo', JSON.stringify(todoTasks));

        // Run the function to display updated list
        displayList();
    
    });


    // Add items
    var addItemBtn = document.getElementById("addItemBtn");
    addItemBtn.addEventListener("click", function() {

        // Fetch the list
        var todoTasks = JSON.parse(localStorage.getItem('todo'));

        // Variables for the data which is inputted in the input field
        var newItemDate = document.getElementById('inputDate');
        var newItemImportance = document.getElementById('inputImportance');
        var newItemTask = document.getElementById('inputTask');

        // Show the alert if Add btn is clicked with empty input field
        if(newItemDate.value === ''){
            alert('Please choose date');
            newItemDate.focus(); // Specified filed will be selected to notify which field is missing

        } else if(newItemImportance.value === '- Select -'){
            alert('Please choose importance level');
            newItemImportance.focus();

        } else if(newItemTask.value === ''){
            alert('Please write a task');
            newItemTask.focus();

        } else{
        // Add newItem to todoTasks (Use class and create a new object)
        todoTasks.push({todoCheck: false, todoDate: newItemDate.value, todoImportance: newItemImportance.value, todoTask: newItemTask.value});
        localStorage.setItem('todo', JSON.stringify(todoTasks));

        }

        // Empty input field after clicking add btn
        newItemDate.value = "";
        newItemImportance.value = "- Select -";
        newItemTask.value = "";

        // Run the function to display updated list
        displayList();

    });

});