import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function EditGuru() {
    const [namaGuru, setNamaGuru] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [alamat, setAlamat] = useState("");
    const [umur, setUmur] = useState("");

    const param = useParams();
    const navigate = useNavigate();

    const Put = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3034/guru/${param.id}`, {
                namaGuru,
                alamat,
                tempatLahir,
                tanggalLahir,
                umur
            });
            Swal.fire({
                icon: "success",
                title: "Berhasil Mengedit Data",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                navigate("/guru");
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3034/guru/${param.id}`)
            .then((response) => {
                const guru = response.data.data;
                setNamaGuru(guru.namaGuru);
                setTempatLahir(guru.tempatLahir);
                setTanggalLahir(guru.tanggalLahir);
                setAlamat(guru.alamat);
                setUmur(guru.umur);
            })
            .catch((error) => {
                alert("Terjadi Kesalahan " + error);
            });
    }, [param.id]);

    return (
        <Container className="py-5">
            <Form onSubmit={Put}>
                <h3 className="mb-4">Edit Guru</h3>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="namaGuru">
                            <Form.Label>Nama Guru</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Guru"
                                value={namaGuru}
                                onChange={(e) => setNamaGuru(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tempatLahir">
                            <Form.Label>Tempat Lahir</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tempat Lahir"
                                value={tempatLahir}
                                onChange={(e) => setTempatLahir(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="umur">
                            <Form.Label>Umur</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Umur"
                                value={umur}
                                onChange={(e) => setUmur(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tanggalLahir">
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Tanggal Lahir"
                                value={tanggalLahir}
                                onChange={(e) => setTanggalLahir(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="alamat" className="mb-3">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Alamat"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={() => navigate("/guru")}>
                        Batal
                    </Button>
                    <Button variant="primary" type="submit">
                        Simpan
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
