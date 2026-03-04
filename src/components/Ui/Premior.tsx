import React from 'react'
import primiorbanner from '../../assets/premiere-banner-web-collection-202208191200.avif'
import movie from '../../assets/et00432498-hkknxapwjb-portrait.avif'

const Premior = () => {
  const movies = new Array(6).fill({
    title: "Jurassic World: Rebirth",
    language: "English",
    image: movie
  })

  return (
    <div className="w-full bg-[#2B3148] py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Banner */}
        <div>
          <img
            src={primiorbanner}
            alt="Premiere Banner"
            className="w-full rounded-lg"
          />
        </div>

        {/* Heading */}
        <div className="mt-8">
          <p className="text-2xl md:text-3xl font-bold text-white">
            Premieres
          </p>
          <p className="text-sm md:text-base text-gray-300">
            Brand new release every Friday
          </p>
        </div>

        {/* Movies Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((item, index) => (
            <div key={index}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full rounded-lg hover:scale-105 transition duration-300"
              />
              <div className="mt-3">
                <p className="text-sm md:text-base font-bold text-white">
                  {item.title}
                </p>
                <p className="text-xs md:text-sm text-gray-300">
                  {item.language}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Premior
