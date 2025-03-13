// INICIO CONFIGURAÇÕES DA PAGINA INDEX
let container = document.querySelectorAll('#container');
let buttonPlay = document.querySelectorAll('.button-play');
let loader = document.querySelectorAll('.loader');
let footer = document.getElementsByTagName('footer');

function rezise() {
    window.location.href = "user.html";
}

buttonPlay.forEach(function (button) {
    button.addEventListener('click', function () {
        container.forEach(function (c) {
            c.classList.add('hidden');
        });
        button.classList.add('hidden');
        loader.forEach(function (l) {
            l.style.opacity = '1';
        });
        Array.from(footer).forEach(function (f) {
            f.classList.add('hidden');
        });

        setTimeout(function () {
            rezise();
        }, 2000);
    });
});

// FIM DAS CONFIGURAÇÕES DA PAGINA INDEX

// INICIO CONFIGURAÇÕES DA PAGINA USER

document.addEventListener('DOMContentLoaded', showRegister);

function showRegister() {
    document.querySelector('.container-register').style.display = 'block';
    document.querySelector('.container-login').style.display = 'none';
}

function showLogin() {
    document.querySelector('.container-register').style.display = 'none';
    document.querySelector('.container-login').style.display = 'block';
}

function registerUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Verifica se o nome de usuário ou e-mail já estão em uso
    if (users[username]) {
        alert("Username is already in use. Please choose another.");
        return Promise.reject("Username taken");
    }

    const emailExists = Object.values(users).some(user => user.email === email);
    if (emailExists) {
        alert("Email is already registered. Login or use another email.");
        return Promise.reject("Email taken");
    }

    // Salva o novo usuário no localStorage
    users[username] = { email: email, password: password, attributes: {} };
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration completed successfully! Log in!");

    // Limpa os campos do formulário
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    showLogin(); // Mostra a tela de login após o registro
}

document.getElementById("register-form").addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email! Check email format.");
        return;
    }

    const passwordRegex = /^\d{4}$/;
    if (!passwordRegex.test(password)) {
        alert("Attention, password must contain exactly 4 numeric digits.");
        return;
    }

    registerUser(username, email, password).catch(error => {
        console.error("Error saving data: ", error);
        alert("Error saving data. Please try again.");
    });
});

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = Object.values(users).find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login successful!");
        window.location.href = "index.html"; // Redireciona para a página principal
    } else {
        alert("Incorrect email or password.");
    }
}

document.getElementById("login-form").addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById("email-login").value.trim();
    const password = document.getElementById("password-login").value.trim();

    if (!email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    loginUser(email, password);
});

document.getElementById("show-login").addEventListener('click', function (e) {
    e.preventDefault();
    showLogin();
});

document.getElementById("show-register").addEventListener('click', function (e) {
    e.preventDefault();
    showRegister();
});



// FIM DAS CONFIGURAÇÕES DA PAGINA USER

// INICIO CONFIGURAÇÕES DA PAGINA INDEX


// FIM DAS CONFIGURAÇÕES DA PAGINA INDEX

