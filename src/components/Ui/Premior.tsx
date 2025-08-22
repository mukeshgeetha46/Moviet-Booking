import React from 'react'
import primiorbanner from '../../assets/premiere-banner-web-collection-202208191200.avif'
import movie from '../../assets/et00432498-hkknxapwjb-portrait.avif'

const Premior = () => {
  return (
    <div className='w-full bg-[#2B3148] p-5 flex justify-center items-center'>
      <div>
         <div>
        <img src={primiorbanner} alt="" />
       </div>
      <div className='flex flex-col gap-0'>
        <p className='text-[24px] leading-[28px] font-bold mb-0 text-white'>Premieres</p>
        <p className='text-[14px] leading-[20px] text-white'>Brand new release every Friday</p>
      </div>

      <div className='moviecard flex items-center gap-4'>
         <div>
           <img src={movie} className='w-[230px] rounded-[8px]' alt="" />
           <div className='mt-5'>
            <p className='text-[18px] leading-[23px] font-bold mb-0 text-white'>Jurassic World: Rebirth</p>
           <p className='text-[16px] leading-[24px] font-bold mb-0 text-white'>English</p>
           </div>
         </div>
         <div>
           <img src={movie} className='w-[230px] rounded-[8px]' alt="" />
           <div className='mt-5'>
            <p className='text-[18px] leading-[23px] font-bold mb-0 text-white'>Jurassic World: Rebirth</p>
           <p className='text-[16px] leading-[24px] font-bold mb-0 text-white'>English</p>
           </div>
         </div>
         <div>
           <img src={movie} className='w-[230px] rounded-[8px]' alt="" />
           <div className='mt-5'>
            <p className='text-[18px] leading-[23px] font-bold mb-0 text-white'>Jurassic World: Rebirth</p>
           <p className='text-[16px] leading-[24px] font-bold mb-0 text-white'>English</p>
           </div>
         </div>
         <div>
           <img src={movie} className='w-[230px] rounded-[8px]' alt="" />
           <div className='mt-5'>
            <p className='text-[18px] leading-[23px] font-bold mb-0 text-white'>Jurassic World: Rebirth</p>
           <p className='text-[16px] leading-[24px] font-bold mb-0 text-white'>English</p>
           </div>
         </div>
         <div>
           <img src={movie} className='w-[230px] rounded-[8px]' alt="" />
           <div className='mt-5'>
            <p className='text-[18px] leading-[23px] font-bold mb-0 text-white'>Jurassic World: Rebirth</p>
           <p className='text-[16px] leading-[24px] font-bold mb-0 text-white'>English</p>
           </div>
         </div>
         <div>
           <img src={movie} className='w-[230px] rounded-[8px]' alt="" />
           <div className='mt-5'>
            <p className='text-[18px] leading-[23px] font-bold mb-0 text-white'>Jurassic World: Rebirth</p>
           <p className='text-[16px] leading-[24px] font-bold mb-0 text-white'>English</p>
           </div>
         </div>
        
      </div>
      </div>
    </div>
  )
}

export default Premior
