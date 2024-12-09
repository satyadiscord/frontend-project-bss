import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Kelas,
  Login,
  MataPelajaran,
  ProfilUser,
  Register,
  ReqKelas,
  Student,
} from "./pages/IndexPages.jsx";

import {
  CreateEditKelas,
  TambahKelas,
  CreateEditMapel,
  TambahMapel,
  CreateEditStudent,
  TambahStudet,
} from "./CreateEditFormCRUD/IndexCreateEdit.jsx";

import {
  KelasDetail,
  MapelDetail,
  StudentDetail,
} from "./Detail/indexDetail.jsx";
import MainApp from "./pages/MainApp/MainApp.jsx";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/kelas" element={<Kelas />} />
            <Route path="/matapelajaran" element={<MataPelajaran />} />
            <Route path="/student" element={<Student />} />
            <Route path="/request-kelas" element={<ReqKelas />} />
            <Route path="/detail-kelas/:id" element={<KelasDetail />} />
            <Route path="/detail-matapelajaran/:id" element={<MapelDetail />} />
            <Route path="/detail-student/:id" element={<StudentDetail />} />
          </Route>

          {/* Routes di luar mainApp */}
          <Route path="/profil" element={<ProfilUser />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute redirectPath="/">
                <Login />
              </ProtectedRoute>
            }
          />

          {/* Crud routing */}
          <Route path="/tambah-kelas" element={<TambahKelas />} />
          <Route path="/edit-kelas/:id" element={<CreateEditKelas />} />
          <Route path="/tambah-mapel" element={<TambahMapel />} />
          <Route path="/edit-mapel/:id" element={<CreateEditMapel />} />
          <Route path="/tambah-student" element={<TambahStudet />} />
          <Route path="/edit-student/:id" element={<CreateEditStudent />} />
        </Routes>
      </Router>
    </>
  );
}
