import React, { useState } from 'react'
import CustomButton from '../../../components/customs/CustomButton';
import "./Login.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnLoginPressed = async () => {
        console.log("Log in");
    }

    const handleOnRegisterPressed = async () => {
        console.log("Register");
    };

    const handleOnGooglePressed = async () => {
        console.log("Google");
    };

  return (
      <div>
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
