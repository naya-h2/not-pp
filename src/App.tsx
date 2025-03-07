import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/login/page';
import MainPage from './page/main/page';
import SignupPage from './page/signup/page';
import HomePage from './page/home/page';
import MyProfilePage from './page/my-profile/page';
import ReleasePage from './page/my-profile/release/page';

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
      <Route path="/my-profile/release" element={<ReleasePage />} />
    </Routes>
  );
}

export default App;
