import React, { useState, useEffect } from 'react';
import { Button, Table, Breadcrumb, Modal, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';

function Murid() {
    const [nama, setNama] = useState([]);
    const [namaSiswa, setNamaSiswa] = useState("");
    const [kelas, setKelas] = useState([]);
    const [namaKelas, setNamaKelas] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAll = async () => {
        try {
            const response = await axios.get("http://localhost:3034/siswa/all-murid");
            setNama(response.data.data);
        } catch (error) {
            console.error("Terjadi Kesalahan:", error);
            alert("Terjadi Kesalahan" + error);
        }
    };

    const getAllKelas = async () => {
        try {
            const response = await axios.get(`http://localhost:3034/kelas?UserId=${localStorage.getItem("userId")}`);
            setKelas(response.data.data);
        } catch (error) {
            console.error("Terjadi Kesalahan:", error);
            alert("Terjadi Kesalahan" + error);
        }
    };

    useEffect(() => {
        getAll();
        getAllKelas();
    }, []);

    const add = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3034/siswa", {
                namaSiswa: namaSiswa,
                alamat: alamat,
                tempatLahir: tempatLahir,
                tanggalLahir: tanggalLahir,
                kls: namaKelas,
            });
            setShow(false);
            Swal.fire({
                icon: "success",
                title: "Sukses Menambahkan",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Terjadi Kesalahan:", error);
            alert("Terjadi Kesalahan" + error);
        }
    };

    const deleteSiswa = async (id) => {
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
                await axios.delete(`http://localhost:3034/siswa/` + id);
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
        } catch (error) {
            console.error("Terjadi Kesalahan:", error);
            alert("Terjadi Kesalahan" + error);
        }
    };

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = nama.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Search function
    const search = (rows) => {
        return rows.filter(
            (row) =>
                row.namaSiswa.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                row.alamat.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                row.kls.namaKelas.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                row.tempatLahir.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                row.tanggalLahir.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
    };

    return (
        <div>
            <Navbar />
            <div className='container mt-5'>
                <Breadcrumb className='flex-grow-1'>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Murid</Breadcrumb.Item>
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
                            <th>Nama Murid</th>
                            <th>Alamat</th>
                            <th>Kelas</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal Lahir</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search(currentItems).map((siswas, index) => {
                            return (
                                <tr key={index}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{siswas.namaSiswa}</td>
                                    <td>{siswas.alamat}</td>
                                    <td>{siswas.kls.namaKelas}</td>
                                    <td>{siswas.tempatLahir}</td>
                                    <td>{siswas.tanggalLahir}</td>
                                    <td>
                                        <Button variant="info" size="xs" className="me-2" href={`/editMurid/` + siswas.id}>
                                            <FontAwesomeIcon icon={faEdit} />Edit
                                        </Button>
                                        <Button onClick={() => deleteSiswa(siswas.id)} variant="danger" size="xs">
                                            <FontAwesomeIcon icon={faTrash} /> Hapus
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <Pagination>
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {Array.from({ length: Math.ceil(nama.length / itemsPerPage) }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(nama.length / itemsPerPage)} />
                </Pagination>

                {/* Modal Tambah Murid */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton className="text-dark">
                        <Modal.Title className="text-lg font-bold">Tambah Murid</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={add}>
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">Nama Siswa:</label>
                                <input
                                    placeholder="Nama Siswa"
                                    value={namaSiswa}
                                    onChange={(e) => setNamaSiswa(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700"> Kelas:</label>
                                <select
                                    className="input-field"
                                    value={namaKelas}
                                    onChange={(e) => setNamaKelas(e.target.value)} // Update state saat opsi dipilih
                                    required
                                >
                                    <option value="">Pilih Kelas :</option>
                                    {kelas.map((kelass) => (
                                        <option key={kelass.id} value={kelass.id}>{kelass.namaKelas}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">Tempat Lahir:</label>
                                <input
                                    placeholder="Tempat Lahir"
                                    value={tempatLahir}
                                    onChange={(e) => setTempatLahir(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">Tanggal Lahir:</label>
                                <input
                                    type="date"
                                    value={tanggalLahir}
                                    onChange={(e) => setTanggalLahir(e.target.value)}
                                    className="input-field"
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
                                    required
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

export default Murid;
