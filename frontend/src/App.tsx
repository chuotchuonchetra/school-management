import { Toaster } from "./components/ui/sonner"
import { AppRouter } from "./routes/AppRoute"

export function App() {
  return (
    <div>
      <AppRouter />
      <Toaster />
    </div>
  )
}

export default App
