import { useEffect, useState } from 'react';
import { RickAndMortyAPI } from '../services/apiService/apiSevice';
import { SearchDataType } from '../services/types';
import { useNavigate } from 'react-router-dom';
import { UseCharacterDetailsProps } from '../components/detailsCharachter/types';

const useCharacterDetails = ({ id, onClose }: UseCharacterDetailsProps) => {
  const [isLoading, setLoading] = useState(true);
  const [character, setCharacter] = useState<SearchDataType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const char = await RickAndMortyAPI.fetchCharacter(Number(id));
        setTimeout(() => {
          setCharacter(char);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching character:', error);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleClose = () => {
    navigate('/');
    onClose();
  };

  return { isLoading, character, handleClose };
};

export default useCharacterDetails;
