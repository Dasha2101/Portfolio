import React from 'react';
import Loading from '../loading/Loading';
import useCharacterDetails from '../../hooks/useCharacterDetails';
import { UseCharacterDetailsProps } from './types';
import './DetailsCharachter.css';

const DetailsComponent: React.FC<UseCharacterDetailsProps> = ({
  id,
  onClose,
}) => {
  const { isLoading, character, handleClose } = useCharacterDetails({
    id,
    onClose,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!character) {
    return <div>Error loading character details</div>;
  }

  return (
    <div className="details-panel">
      <h2>Character Details</h2>
      <div className="details-content">
        <img src={character.image} alt={character.name} />
        <div>
          <p>Name: {character.name}</p>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Type: {character.type || 'N/A'}</p>
          <p>Gender: {character.gender}</p>
        </div>
      </div>
      <button onClick={handleClose}>Close Details</button>
    </div>
  );
};

export default DetailsComponent;
