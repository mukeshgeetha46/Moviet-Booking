import React from 'react'
import event1 from '../../assets/Events/amusement-parks-banner-desktop-collection-202503251132.avif'
import event2 from '../../assets/Events/arts-crafts-collection-202211140440.avif'
import event3 from '../../assets/Events/comedy-shows-collection-202211140440.avif'
import event4 from '../../assets/Events/dance-classes-collection-202211140440.avif'
import event5 from '../../assets/Events/interactive-games-collection-202211140440.avif'
import event6 from '../../assets/Events/kids-banner-desktop-collection-202503251132 (1).avif'
import event7 from '../../assets/Events/music-shows-collection-202211140440.avif'
import event8 from '../../assets/Events/theatre-shows-collection-202211140440.avif'
import event9 from '../../assets/Events/upskill-collection-202211140440.avif'
import event10 from '../../assets/Events/workshop-and-more-web-collection-202211140440.avif'

const Events = () => {

  const events = [
    event1, event2, event3, event4, event5,
    event6, event7, event8, event9, event10
  ]

  return (
    <div className="w-full py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <p className="text-2xl md:text-3xl font-bold mb-6">
          The Best of Live Events
        </p>

        {/* Horizontal Scroll */}
        <div className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">

          {events.map((item, index) => (
            <div
              key={index}
              className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] snap-start"
            >
              <img
                src={item}
                alt="event"
                className="w-full rounded-lg hover:scale-105 transition duration-300 cursor-pointer"
              />
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Events
