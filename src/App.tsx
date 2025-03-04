import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/login/page';
import MainPage from './page/main/page';
import SignupPage from './page/signup/page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
