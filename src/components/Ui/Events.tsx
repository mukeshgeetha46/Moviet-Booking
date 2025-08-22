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
  return (
    <div className='w-full flex justify-center items-center pt-10 pb-5'>
<div className='w-[77%] overflow-x-auto flex flex-col justify-center'>
       <p className='text-[24px] leading-[28px] font-bold'>The Best of Live Events</p>
    <div className='flex items-center gap-4'>
        <img src={event1} className='w-[220px]' alt="" />
        <img src={event2} className='w-[220px]' alt="" />
        <img src={event3} className='w-[220px]' alt="" />
        <img src={event4} className='w-[220px]' alt="" />
        <img src={event5} className='w-[220px]' alt="" />
        <img src={event6} className='w-[220px]' alt="" />
        <img src={event7} className='w-[220px]' alt="" />
        <img src={event8} className='w-[220px]' alt="" />
        <img src={event9} className='w-[220px]' alt="" />
        <img src={event10} className='w-[220px]' alt="" />
    </div>
    </div>
    </div>
    
  )
}

export default Events
