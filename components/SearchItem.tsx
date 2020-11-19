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
    <article className="flex flex-wrap lg:flex-no-wrap">
      <section className="w-full lg:w-72 shadow-image flex-shrink-0">
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
      <section className="px-0 lg:px-6 p-6 flex flex-col justify-between">
        <header>
          <div className="mb-1 uppercase text-gray-800 text-opacity-75 text-xs ">
            <span> {props.vehicle_type} </span>
            <span className="text-md">•</span>
            <span> {props.city} </span>
          </div>
          <a href="#">
            <h1 className="font-extrabold leading-5 text-md lg:max-w-2sm">{props.name}</h1>
          </a>
        </header>
        <section className="flex items-center">
          <span className="text-xl">
            <strong className="font-semibold">$ {(props.price_per_day / 100).toFixed(0)}</strong>
          </span>

          <span className="inline-block ml-2 lg:ml-4 flex items-center">
            <span className="text-orange-400 text-xl" title={`Rating: ${props.score.toFixed(1)}`}>
              {Array(5).fill('★').slice(0, props.score).join('')}
              {Array(5).fill('☆').slice(props.score, 5).join('')}
            </span>
            <span className="text-gray-600 text-sm font-normal ml-0 lg:ml-1">
              ({props.reviews})
            </span>
          </span>
        </section>
      </section>
    </article>
  );
};

export default SearchItem;
