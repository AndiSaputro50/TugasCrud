import React, { useEffect, useState } from 'react';
import { Button, Table, Breadcrumb, Modal, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar'

function Kelas() {
    const [kelas, setKelas] = useState([]);
    const [namaJurusan, setNamaJurusan] = useState("");
    const [namaKelas, setNamaKelas] = useState("");
    const [selectedGuru, setSelectedGuru] = useState("");
    const [guruList, setGuruList] = useState([]);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getGuru = async () => {
        try {
            const response = await axios.get("http://localhost:3034/guru/all-guru");
            setGuruList(response.data.data);
        } catch (error) {
            console.error("Terjadi Kesalahan:", error);
        }
    };

    const getAll = async () => {
        try {
            const response = await axios.get(`http://localhost:3034/kelas?UserId=${localStorage.getItem("userId")}`);
            setKelas(response.data.data);
        } catch (error) {
            alert("Terjadi Kesalahan" + error);
        }
    };

    useEffect(() => {
        getAll();
        getGuru();
    }, []);

    const add = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3034/kelas", {
                namaKelas: namaKelas,
                namaJurusan: namaJurusan,
                guru: selectedGuru,
            });
            setShow(false);
            Swal.fire({
                icon: "success",
                title: "Sukses Menambahkan Data Kelas",
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

    const deleteKelas = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Apakah Anda Ingin Menghapus?",
                text: "Perubahan data tidak bisa dikembalikan!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Hapus",
                cancelButtonText: "Batal",
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3034/kelas/${id}`);
                Swal.fire({
                    icon: "success",
                    title: "Dihapus!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAll();
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan",
                text: "Gagal menghapus data",
            });
        }
    };

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = kelas.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Search function
    const search = (rows) => {
        return rows.filter(
            (row) =>
                row.namaKelas.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                row.namaJurusan.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                row.guru.namaGuru.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
    };

    return (
        <div>
            <Navbar />
            <div className='container mt-5'>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Kelas</Breadcrumb.Item>
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
                <Table style={{ border: "2px" }} striped bordered hover responsive className='shadow-sm'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Kelas</th>
                            <th>Nama Jurusan</th>
                            <th>Wali Kelas</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search(currentItems).map((kelass, index) => {
                            return (
                                <tr key={kelass.id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{kelass.namaKelas}</td>
                                    <td>{kelass.namaJurusan}</td>
                                    <td>{kelass.guru.namaGuru}</td>
                                    <td>
                                        <Button variant="info" size="xs" className="me-2" href={`/editKelas/` + kelass.id}>
                                            <FontAwesomeIcon icon={faEdit} />Edit
                                        </Button>
                                        <Button onClick={() => deleteKelas(kelass.id)} variant="danger" size="xs">
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
                    {Array.from({ length: Math.ceil(kelas.length / itemsPerPage) }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(kelas.length / itemsPerPage)} />
                </Pagination>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton className="text-dark">
                        <Modal.Title className="text-lg font-bold">Tambah Kelas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={add}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama Kelas:</label>
                                <input
                                    placeholder="Nama Kelas"
                                    value={namaKelas}
                                    onChange={(e) => setNamaKelas(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama Jurusan:</label>
                                <input
                                    placeholder="Nama Jurusan"
                                    value={namaJurusan}
                                    onChange={(e) => setNamaJurusan(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Wali Kelas:</label>
                                <select
                                    className="input-field"
                                    value={selectedGuru}
                                    onChange={(e) => setSelectedGuru(e.target.value)}
                                    required
                                >
                                    <option value="">Pilih Wali Kelas</option>
                                    {guruList.map((guru) => (
                                        <option key={guru.id} value={guru.id}>{guru.namaGuru}</option>
                                    ))}
                                </select>
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

export default Kelas;
