import React from 'react'
import banner from '../../assets/stream-leadin-web-collection-202210241242 (1).avif'

const Banner = () => {
  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <img
          src={banner}
          alt="Streaming Banner"
          className="w-full rounded-lg object-cover"
        />
      </div>
    </div>
  )
}

export default Banner
