import React, { useState, useEffect } from "react";
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, Breadcrumb, Modal, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/navbar'

function Guru() {
    const [guru, setGuru] = useState([]);
    const [namaGuru, setNamaGuru] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [umur, setUmur] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAll = async () => {
        await axios
            .get(`http://localhost:3034/guru/all-guru`)
            .then((res) => {
                setGuru(res.data.data);
            })
            .catch((error) => {
                alert("Terjadi Kesalahan" + error);
            });
    };

    useEffect(() => {
        getAll();
    }, []);

    const add = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3034/guru", {
                namaGuru: namaGuru,
                alamat: alamat,
                tempatLahir: tempatLahir,
                umur: umur,
                tanggalLahir: tanggalLahir,
            });
            setShow(false);
            Swal.fire({
                icon: "success",
                title: "Sukses Menambahkan Data Guru",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            alert("Terjadi Kesalahan " + error);
        }
    };

    const deleteGuru = async (id) => {
        Swal.fire({
            title: "Apakah Anda Ingin Menghapus?",
            text: "Perubahan data tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3034/guru/` + id);
                Swal.fire({
                    icon: "success",
                    title: "Dihapus!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        });
    };

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = guru.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Search function
    const search = (rows) => {
        return rows.filter(
            (row) =>
                row.namaGuru.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                row.alamat.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                row.tempatLahir.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
    };

    // Function to handle date change and calculate age
    const handleDateChange = (e) => {
        const birthDate = new Date(e.target.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setUmur(age);
        setTanggalLahir(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className='container mt-5'>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Guru</Breadcrumb.Item>
                </Breadcrumb>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <Button onClick={handleShow} className="btn btn-primary" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <FontAwesomeIcon className='me-2' icon={faPlus} />Tambah
                    </Button>
                    <input
                        className="rounded-2 p-1"
                        type="text"
                        placeholder="Cari..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Table style={{ border: "2px" }} striped bordered hover responsive rounded className="shadow-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Guru</th>
                            <th>Umur</th>
                            <th>Alamat</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal Lahir</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search(currentItems).map((gurus, index) => {
                            return (
                                <tr key={index.id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{gurus.namaGuru}</td>
                                    <td>{gurus.umur}</td>
                                    <td>{gurus.alamat}</td>
                                    <td>{gurus.tempatLahir}</td>
                                    <td>{gurus.tanggalLahir}</td>
                                    <td>
                                        <Button variant="info" size="xs" className="me-2" href={`/editGuru/` + gurus.id}>
                                            <FontAwesomeIcon icon={faEdit} />Edit
                                        </Button>
                                        <Button onClick={() => deleteGuru(gurus.id)} variant="danger" size="xs">
                                            <FontAwesomeIcon icon={faTrash} /> Hapus
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <Pagination className="mt-4">
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {Array.from({ length: Math.ceil(guru.length / itemsPerPage) }, (_, i) => (
                        <Pagination.Item key={i} onClick={() => paginate(i + 1)} active={i + 1 === currentPage}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(guru.length / itemsPerPage)} />
                </Pagination>

                {/* Modal Tambah Guru */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton className="text-dark">
                        <Modal.Title className="text-lg font-bold">Tambah Guru</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={add}>
                            <div className="mb-3">
                                <label
                                    style={{ fontFamily: "Verdana" }}
                                    className="block text-sm font-medium text-gray-700">Nama Guru:
                                </label>
                                <input
                                    placeholder="Nama Guru"
                                    value={namaGuru}
                                    onChange={(e) => setNamaGuru(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    style={{ fontFamily: "Verdana" }}
                                    className="block text-sm font-medium text-gray-700">Tempat Lahir:
                                </label>
                                <input
                                    placeholder="Tempat Lahir"
                                    value={tempatLahir}
                                    onChange={(e) => setTempatLahir(e.target.value)}
                                    className="input-field"
                                    style={{ fontFamily: "Verdana" }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    style={{ fontFamily: "Verdana" }}
                                    className="block text-sm font-medium text-gray-700">Tanggal Lahir:
                                </label>
                                <input
                                    type="date"
                                    value={tanggalLahir}
                                    onChange={handleDateChange}
                                    className="input-field"
                                    style={{ fontFamily: "Verdana" }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">Alamat:</label>
                                <input
                                    placeholder="Alamat"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    className="input-field"
                                    style={{ fontFamily: "Verdana" }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    style={{ fontFamily: "Verdana" }}
                                    className="block text-sm font-medium text-gray-700">Umur:
                                </label>
                                <input
                                    placeholder="Umur"
                                    value={umur}
                                    onChange={(e) => setUmur(e.target.value)}
                                    className="input-field"
                                    style={{ fontFamily: "Verdana" }}
                                    required
                                    readOnly // Menjadikan input hanya bisa dibaca
                                />
                            </div>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Batal</Button>
                                <Button variant="primary" type="submit">Simpan</Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default Guru;
