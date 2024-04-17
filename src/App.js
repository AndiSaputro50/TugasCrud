import './App.css';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './auth/login';
import Register from './auth/register';
import Dashboard from './pages/dashboard';
import Murid from './pages/murid';
import Guru from './pages/guru';
import Mapel from './pages/mapel';
import Kelas from './pages/kelas';
import EditGuru from './EditPage/edit_guru';
import EditKelas from './EditPage/edit_kelas';
import EditMurid from './EditPage/edit_murid';
import EditMapel from './EditPage/edit_mapel';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/guru' element={<Guru />} />
        <Route path='/murid' element={<Murid />} />
        <Route path='/mapel' element={<Mapel />} />
        <Route path='/kelas' element={<Kelas />} />
        <Route path='/editGuru/:id' element={<EditGuru />} />
        <Route path='/editKelas/:id' element={<EditKelas />} />
        <Route path='/editMurid/:id' element={<EditMurid />} />
        <Route path='/editMapel/:id' element={<EditMapel />} />
      </Routes>
    </div>
  );
}

export default App;
