import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
// import firebase from "firebase/compat/app";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./fire";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, sethasAccount] = useState("");
    const navigate = useNavigate();

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    };
    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                }
            });
    };
    const handleSignup = (form) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                emailjs
                    .sendForm(
                        "service_gd1wizd",
                        "template_mog5ay5",
                        form,
                        "9eUEArBlW4nkDbo5j"
                    )
                    .then(
                        (result) => {
                            navigate("/");
                            console.log(result.text);
                        },
                        (error) => {
                            console.log(error.text);
                        }
                    );
            })
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                }
            });
    };

    const authListener = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    const form = useRef(null);

    return (
        <form className="login" ref={form}>
            <div className="loginContainer">
                <label>Username</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="to_name"
                />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogin();
                                }}
                            >
                                Sign In
                            </button>
                            <p>
                                Don't Have an account ?
                                <span
                                    onClick={() => sethasAccount(!hasAccount)}
                                >
                                    Sign Up
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSignup(form.current);
                                }}
                            >
                                Sign Up
                            </button>
                            <p>
                                <span
                                    onClick={(e) => {
                                        sethasAccount(!hasAccount);
                                    }}
                                >
                                    Sign In
                                </span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
};
export default Login;
