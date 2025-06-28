import './App.css'
import SupportFlow from './components/SupportFlow'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-start text-gray-900">InfinityKB</h1>
        </header>
        <SupportFlow />
      </div>
    </div>
  )
}

export default App
