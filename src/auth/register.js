import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import logobinus from "../asset/logobinus.png";
import { Button } from 'react-bootstrap';

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: 'Password harus memiliki setidaknya 8 karakter',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        try {
            await axios.post("http://localhost:3034/user/register", {
                email: email,
                username: username,
                password: password,
            });
            Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil',
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/login");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: 'Terjadi kesalahan saat melakukan registrasi'
            });
            console.error("Terjadi Kesalahan ", error);
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
                <form className="p-3 mt-3" onSubmit={register}>
                    <div className="form-field d-flex align-items-center">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-field d-flex align-items-center">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-field d-flex align-items-center">
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                        />
                    </div>
                    <Button
                        variant="primary"
                        type="submit"
                        className="btn"
                    >
                        Daftar
                    </Button>
                </form>
                <div className="text-center">
                    <a href="/">Masuk</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
