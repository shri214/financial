import Dashboard from '../Dashboard';
import Header from '../Header';
import SignUpSignIn from '../SingupSingin';
import { Route, Routes } from 'react-router-dom';

const Page = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SignUpSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};
export default Page;
