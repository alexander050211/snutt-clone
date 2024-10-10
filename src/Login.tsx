import './reset.css';

type Nickname = {
  nickname: string;
  tag: string;
};

const Login = ({
  onLoginSuccess,
}: {
  onLoginSuccess: ({ newNickname }: { newNickname: Nickname }) => void;
}) => {
  //todo
  const newNickname = { nickname: 'asdf', tag: 'todo' };

  return (
    <>
      <button
        onClick={() => {
          onLoginSuccess({ newNickname });
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
