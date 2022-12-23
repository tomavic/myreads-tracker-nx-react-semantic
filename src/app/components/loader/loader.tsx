import { Player } from '@lottiefiles/react-lottie-player';

function Loader() {
  return (
    <div>
      <Player
        src="https://assets7.lottiefiles.com/private_files/lf30_x8aowqs9.json"
        className="player"
        loop
        autoplay
      />
    </div>
  );
}

export default Loader;
