import React from 'react';

import { data } from '../mockup/data.json';
import SearchItem from '../components/SearchItem';

export default function Home() {
  const page = 1;
  const pageSize = 8;

  return (
    <main className="max-w-screen-xl mx-auto mt-8 mb-12 px-4 text-black text-opacity-75 tracking-wide">
      <h1 className="text-5xl font-black mb-1">Campervans</h1>

      <form className="mb-8 md:mb-16">
        <label htmlFor="search" className="mb-2 block font-medium">
          Filter
        </label>
        <div className="flex">
          <input
            // For the purpose of this example it improves the UX
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="search"
            id="search"
            required
            placeholder=""
            className="p-2 border border-black border-opacity-50 rounded w-96"
          />
          <button
            type="button"
            className="text-xs text-white font-bold px-8 py-2 ml-4 rounded bg-outdoorsyGreen"
          >
            Filter
          </button>
        </div>
      </form>

      <ul className="flex flex-wrap mb-8">
        {data.slice((page - 1) * pageSize, page * pageSize).map(item => (
          <li key={item.id} className="w-full lg:w-1/2 mb-8">
            <SearchItem
              id={item.id}
              image_url={item.attributes.primary_image_url}
              name={item.attributes.name}
              city={item.attributes.location.city}
              price_per_day={item.attributes.price_per_day}
              vehicle_type={item.attributes.display_vehicle_type}
              score={item.attributes.sort_score}
              reviews={item.attributes.reviews_num}
            />
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button
          type="button"
          className="text-md lg:text-xs text-white font-bold px-12 lg:px-8 py-4 lg:py-3 ml-4 rounded bg-outdoorsyGreen"
        >
          Load More
        </button>
      </div>
    </main>
  );
}
