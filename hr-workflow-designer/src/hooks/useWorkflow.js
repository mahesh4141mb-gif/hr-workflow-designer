import { useContext, useEffect } from 'react'
import { WorkflowContext } from '../context/WorkflowContext'
import { getAutomations } from '../api/mockApi'

export const useWorkflow = () => {
  const context = useContext(WorkflowContext)

  if (!context) {
    throw new Error('useWorkflow must be used within WorkflowProvider')
  }

  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNode,
    setSelectedNode,
    automations,
    setAutomations,
    simulationLogs,
    setSimulationLogs,
    isSandboxOpen,
    setIsSandboxOpen,
  } = context

  useEffect(() => {
    getAutomations().then(setAutomations)
  }, [])

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNode,
    setSelectedNode,
    automations,
    setAutomations,
    simulationLogs,
    setSimulationLogs,
    isSandboxOpen,
    setIsSandboxOpen,
  }
}
