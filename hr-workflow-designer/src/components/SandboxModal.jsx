import { useWorkflow } from '../hooks/useWorkflow'
import { simulateWorkflow } from '../api/mockApi'

const SandboxModal = ({ validateWorkflow }) => {
  const { nodes, edges, simulationLogs, setSimulationLogs, setIsSandboxOpen } =
    useWorkflow()

  const runSimulation = async () => {
    const error = validateWorkflow()
    if (error) {
      setSimulationLogs([`Error: ${error}`])
      return
    }
    const workflow = { nodes, edges }
    const logs = await simulateWorkflow(workflow)
    setSimulationLogs(logs)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-screen">
        <h2 className="text-xl font-bold mb-4">Workflow Sandbox</h2>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded mb-4 transition"
          onClick={runSimulation}
        >
          Run Simulation
        </button>

        <div className="bg-gray-50 border rounded p-3 h-48 overflow-y-auto font-mono text-sm">
          {simulationLogs.length === 0 ? (
            <p className="text-gray-500 italic">
              Click "Run Simulation" to see logs...
            </p>
          ) : (
            simulationLogs.map((log, i) => (
              <p
                key={i}
                className={log.startsWith('Error') ? 'text-red-600' : ''}
              >
                {i + 1}. {log}
              </p>
            ))
          )}
        </div>

        <button
          className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition"
          onClick={() => setIsSandboxOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default SandboxModal
