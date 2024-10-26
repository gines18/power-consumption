import React from 'react'


export default function Stats() {
  return (
    <div className="bg-gray-50 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
           Odnawialne zródla energii w Polsce
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          Te statystyki pokazują, jak dynamicznie rozwija się sektor odnawialnych źródeł energii, co ma kluczowe znaczenie w walce ze zmianami klimatycznymi i dążeniu do zrównoważonego rozwoju.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Panele fotowoltaiczne</dt>
                  <dd className="order-1 text-5xl font-extrabold text-indigo-600">1 MLN</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Bankow energii</dt>
                  <dd className="order-1 text-5xl font-extrabold text-indigo-600">9 GW</dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Farmy fotowoltaiczne</dt>
                  <dd className="order-1 text-5xl font-extrabold text-indigo-600">3004</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
