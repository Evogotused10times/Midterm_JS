window.onload = function () {
    let usernameField = document.getElementById("user");
    let passwordField = document.getElementById("pass");

    // Handle "Enter" keypress for login
    usernameField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            login();
        }
    });

    passwordField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            login();
        }
    });
};

// Sign-up function
function signup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("Username already exists! Please choose a different one.");
        return;
    }

    // Create new user object with balance of 0
    let newUser = {
        username: username,
        email: email,
        password: password,
        balance: 0 // New users start with a balance of 0
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign-up successful! You can now log in.");

    window.location.href = "logIn.html";
}

// Log-in function
function login() {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
        alert("Login successful!");
        localStorage.setItem("currentUser", JSON.stringify(validUser)); // Save current user session
        window.location.href = "gwapo.html";
    } else {
        alert("Wrong username or password!");
    }
}

// Load user-specific balance when accessing the dashboard
function loadBalance() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        document.getElementById("balance").value = currentUser.balance;
    }
}

// Check balance function
function checkBalance() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    alert("Ang nahabilin nalng kay: ₱" + currentUser.balance);
}

// Deposit function
function deposit() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let amount = prompt("Butang ug pila imo ideposit:");

    if (amount && !isNaN(amount)) {
        currentUser.balance += parseFloat(amount);
        updateUserData(currentUser);
        document.getElementById("balance").value = currentUser.balance;
        alert("₱" + amount + " ang imo gideposit. Sana all naay ₱" + currentUser.balance);
    } else {
        alert("Kana pung tarong oie rag datu.");
    }
}

// Withdraw function
function withdraw() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let amount = prompt("Pila imo iwithdraw gar?:");

    if (amount && !isNaN(amount)) {
        if (amount <= currentUser.balance) {
            currentUser.balance -= parseFloat(amount);
            updateUserData(currentUser);
            document.getElementById("balance").value = currentUser.balance;
            alert("₱" + amount + " ang imo gicash-out. Ang nahabilin nalng kay ₱" + currentUser.balance);
        } else {
            alert("Aguuuu pobreeee.");
        }
    } else {
        alert("Taronga ba, sumbagon taka ron.");
    }
}

// Update user data in localStorage
function updateUserData(updatedUser) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Update the specific user in the users array
    let updatedUsers = users.map(user => {
        if (user.username === updatedUser.username) {
            return updatedUser;
        }
        return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save updated users list
    localStorage.setItem("currentUser", JSON.stringify(updatedUser)); // Save updated current user session
}

// Exit function
function exit() {
    alert("Logging out...");
    localStorage.removeItem("currentUser"); // Remove current user session
    window.location.href = "logIn.html";
}
