import {login, logut} from "./auth.js";
const buttonLogin = document.querySelector("#button-login");

buttonLogin.addEventListener("click", async (e) => {
    try {
        await login();
    } catch (error){}
});
