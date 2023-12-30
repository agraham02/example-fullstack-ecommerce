import React, { useContext, useState } from "react";
import { postRequest, URL } from "utils";
import CustomButton from "../../../components/customs/CustomButton";
import { AppContext } from "App";
import "./Login.css";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { initApp } = useContext(AppContext);

    const handleOnLoginPressed = async () => {
        console.log("Log in");
        // const results = await postRequest("/auth/login", { email, password });
        const results = await axios.post(
            `${URL}/auth/login`,
            {
                email,
                password,
            },
            { withCredentials: true }
        );
        await initApp();
        // console.log(results);
        // console.log(isLoggedIn);
        // setIsLoggedIn(true);
    };

    const handleOnRegisterPressed = async () => {
        console.log("Register");
    };

    const handleOnGooglePressed = async () => {
        console.log("Google");
    };

    return (
        <div className="login-container">
            <div>Login</div>
            <form>
                <label>
                    Email:{" "}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </form>
            <CustomButton text="Log in" handleFunction={handleOnLoginPressed} />
            <CustomButton
                text="or create a new account"
                handleFunction={handleOnRegisterPressed}
                type="TERTIARY"
            />
            <CustomButton
                text="Log in with Google"
                handleFunction={handleOnGooglePressed}
            />
        </div>
    );
}
