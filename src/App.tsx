import './reset.css';

import { useState } from 'react';

import Home from './Home';
import Landing from './Landing';
import Login from './Login';

type Nickname = {
  nickname: string;
  tag: string;
};

export const App = () => {
  const [page, setPage] = useState<'home' | 'login' | 'landing'>('home');
  const [nickname, setNickname] = useState<Nickname>();

  const onLoginButtonClick = () => {
    setPage('login');
  };

  const onLoginSuccess = ({ newNickname }: { newNickname: Nickname }) => {
    setNickname(newNickname);
    setPage('landing');
  };

  return (
    <>
      {page === 'home' && <Home onLoginButtonClick={onLoginButtonClick} />}
      {page === 'login' && <Login onLoginSuccess={onLoginSuccess} />}
      {page === 'landing' && nickname !== undefined && (
        <Landing nickname={nickname} />
      )}
    </>
  );
};
