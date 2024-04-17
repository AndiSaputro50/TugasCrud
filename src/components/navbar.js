import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavbarComp() {
    const navigate = useNavigate();

    const logout = () => {
        Swal.fire({
            title: "Anda Yakin Ingin Keluar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil Keluar",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                localStorage.clear();
            }
        });
    };

    return (
        <div className="navbar mt-5">
            <Navbar
                expand="lg"
                className="shadow-sm border-bottom border-light fixed-top"
                style={{ backgroundColor: 'HighlightText' }}
            >
                <Container>
                    <Navbar.Brand>
                        <div className="d-flex align-items-center">
                            <span style={{ fontSize: "1em", fontWeight: "bold", color: "#000", fontFamily: 'Verdana' }}>
                                DATA - SEKOLAH
                            </span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <>
                                <Nav.Link href="/dashboard" className="text-dark" style={{ fontFamily: 'Verdana' }}>
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link href="/guru" className="text-dark" style={{ fontFamily: 'Verdana' }}>
                                    Guru
                                </Nav.Link>
                                <Nav.Link href="/murid" className="text-dark" style={{ fontFamily: 'Verdana' }}>
                                    Murid
                                </Nav.Link>
                                <Nav.Link href="/kelas" className="text-dark" style={{ fontFamily: 'Verdana' }}>
                                    Kelas
                                </Nav.Link>
                                <Nav.Link href="/mapel" className="text-dark" style={{ fontFamily: 'Verdana' }}>
                                    Mapel
                                </Nav.Link>
                                <button onClick={logout} href="/" className="text-white" style={{ fontFamily: 'Verdana', backgroundColor: 'gray', borderRadius: '8px', padding: '10px 10px', border: 'none', cursor: 'pointer' }}>
                                    Keluar
                                </button>
                            </>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComp;
