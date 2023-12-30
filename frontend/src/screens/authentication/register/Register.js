import React, { useState } from "react";
import CustomButton from "../../../components/customs/CustomButton";
import { postRequest } from "../../../utils";
import "./Register.css";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleOnRegisterPressed = async () => {
        if (password === confirmPassword) {
            await postRequest("/register", {
                firstName,
                lastName,
                email,
                password,
            });
        }
        console.log("passwords do not match");
    };

    const handleOnLoginPressed = async () => {
        console.log("Log in");
    };

    const handleOnGooglePressed = async () => {
        console.log("Google");
    };

    return (
        <div>
            <div>Register</div>
            <form>
                <label>
                    First name:{" "}
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    Last name:{" "}
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    Phone #:{" "}
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
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
                <label>
                    Confirm password:{" "}
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
            </form>
            <CustomButton
                text="Register"
                handleFunction={handleOnRegisterPressed}
            />
            <CustomButton
                text="or log in"
                handleFunction={handleOnLoginPressed}
                type="TERTIARY"
            />
            <CustomButton
                text="Register with Google"
                handleFunction={handleOnGooglePressed}
            />
        </div>
    );
}
