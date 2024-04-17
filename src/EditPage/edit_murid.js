import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function EditMurid() {
    const [namaSiswa, setNamaSiswa] = useState("");
    const [kls, setKls] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [kelasOptions, setKelasOptions] = useState([]);
    const param = useParams();
    const navigate = useNavigate();

    const Put = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3034/siswa/${param.id}`, {
                namaSiswa,
                alamat,
                kls,
                tempatLahir,
                tanggalLahir
            });
            Swal.fire({
                icon: "success",
                title: "Berhasil Mengedit Data",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                navigate("/murid");
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3034/kelas`)
            .then((response) => {
                setKelasOptions(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching class options:", error);
            });

        axios
            .get(`http://localhost:3034/siswa/${param.id}`)
            .then((response) => {
                const murid = response.data.data;
                setNamaSiswa(murid.namaSiswa);
                setKls(murid.namaKelas);
                setAlamat(murid.alamat);
                setTempatLahir(murid.tempatLahir);
                setTanggalLahir(murid.tanggalLahir);
            })
            .catch((error) => {
                console.error("Error fetching student data:", error);
            });
    }, [param.id]);

    return (
        <Container className="py-5">
            <Form onSubmit={Put}>
                <h3 className="mb-4">Edit Murid</h3>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="namaSiswa">
                            <Form.Label>Nama Siswa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Siswa"
                                value={namaSiswa}
                                onChange={(e) => setNamaSiswa(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="kelas">
                            <Form.Label>Kelas</Form.Label>
                            <Form.Select
                                value={kls}
                                onChange={(e) => setKls(e.target.value)}
                                required
                            >
                                <option value="">Pilih Kelas</option>
                                {kelasOptions.map((kelass) => (
                                    <option key={kelass.id} value={kelass.id}>
                                        {kelass.namaKelas}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
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
                    <Button variant="secondary" className="me-2" onClick={() => navigate("/murid")}>
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
