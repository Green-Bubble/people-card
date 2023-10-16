import { useState } from 'react';
import { People } from '../models/people';
import React from 'react';
import { snakeToCamel } from '../utils';
import Image from 'next/image';
const defaultShow = [
  'first_name',
  'last_name',
  'gender',
  'date_of_birth',
  'avatar',
];

export const PeopleCard = ({ people }: { people: People }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <div
        className="card"
        onMouseEnter={() => {
          console.log('mouse entered123123');
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <Image
          src={people.avatar}
          alt="Avatar"
          className="dark:invert"
          width={100}
          height={24}
        />
        <h2>{people.first_name + ' ' + people.last_name}</h2>
        <h2>{people.gender}</h2>
        <h2>{people.date_of_birth}</h2>

        {isHover ? (
          <>
            {Object.keys(people)
              .filter(
                key =>
                  defaultShow.indexOf(key) == -1 &&
                  typeof (people as any)[key] === 'string',
              )
              .map(key => (
                <div key={key}>
                  {snakeToCamel(key)} : {(people as any)[key]}
                </div>
              ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
