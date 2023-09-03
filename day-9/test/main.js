const box = document.querySelector(".box")


let user = false;

if (!user) {
    box.innerHTML = `
    <div class="container">
        <div class="login-form">
            <h1>Login</h1>
            <form onsubmit="loginForm()">
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username">
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password">
                </div>
                <div class="input-group">
                    <input type="submit" value="Login">
                </div>
            </form>
        </div>
    </div>
    `

    const loginForm = (e) => {
        e.preventDefault()
    }
}