import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/login/page';
import MainPage from './page/main/page';
import SignupPage from './page/signup/page';
import HomePage from './page/home/page';
import MyProfilePage from './page/my-profile/page';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem('npp-access') ? <HomePage /> : <MainPage />
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/my-profile" element={<MyProfilePage />} />
    </Routes>
  );
}

export default App;
