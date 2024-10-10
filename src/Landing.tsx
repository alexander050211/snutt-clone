import './reset.css';

type Nickname = {
  nickname: string;
  tag: string;
};

const Landing = ({ nickname }: { nickname: Nickname }) => {
  //todo
  return (
    <>
      <h1>
        {nickname.nickname}#{nickname.tag}
      </h1>
    </>
  );
};

export default Landing;
