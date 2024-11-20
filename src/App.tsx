import './reset.css';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import Home from './Home';
import LectureDetail from './LectureDetail';
import LectureList from './LectureList';
import Login from './Login';
import Mypage from './Mypage';
import MypageAccount from './MypageAccount';
import MypageAccountChange from './MypageChangeNickname';
import NewLecture from './NewLecture';
import Timetable from './Timetable';
import {
  fetchInformation,
  getNickname,
  getToken,
  NICKNAME_STORAGE_KEY,
  saveNickname,
  saveToken,
  TOKEN_STORAGE_KEY,
} from './utils/Functions';
import type { Nickname } from './utils/Types';

const AppRoutes = () => {
  const [nickname, setNickname] = useState<Nickname | undefined>(() => {
    return getNickname();
  });
  const [token, setToken] = useState<string | null>(getToken());

  useEffect(() => {
    let ignore = false;
    fetchInformation()
      .then((data) => {
        if (!ignore && data !== null) {
          if (getNickname() === undefined || getNickname() !== data.nickname) {
            setNickname(data.nickname);
            saveNickname(data.nickname);
          }
        }
      })
      .catch((error: unknown) => {
        setToken(null);
        setNickname(undefined);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(NICKNAME_STORAGE_KEY);
        console.error('Error: ', error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (nickname != null) {
      saveNickname(nickname);
    } else {
      localStorage.removeItem(NICKNAME_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    if (token != null) {
      saveToken(token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(NICKNAME_STORAGE_KEY);
    }
  }, [token, nickname]);
  const navigate = useNavigate();

  const onLoginSuccess = ({
    newNickname,
    newToken,
  }: {
    newNickname: Nickname;
    newToken: string;
  }) => {
    setNickname(newNickname);
    setToken(newToken);
    navigate('/');
  };

  const handleLogout = () => {
    setNickname(undefined);
    setToken(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(NICKNAME_STORAGE_KEY);
    navigate('/login');
  };

  const toMypage = () => {
    navigate('/mypage');
  };

  const toAccount = () => {
    navigate('/mypage/account');
  };

  const toChangeNickname = () => {
    navigate('/mypage/account/change-nickname');
  };

  const notify = () => toast('❌ 닉네임 변경 오류!!');

  return (
    <>
      <Routes>
        <Route path="/" element={token !== null ? <Timetable /> : <Home />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={onLoginSuccess} />}
        />
        <Route
          path="/mypage"
          element={<Mypage onLogout={handleLogout} toAccount={toAccount} />}
        />
        <Route
          path="/mypage/account"
          element={
            <MypageAccount toMypage={toMypage} toChange={toChangeNickname} />
          }
        />
        <Route
          path="/mypage/account/change-nickname"
          element={
            <MypageAccountChange toAccount={toAccount} notify={notify} />
          }
        />
        <Route
          path="/timetables/:tableId/lectures/:lectureId"
          element={<LectureDetail />}
        />
        <Route path="timetables/:tableId/lectures" element={<LectureList />} />
        <Route path="timetables/:tableId/new" element={<NewLecture />} />
      </Routes>
      <Toaster />
    </>
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
