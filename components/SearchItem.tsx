import React from 'react';

interface SearchItemProps {
  id: string;
  image_url: string;
  name: string;
  city: string;
  price_per_day: number;
  vehicle_type: string;
  score: number;
  reviews: number;
}

const SearchItem = (props: SearchItemProps) => {
  return (
    <article className="flex">
      <section className="w-72 shadow-image">
        <a href="#">
          <picture className="pb-4/6 block w-full relative overflow-hidden rounded">
            <img
              loading="lazy"
              className="absolute h-full w-full object-cover"
              src={props.image_url}
              alt={props.name}
            />
          </picture>
        </a>
      </section>
      <section className="p-6 flex flex-col justify-between">
        <header>
          <div className="mb-1 uppercase text-gray-800 text-opacity-75 text-xs font-bold">
            <span> {props.vehicle_type} </span>
            <span className="text-md">•</span>
            <span> {props.city} </span>
          </div>
          <a href="#">
            <h1 className="font-extrabold leading-5 text-md max-w-2sm">{props.name}</h1>
          </a>
        </header>
        <section className="flex items-center">
          <span className="text-xl">
            <strong>$ {(props.price_per_day / 100).toFixed(0)}</strong>
          </span>

          <span className="inline-block ml-4 flex items-center">
            <span className="text-orange-400 text-xl">
              {Array(5).fill('★').slice(0, props.score).join('')}
              {Array(5).fill('☆').slice(props.score, 5).join('')}
            </span>
            <span className="text-gray-600 text-sm font-normal ml-1">({props.reviews})</span>
          </span>
        </section>
      </section>
    </article>
  );
};

export default SearchItem;
