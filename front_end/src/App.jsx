import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard'
import MainLayout from './components/MainLayout';

function App() {
  return (
    <div className='app'>
      <Routes>

        {/* ADMIN ROUTE */}
        <Route path='/admin' element={<AdminDashboard />} />

        {/* MAIN SITE ROUTES */}
        <Route 
          path='/*' 
          element={
            <MainLayout />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
