import { useState, useEffect } from 'react'
import { getAutomations } from '../api/mockApi'
import { WorkflowContext } from './WorkflowContext'

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [automations, setAutomations] = useState([])
  const [simulationLogs, setSimulationLogs] = useState([])
  const [isSandboxOpen, setIsSandboxOpen] = useState(false)

  useEffect(() => {
    getAutomations().then(setAutomations)
  }, [])

  return (
    <WorkflowContext.Provider
      value={{
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
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}
