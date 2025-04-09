const stores = [
    { name: 'Gamers Den', description: 'Your home for classics', details: 'Open 9AM–9PM', count: 120 },
    { name: 'Pixel Palace', description: 'All about retro', details: 'Indie + Retro zone', count: 80 },
  ]
  
  export default function StoreInfo() {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Our Stores</h1>
        {stores.map((store, i) => (
          <div key={i} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{store.name}</h2>
            <p>{store.description}</p>
            <p>{store.details} | Games: {store.count}</p>
          </div>
        ))}
      </div>
    )
  }
  