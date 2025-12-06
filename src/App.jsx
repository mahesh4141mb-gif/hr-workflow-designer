import Canvas from './components/Canvas'
import { WorkflowProvider } from './context/WorkflowContext.jsx'

function App() {
  return (
    <WorkflowProvider>
      <Canvas />
    </WorkflowProvider>
  )
}

export default App
