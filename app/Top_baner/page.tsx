import React from 'react'


function Baner() {
  return (
    <>
      <section>

    <div className='flex w-full bg-red-800' style={{ height: '800px' }}>
      <div className='w-1/2 bg-slate-400 flex flex-col justify-center items-center' style={{ height: '300px' }}>
      <h1 className='text-5xl mb-8 font-light'>SolarPowered</h1>
      <h2 className='text-3xl w-3/4 font-mono'>Interesujesz sie zielona energia? Nasz blog dostarczy Ci najnowszych ciekawostek</h2>
      </div>
      <div className='flex flex-row w-1/2 bg-green-300' style={{ height: '300px' }}>
      <div className="flex flex-row flex-wrap w-1/2 bg-slate-400" style={{ height: '300px' }}>
      <div className='w-1/2 rounded-tl-lg bg-red-400' style={{height: '150px'}}></div>
      <div className='w-1/2 rounded-tr-lg bg-red-600' style={{height: '150px'}}></div>
      <div className='w-1/2 rounded-bl-lg bg-red-700' style={{height: '150px'}}></div>
      <div className='w-1/2 rounded-br-lg bg-red-800' style={{height: '150px'}}></div>
      <div></div>
      <div></div>
      <div></div>
    
      </div>
      <div className="w-1/2 bg-white" style={{ height: '300px' }}></div>
      <div className=""></div>
    
      </div>
    </div>

      </section>
    </>
  );
}

export default Baner