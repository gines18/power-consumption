
import React from 'react'
import Image from 'next/image'

const data = [
  {
    image: "/solar.jpg",
    title: "Panele Słoneczne",
    description: "Panele słoneczne przekształcają światło słoneczne w energię elektryczną, oferując zrównoważone źródło energii.",
    width: 500,
    height: 300,
  },
  {
    image: "/bateries.jpg",
    title: "Bank energii",
    description: "Baterie przechowują energię produkowaną przez panele słoneczne na późniejsze użycie.",
    width: 500,
    height: 300,
  },
  {
    image: "/tracker.jpg",
    title: "Korzyści z Solar Trackera",
    description: "Solarny tracker dostosowuje pozycję paneli słonecznych do ścieżki słońca, maksymalizując przechwytywanie energii w ciągu dnia.",
    width: 500,
    height: 300,
  },
]

function Solar_benefits() {
  return (
    <>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {data.map((item, index) => (
            <div key={index} className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <Image alt="content" className="object-cover object-center h-full w-full" src={item.image} width={item.width} height={item.height} />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{item.title}</h2>
              <p className="text-base leading-relaxed mt-2">{item.description}</p>
              {/* <a className="text-indigo-500 inline-flex items-center mt-3">Wiecej informacji
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </section>
     
    </>
  )
}

export default Solar_benefits