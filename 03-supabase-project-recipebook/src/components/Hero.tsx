export default function Hero(){

    const imageUrl = "public/assets/background.jpeg"

    return(
        <div>
            <div className="bg-cover bg-center h-64" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${imageUrl})` }}>
            <div className="container mx-auto h-full flex flex-col justify-center items-center text-white">
                <h1 className="text-4xl text-center font-bold mb-4">Nie mehr Tolga nach Rezepten fragen, ist das nicht toll? </h1>
                <p className="text-lg text-center">Koche mit leidenschaft und erlebe unvergessliche WG Momente einsam an deinem Herd, du Loser.</p>
            </div>
            </div>
        </div>
    )
}