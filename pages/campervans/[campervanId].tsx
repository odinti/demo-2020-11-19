import React from 'react';

import { data, included } from '../../mockup/single.json';

const CampervanId = () => {
  const mainImageId = data.relationships.primary_image.data.id;

  const avatarImage = included.find(item => item.type === 'users');

  const mainImage = included.find(item => item.id === mainImageId);

  const extraImages = included.filter(item => item.type === 'images' && item.id !== mainImageId);

  return (
    <div className="md:mt-4 mb-8 text-black text-opacity-75 tracking-wide">
      <section className="flex space-x-3">
        {mainImage ? (
          <div className="w-full md:w-1/2 shadow-image">
            <picture className="pb-4/6 block w-full relative overflow-hidden">
              <img
                loading="lazy"
                className="absolute h-full w-full object-cover"
                src={mainImage.attributes.url}
                alt={mainImage.attributes.category?.name}
              />
            </picture>
          </div>
        ) : null}

        {extraImages.slice(0, 1).map(image => (
          <div className="hidden md:block w-full md:w-1/2 shadow-image" key={image.id}>
            <picture className="pb-4/6 block w-full relative overflow-hidden">
              <img
                loading="lazy"
                className="absolute h-full w-full object-cover"
                src={image.attributes.url}
                alt={image.attributes.category?.name}
              />
            </picture>
          </div>
        ))}
      </section>

      <main className="max-w-screen-md mx-auto mt-8 mb-12 px-4 text-black text-opacity-75 tracking-wide relative ">
        <div className="md:flex justify-between mb-6 md:mb-2">
          <section className="absolute top-0 -mt-16 right-0 mr-4 md:static md:mt-0 order-2">
            <span className="text-xl rounded-full bg-outdoorsyGreen text-white w-16 md:w-20 h-16 md:h-20 block flex items-center justify-center">
              <strong className="font-semibold text-sm md:text-xl">
                ${(data.attributes.price_per_day / 100).toFixed(0)}
              </strong>
            </span>
          </section>

          <header>
            <div className="mb-3 uppercase text-gray-800 text-opacity-75 text-md">
              <span> {data.attributes.display_vehicle_type} </span>
              <span className="text-md">•</span>
              <span> {data.attributes.location.city} </span>
            </div>
            <h1 className="font-extrabold leading-5 text-3xl ">{data.attributes.name}</h1>
          </header>
        </div>

        {avatarImage ? (
          <section className="flex items-center">
            <div className="w-16 rounded-full overflow-hidden border-2 border-gray-600">
              <picture className="pb-100 block relative overflow-hidden">
                <img
                  loading="lazy"
                  className="absolute h-full w-full object-cover"
                  src={avatarImage.attributes.avatar_url}
                  alt={`${avatarImage.attributes.first_name} ${avatarImage.attributes.last_name}`}
                />
              </picture>
            </div>

            <strong className="block ml-4 font-xl">
              {avatarImage.attributes.first_name} {avatarImage.attributes.last_name}
            </strong>
          </section>
        ) : null}
      </main>
    </div>
  );
};

export default CampervanId;
