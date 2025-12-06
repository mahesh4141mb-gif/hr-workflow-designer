import React, { useCallback, useRef, useEffect } from 'react'
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { useWorkflow } from '../hooks/useWorkflow'
import { NODE_TYPES, nodeTypes } from '../types'
import Sidebar from './Sidebar'
import NodeEditor from './NodeEditor'
import SandboxModal from './SandboxModal'

const Canvas = () => {
  const reactFlowWrapper = useRef(null)
  const {
    nodes: contextNodes,
    setNodes: setContextNodes,
    edges: contextEdges,
    setEdges: setContextEdges,
    selectedNode,
    setSelectedNode,
    isSandboxOpen,
    setIsSandboxOpen,
  } = useWorkflow()

  const [nodes, setNodes, onNodesChange] = useNodesState(contextNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(contextEdges)

  useEffect(() => {
    setContextNodes(nodes)
  }, [nodes, setContextNodes])

  useEffect(() => {
    setContextEdges(edges)
  }, [edges, setContextEdges])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback(
    (_, node) => {
      const currentNode = nodes.find((n) => n.id === node.id) || node
      setSelectedNode(currentNode)
    },
    [setSelectedNode, nodes]
  )

  const onNodesDelete = useCallback(
    (nodesToDelete) => {
      const nodeIds = nodesToDelete.map((node) => node.id)
      setNodes((nds) => nds.filter((node) => !nodeIds.includes(node.id)))
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !nodeIds.includes(edge.source) && !nodeIds.includes(edge.target)
        )
      )
      if (selectedNode && nodeIds.includes(selectedNode.id)) {
        setSelectedNode(null)
      }
    },
    [setNodes, setEdges, selectedNode, setSelectedNode]
  )

  const onEdgesDelete = useCallback(
    (edgesToDelete) => {
      const edgeIds = edgesToDelete.map((edge) => edge.id)
      setEdges((eds) => eds.filter((edge) => !edgeIds.includes(edge.id)))
    },
    [setEdges]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type || !reactFlowWrapper.current) return

      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      }

      const newNode = {
        id: `${type}-${Date.now()}-${Math.random()}`,
        type,
        position: { x: position.x || 100, y: position.y || 100 }, // NEVER undefined
        data: {
          title:
            type === 'start'
              ? 'New Workflow Start'
              : type === 'end'
              ? 'End'
              : `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  const validateWorkflow = () => {
    const startNodes = nodes.filter((n) => n.type === 'start')
    const endNodes = nodes.filter((n) => n.type === 'end')

    if (startNodes.length === 0) return 'Missing Start Node'
    if (startNodes.length > 1) return 'Multiple Start Nodes (only one allowed)'
    if (endNodes.length === 0) return 'Missing End Node'

    const connectedNodeIds = new Set()
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source)
      connectedNodeIds.add(edge.target)
    })

    const disconnectedNodes = nodes.filter(
      (node) => !connectedNodeIds.has(node.id) && nodes.length > 1
    )

    if (disconnectedNodes.length > 0) {
      return `Disconnected nodes: ${disconnectedNodes
        .map((n) => n.data.title || n.type)
        .join(', ')}`
    }

    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsSandboxOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-2xl font-bold text-lg transition transform hover:scale-105"
          >
            Test Workflow
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          deleteKeyCode={['Backspace', 'Delete']}
        >
          <Background color="#e0e0e0" gap={20} />
          <Controls className="bg-white shadow-lg" />
        </ReactFlow>
      </div>

      {isSandboxOpen && <SandboxModal validateWorkflow={validateWorkflow} />}
      {selectedNode && <NodeEditor />}
    </div>
  )
}

export default Canvas
