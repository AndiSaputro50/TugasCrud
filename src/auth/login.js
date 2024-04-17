import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import logobinus from "../asset/logobinus.png";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        try {
            const { data, status } = await axios.post(
                "http://localhost:3034/user/login",
                {
                    email: email,
                    password: password,
                }
            );
            // Jika respon 200/ ok
            if (status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Login Berhasil!!!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                localStorage.setItem("userId", data.data.user.id);
                navigate("/dashboard");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Username atau password tidak valid!",
                showConfirmButton: false,
                timer: 1500,
            });
            console.log(error);
        }
    };


    const handlePasswordFocus = () => {
        setPasswordShown(true);
    };

    const handlePasswordBlur = () => {
        setPasswordShown(false);
    };

    return (
        <div>
            <div className="wrapper mt-5">
                <div className="logo">
                    <img src={logobinus} alt="" />
                </div>
                <Form className="p-3 mt-3" onSubmit={login}>
                    <Form.Group controlId="formBasicEmail" className="form-field">
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="form-field password">
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="btn"
                    >
                        Masuk
                    </Button>
                </Form>
                <div className="text-center">
                    Belum mempunyai akun? <a href="/register">Daftar</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
