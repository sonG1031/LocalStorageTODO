const join = () => {
    let userList = JSON.parse(localStorage.getItem('users'));

    if (userList == null) {
        localStorage.setItem('users', '[]');
        userList = JSON.parse(localStorage.getItem('users'));
    }

    let emailVal = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    let email = document.querySelector("#email");
    let userName = document.querySelector("#userName");
    let userId = document.querySelector("#userId");
    let pwd = document.querySelector("#pwd");

    // 유효성 검사
    if (email.value == '' || !emailVal.test(email.value)) {
        alert("입력을 확인해주세요.");
        return;
    }
    else if (userName.value == '') {
        alert("입력을 확인해주세요.");
        return;
    }
    else if (userId.value == '') {
        alert("입력을 확인해주세요.");
        return;
    }
    else if (pwd.value == '') {
        alert("입력을 확인해주세요.");
        return;
    }

    for(let i = 0; i < userList.length; i++) {
        if (userList[i].email == email.value) {
            alert("중복되는 이메일이 있습니다.");
            return;
        }
        else if (userList[i].id == userId.value) {
            alert("중복되는 아이디가 있습니다.");
            return;
        }
    }

    // 유효성 검사 후 객체 생성
    let user = {};
    user.email = email.value;
    user.id = userId.value;
    user.name = userName.value;
    user.pwd = pwd.value;


    userList.push(user);
    const json = JSON.stringify(userList);
    localStorage.setItem('users', json);

    alert("회원가입에 성공하셨습니다.");
    location = 'index.html';
};

const login = () => {
    let email = document.querySelector("#email");
    let pwd = document.querySelector("#pwd");
    let userList = JSON.parse(localStorage.getItem('users'));

    let emailVal = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if (email.value == '' || !emailVal.test(email.value)) {
        alert('입력을 다시 확인해주세요.');
        return;
    }
    else if(pwd.value == '') {
        alert('입력을 다시 확인해주세요.');
        return;
    }

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == email.value && userList[i].pwd == pwd.value) {
            alert("로그인 성공!");

            const json = JSON.stringify(userList[i]);
            localStorage.setItem('currentUser', json);

            let todos = JSON.parse(localStorage.getItem("todos"));
            if(todos == null) {
                todos = [];
                todos.push({
                    id: userList[i].id,
                    todos: []
                });

                localStorage.setItem("todos", JSON.stringify(todos));
            }
            else {
                let flag = false;
                for(let j = 0; j < todos.length; j++) {
                    if (todos[j].id == userList[i].id) {
                        flag = true;
                        break;
                    }
                }
                if (flag == false) {
                    todos.push({
                        id: userList[i].id,
                        todos: []
                    });
                    localStorage.setItem("todos", JSON.stringify(todos));
                }
            }


            location = 'list.html';
        }
    }


};

const logOut = () => {
    localStorage.removeItem('currentUser');
    location = 'index.html';
};