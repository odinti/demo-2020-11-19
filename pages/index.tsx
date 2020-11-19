import React, { useCallback, useEffect, useState } from 'react';
import fetch from 'node-fetch';
import SearchItem from '../components/SearchItem';

const query = (params: Object) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
};

const PAGE_LIMIT = 8;
const FILTER = 'camper-van';
const ADDRESS = 'san francisco';

const Home = ({ initialData }) => {
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [isLastPage, setIsLastPage] = useState(false);

  const [results, setResults] = useState(initialData);

  const fetchResults = async (fromPage: number, concat: boolean) => {
    setIsLoading(true);

    const response = await fetch(
      'https://search.outdoorsy.co/rentals?' +
        query({
          'filter[type]': FILTER,
          'filter[keywords]': search,
          address: ADDRESS,
          'page[offset]': (fromPage - 1) * PAGE_LIMIT,
          'page[limit]': PAGE_LIMIT,
        }),
    );
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }

    const { data, meta } = await response.json();

    setIsLastPage(meta.stop_position >= meta.total);

    setIsLoading(false);

    if (concat) {
      setResults(results.concat(data));
    } else {
      setResults(data);
    }

    setPage(fromPage);
  };

  const searchResults = async e => {
    e.preventDefault();
    fetchResults(1, false);
  };

  const nextPage = () => {
    fetchResults(page + 1, true);
  };

  return (
    <main className="max-w-screen-xl mx-auto mt-8 mb-12 px-4 text-black text-opacity-75 tracking-wide">
      <h1 className="text-5xl font-black mb-1">Campervans</h1>

      <form className="mb-8 md:mb-16" onSubmit={searchResults}>
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
            value={search}
            className="p-2 border border-black border-opacity-50 rounded w-96"
            onChange={e => setSearch(e.target.value)}
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
        {results.map(item => (
          <li key={item.id} className="w-full lg:w-1/2 mb-2 md:mb-4 lg:mb-8">
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

        {isLoading ? (
          <li>Loading results ...</li>
        ) : results.length === 0 ? (
          <li>No results found</li>
        ) : null}
      </ul>

      {!isLastPage ? (
        <div className="text-center">
          <button
            type="button"
            onClick={nextPage}
            className="text-md lg:text-xs text-white font-bold px-12 lg:px-8 py-4 lg:py-3 ml-4 rounded bg-outdoorsyGreen"
          >
            Load More
          </button>
        </div>
      ) : null}
    </main>
  );
};

// This also gets called at build time
export async function getStaticProps({ params }) {
  const page = 1;

  const response = await fetch(
    'https://search.outdoorsy.co/rentals?' +
      query({
        'filter[type]': FILTER,
        'filter[keywords]': '',
        address: ADDRESS,
        'page[offset]': (page - 1) * PAGE_LIMIT,
        'page[limit]': PAGE_LIMIT,
      }),
  );
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: ' + response.status);
    return;
  }
  const { data, meta } = await response.json();

  return {
    props: {
      initialData: data,
    },
  };
}

export default Home;
