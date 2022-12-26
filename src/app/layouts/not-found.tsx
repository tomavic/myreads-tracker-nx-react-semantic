import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATHS } from '../models/conf';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container>
      <Player
        src="https://assets2.lottiefiles.com/packages/lf20_suhe7qtm.json"
        className="player"
        style={{ height: '60vh', width: '600px' }}
        loop
        autoplay
      />
      <Link title="Back" to={PATHS.list}>
        <Button className="w-100 mt-5" variant="success" size="lg">
          <FontAwesomeIcon className="text-light me-1" icon={faHome} />
          Back to Home
        </Button>
      </Link>
    </Container>
  );
}

export default NotFound;
