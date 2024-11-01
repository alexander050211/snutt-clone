import './reset.css';

import { useEffect, useState } from 'react';
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

const NICKNAME_STORAGE_KEY = 'user_nickname';

const saveNickname = (nickname: Nickname) => {
  localStorage.setItem(NICKNAME_STORAGE_KEY, JSON.stringify(nickname));
};

const getNickname = (): Nickname | undefined => {
  const saved = localStorage.getItem(NICKNAME_STORAGE_KEY);
  if (saved != null) {
    try {
      return JSON.parse(saved) as Nickname;
    } catch {
      localStorage.removeItem(NICKNAME_STORAGE_KEY);
      return undefined;
    }
  }
  return undefined;
};

const AppRoutes = () => {
  const [nickname, setNickname] = useState<Nickname | undefined>(() => {
    return getNickname();
  });

  useEffect(() => {
    if (nickname != null) {
      saveNickname(nickname);
    } else {
      localStorage.removeItem(NICKNAME_STORAGE_KEY);
    }
  }, [nickname]);

  const navigate = useNavigate();

  const onLoginSuccess = ({ newNickname }: { newNickname: Nickname }) => {
    setNickname(newNickname);
    navigate('/');
  };

  const handleLogout = () => {
    setNickname(undefined);
    localStorage.removeItem(NICKNAME_STORAGE_KEY);
    navigate('/login');
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
      <Route
        path="/mypage"
        element={<Mypage nickname={nickname} onLogout={handleLogout} />}
      />
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
