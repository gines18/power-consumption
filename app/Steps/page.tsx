import React from 'react'

function Steps() {
  const data = [
    {
      step: "Edukacja",
      title: "Zdobądź wiedzę na temat różnych rodzajów odnawialnych źródeł energii, takich jak energia słoneczna, wiatrowa czy geotermalna.",
      icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    },
    {
      step: "Ocena potrzeb",
      title: "Zidentyfikuj swoje potrzeby energetyczne i sprawdź, które źródła najlepiej pasują do Twojej sytuacji.",
      icon: "M22 12h-4l-3 9L9 3l-3 9H2"
    },
    {
      step: "Inwestycja",
      title: "Zainwestuj w odpowiednie technologie, takie jak panele słoneczne czy turbiny wiatrowe, aby rozpocząć produkcję własnej energii.",
      icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
    },
    {
      step: "Monitorowanie i dostosowanie",
      title: "Regularnie monitoruj efektywność systemu i dostosowuj go w miarę potrzeb, aby maksymalizować oszczędności i efektywność.",
      icon: "M22 11.08V12a10 10 0 11-5.93-9.14"
    },
    {
      step: "Korzyści",
      title: "Korzystanie z odnawialnych źródeł energii wymaga edukacji, oceny potrzeb, inwestycji oraz ciągłego monitorowania, co przyczynia się do oszczędności i zrównoważonego rozwoju.",
      icon: "M22 4L12 14.01l-3-3"
    }
  ];

  return (
   <>
   <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="flex flex-wrap w-full">
      <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
        {data.map((item, index) => (
          <div key={index} className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d={item.icon}></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">{item.step}</h2>
              <p className="leading-relaxed">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <img className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" src="solar_steps.jpg" alt="panele fotowoltaiczne"/>
    </div>
  </div>
</section>
   </>
  )
}

export default Steps