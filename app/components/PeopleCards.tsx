'use client'; // 👈 use it here

import { People } from '../models/people';
import { PeopleCard } from './PeopleCard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useError, useIsLoading, usePeoples } from '../stores/selectors/people';
import { fetchPeopleRequest } from '../stores/actions/people';

export default function PeopleCards() {
  const peoples = usePeoples();
  const error = useError();
  const isLoading = useIsLoading();

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(fetchPeopleRequest());
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      <button onClick={handleClick} disabled={isLoading}>
        {!isLoading ? 'Update' : 'Loading....'}
      </button>
      <p>{error}</p>
      <div className="card-container">
        {peoples.map((people: People) => (
          <PeopleCard people={people} key={people.id} />
        ))}
      </div>
    </>
  );
}
