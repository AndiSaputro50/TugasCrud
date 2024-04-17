import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function EditKelas() {
    const [namaJurusan, setNamaJurusan] = useState("");
    const [namaKelas, setNamaKelas] = useState("");
    const [guru, setGuru] = useState("");
    const [guruOptions, setGuruOptions] = useState([]);

    const param = useParams();
    const navigate = useNavigate();

    const Put = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3034/kelas/${param.id}`, {
                namaJurusan,
                namaKelas,
                guru
            });
            Swal.fire({
                icon: "success",
                title: "Berhasil Mengedit Data",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                navigate("/kelas");
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3034/guru/all-guru`)
            .then((response) => {
                setGuruOptions(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching class options:", error);
            });

        axios
            .get(`http://localhost:3034/kelas/${param.id}`)
            .then((response) => {
                const kelas = response.data.data;
                setNamaJurusan(kelas.namaJurusan);
                setNamaKelas(kelas.namaKelas);
            })
            .catch((error) => {
                alert("Terjadi Kesalahan " + error);
            });
    }, [param.id]);

    return (
        <Container className="py-5">
            <Form onSubmit={Put}>
                <h3 className="mb-4">Edit Kelas</h3>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="namaJurusan">
                            <Form.Label>Nama Jurusan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Jurusan"
                                value={namaJurusan}
                                onChange={(e) => setNamaJurusan(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="namaKelas">
                            <Form.Label>Nama Kelas</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Kelas"
                                value={namaKelas}
                                onChange={(e) => setNamaKelas(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="guru">
                            <Form.Label>Guru</Form.Label>
                            <Form.Select
                                value={guru}
                                onChange={(e) => setGuru(e.target.value)}
                                required
                            >
                                <option value="">Pilih Guru</option>
                                {guruOptions.map((gurus) => (
                                    <option key={gurus.id} value={gurus.id}>
                                        {gurus.namaGuru}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={() => navigate("/kelas")}>
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
