import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/login/page';
import MainPage from './page/main/page';
import SignupPage from './page/signup/page';
import HomePage from './page/home/page';
import MyProfilePage from './page/my-profile/page';
import ReleasePage from './page/my-profile/release/page';
import ListPage from './page/list/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyProfileEditPage from './page/my-profile/edit/page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
        <Route path="/my-profile/edit" element={<MyProfileEditPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
