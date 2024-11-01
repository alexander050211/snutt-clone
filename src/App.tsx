import './reset.css';

import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Mypage from './Mypage';
import Timetable from './Timetable';

type Nickname = {
  nickname: string;
  tag: string;
};

const AppRoutes = () => {
  const [nickname, setNickname] = useState<Nickname>();
  const navigate = useNavigate();

  const onLoginSuccess = ({ newNickname }: { newNickname: Nickname }) => {
    setNickname(newNickname);
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={nickname !== undefined ? <Timetable /> : <Home />}
      />
      <Route
        path="/login"
        element={<Login onLoginSuccess={onLoginSuccess} />}
      />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export const App = () => {
  //const [page, setPage] = useState<'home' | 'login' | 'timetable'>('home');

  /*
  const onLoginButtonClick = () => {
    setPage('login');
  };
  */

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};
