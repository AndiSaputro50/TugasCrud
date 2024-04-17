import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Breadcrumb, Card, Table } from 'react-bootstrap';
import { faUser, faChalkboardTeacher, faBook, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/navbar';

function Dashboard() {
    const [guru, setGuru] = useState([]);
    const [murid, setMurid] = useState([]);
    const [kelas, setKelas] = useState([]);
    const [mapel, setMapel] = useState([]);
    const [user, setUser] = useState([]);

    const getAll = async () => {
        try {
            const response = await axios.get(`http://localhost:3034/user/all-user`);
            setUser(response.data.data);
        } catch (error) {
            alert("Terjadi Kesalahan" + error);
        }
    }

    const getGuru = async () => {
        try {
            const response = await axios.get(`http://localhost:3034/guru/all-guru`);
            setGuru(response.data.data);
        } catch (error) {
            alert("Terjadi Kesalahan" + error);
        }
    };

    const getMurid = async () => {
        try {
            const response = await axios.get(`http://localhost:3034/siswa/all-murid`);
            setMurid(response.data.data);
        } catch (error) {
            alert("Terjadi Kesalahan" + error);
        }
    };

    const getAllKelas = async () => {
        try {
            const response = await axios.get(`http://localhost:3034/kelas?userId=${localStorage.getItem("userId")}`);
            setKelas(response.data.data);
        } catch (error) {
            alert("Terjadi Kesalahan" + error);
        }
    };

    const getAllMapel = async () => {
        try {
            const response = await axios.get(`http://localhost:3034/mapel/all-guru`);
            setMapel(response.data.data);
        } catch (error) {
            alert("Terjadi Kesalahan" + error);
        }
    };

    useEffect(() => {
        getAll();
        getGuru();
        getMurid();
        getAllKelas();
        getAllMapel();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <Card className="h-100 bg-danger text-white">
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon icon={faUser} className="mr-2" size='2x' />
                                </Card.Title>
                                <Card.Text className='mt-5'>
                                    Jumlah Murid : {murid.length}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-3 mb-4">
                        <Card className="h-100 bg-warning text-white">
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" size='2x' />
                                </Card.Title>
                                <Card.Text className='mt-5'>
                                    Jumlah Guru : {guru.length}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-3 mb-4">
                        <Card className="h-100 bg-success text-white">
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon icon={faBook} className="mr-2" size='2x' />
                                </Card.Title>
                                <Card.Text className='mt-5'>
                                    Jumlah Mapel: {mapel.length}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-3 mb-4">
                        <Card className="h-100 bg-info text-white">
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon icon={faUsers} className="mr-2" size='2x' />
                                </Card.Title>
                                <Card.Text className='mt-5'>
                                    Jumlah Kelas: {kelas.length}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <h2 className='text-center'>Data User</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.username}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {/* data guru */}
                <h2 className='mt-3 text-center'>Data Guru</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Guru</th>
                            <th>Alamat</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal Lahir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guru.map((guru, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{guru.namaGuru}</td>
                                    <td>{guru.alamat}</td>
                                    <td>{guru.tempatLahir}</td>
                                    <td>{guru.tanggalLahir}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Dashboard;
