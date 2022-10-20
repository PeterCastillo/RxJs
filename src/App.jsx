import Search from "./components/Search"
import { ProkemonProvider } from "./store"

function App() {

  return (
    <ProkemonProvider>
      <div className="App">
        <Search/>
      </div>
    </ProkemonProvider>
  )
}

export default App
