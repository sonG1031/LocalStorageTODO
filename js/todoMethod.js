const tblBody = document.getElementById("todoList");


const add = (todo, id, idx, save=false) => {
    if (todo == '') {
        alert("할 일을 입력해주세요.");
        return;
    }
    const row = document.createElement("tr");
    
    // 할 일 제목
    const title = document.createElement("td");
    title.innerHTML = todo;
    title.classList.add('text-center');
    row.appendChild(title);


    // 버튼(삭제, 완료)
    const buttons = document.createElement("td");
    buttons.classList.add('text-end');
    
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('type', 'submit');
    deleteBtn.setAttribute('data-idx', idx);
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-danger');
    deleteBtn.innerHTML = "삭제";

    const finishedBtn = document.createElement("button");
    finishedBtn.setAttribute('type', 'submit');
    finishedBtn.setAttribute('data-idx', idx);
    finishedBtn.classList.add('btn');
    finishedBtn.classList.add('btn-success');
    finishedBtn.classList.add('ms-1');
    finishedBtn.innerHTML = "완료";

    buttons.appendChild(deleteBtn);
    buttons.appendChild(finishedBtn);

    row.appendChild(buttons);

    tblBody.appendChild(row);

    if (save) {
        let todos = JSON.parse(localStorage.getItem("todos"));

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos[i].todos.push(todo);
                break;
            }
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

const addTodo = () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const todo = document.getElementsByClassName("todo")[0];
    let todos = JSON.parse(localStorage.getItem("todos"));
    let idx = 0;

    for (let i = 0; i < todos.length; i++) {
        if(currentUser.id == todos[i].id) {
            idx = todos[i].todos.length;
        }
    }

    add(todo.value, currentUser.id, idx, true);
    todo.value = "";
}

const remove = (id, idx) => {
    let todos = JSON.parse(localStorage.getItem("todos"));

    for(let i = 0; i < todos.length; i++) {
        if(todos[i].id == id) {
            todos[i].todos.splice(parseInt(idx), 1);
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    location.reload();
};

const removeTodo =() => {
    tblBody.addEventListener('click', function(event) {
        let idx = event.target.dataset.idx;
        console.log(typeof idx);
        if(!idx) return;

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        remove(currentUser.id, idx);
    });
};

(()=>{
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let title = document.getElementById("title");
    title.innerHTML = user.name + "님의 " + title.innerHTML;
    
    let todos = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == user.id) {
            for(let j = 0; j < todos[i].todos.length; j++) {
                add(todos[i].todos[j], user.id, j);
            }
            break;
        }
    }
    removeTodo();
})();

