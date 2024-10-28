 import React from 'react'
import Link from 'next/link';
 function Hero() {
   return (
     <>
<div className="flex flex-wrap">
    <div className="w-full sm:w-8/12 mb-10">
      <div className="container mx-auto h-full sm:p-10">
        <nav className="flex px-4 justify-between items-center">
          <div className="text-4xl font-bold">
            SolarPowered<span className="text-green-700">.</span>
          </div>
          <div>
            <img src="https://image.flaticon.com/icons/svg/497/497348.svg" alt="" className="w-8"/>
          </div>
        </nav>
        <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
          <div className="w-full">
            <h1 className="text-4xl lg:text-6xl font-bold">Zainwestuj w energię słoneczną, wiatrową i inne źródła, które są przyjazne dla naszej planety.</h1>
            
            <div className="w-20 h-2 bg-green-700 my-4"></div>
            <p className="text-xl mb-10">Dzięki naszemu unikalnemu kalkulatorowi energii możesz szybko obliczyć, jak wiele energii odnawialnej potrzebujesz, aby osiągnąć swoje cele ekologiczne i finansowe!</p>
            <Link href="#calculator">
            <button className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">Oblicz</button>
            </Link>
            
            
          </div>
        </header>
      </div>
    </div>
    <img src="mainphoto.jpg" alt="Leafs" className="w-full h-48 object-cover sm:h-screen sm:w-4/12"/>
  </div>
  </>
   )
 }
 
 export default Hero





 