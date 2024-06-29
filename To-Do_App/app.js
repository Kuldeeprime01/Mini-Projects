const inputBox = document.querySelector('input');
const listContainer = document.querySelector('#list_container')


const addButton = document.querySelector('.add_button');


function addTask(){
    let newTask = document.createElement('li');
    if(inputBox.value === '') alert('Please add some task');
    else{
        console.log('added');
        newTask.innerHTML = inputBox.value;
        listContainer.appendChild(newTask);
        let crossSpan = document.createElement('span');
        crossSpan.innerHTML = "\u00d7";
        newTask.appendChild(crossSpan);
        inputBox.value = null;
        setData();
    }
};
addButton.addEventListener('click',function(){
    addTask();
});
 
inputBox.addEventListener('keydown',function(event){
    if(event.code == 'Enter'){
        addTask();
    }
});
listContainer.addEventListener('click',function(event){
    if (event.target.nodeName == 'SPAN'){
        let deleteTask = event.target.parentElement;
        deleteTask.remove();
        setData();
    }else{
        let completedTask = event.target;
        completedTask.classList.toggle('checked');
        setData();
    }
},false); 


function setData(){
    localStorage.setItem('data',listContainer.innerHTML);
}

function updateData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

updateData();