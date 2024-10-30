

export default function FeaturedRecipes(){
    return (
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Rezepte für Nora:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/images/menemen.jpg" alt="Menemen" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Menemen</h3>
              <p className="text-gray-600">Das beste aus Tomaten, Zwiebeln, Paprika und Eiern.</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4">
                Zum Rezept
              </button>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/images/pilav.jpg" alt="Pilav" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Türkischer Reis</h3>
              <p className="text-gray-600">Reis wird oft begleitet von noch mehr Essen - vielleicht Bohnen?.</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4">
                Zum Rezept
              </button>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/images/sütlac.jpg" alt="Sütlaç" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Türkischer Milchreis</h3>
              <p className="text-gray-600">Yumm.</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4">
                Zum Rezept
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };