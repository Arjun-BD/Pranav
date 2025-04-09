const games = [
    { name: 'Halo', price: 59.99, stock: 5 },
    { name: 'Minecraft', price: 29.99, stock: 10 },
  ]
  
  export default function GameList() {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Available Games</h1>
        {games.map((game, i) => (
          <div key={i} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{game.name}</h2>
            <p>${game.price} | Stock: {game.stock}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    )
  }
  