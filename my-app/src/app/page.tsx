import ProductList from '../components/ProductList'
import InteractiveVideoPlayer from '../components/InteractiveVideoPlayer'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary animate-fade-in-down">Welcome to Infoware</h1>
      <section className="mb-12 animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Featured Video</h2>
        <InteractiveVideoPlayer />
      </section>
      <section className="animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Our Exclusive Collection</h2>
        <ProductList />
      </section>
    </main>
  )
}

