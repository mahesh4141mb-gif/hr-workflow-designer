import { useWorkflow } from '../hooks/useWorkflow'
import StartEditor from '../editors/StartEditor'
import TaskEditor from '../editors/TaskEditor'
import ApprovalEditor from '../editors/ApprovalEditor'
import AutomatedStepEditor from '../editors/AutomatedStepEditor'
import EndEditor from '../editors/EndEditor'

const editorComponents = {
  start: StartEditor,
  task: TaskEditor,
  approval: ApprovalEditor,
  automated: AutomatedStepEditor,
  end: EndEditor,
}

const NodeEditor = () => {
  const { selectedNode, setSelectedNode, setNodes, nodes } = useWorkflow()

  if (!selectedNode) return null

  const EditorComponent = editorComponents[selectedNode.type]

  if (!EditorComponent) {
    return (
      <div className="w-80 bg-white p-4 border-l">
        <p className="text-red-600">Unknown node type: {selectedNode.type}</p>
        <button onClick={() => setSelectedNode(null)}>Close</button>
      </div>
    )
  }

  const updateNodeData = (newData) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNode.id) {
        const updatedNode = {
          ...node,
          data: {
            ...node.data,
            ...newData,
          },
        }
        setSelectedNode(updatedNode)
        return updatedNode
      }
      return node
    })
    setNodes(updatedNodes)
  }

  return (
    <div className="w-80 bg-white shadow-2xl border-l border-gray-200 h-full overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4 z-10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Edit Node</h2>
        <button
          onClick={() => setSelectedNode(null)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <div className="p-6">
        <EditorComponent
          data={selectedNode.data || {}}
          updateData={updateNodeData}
        />
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4">
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition shadow-lg"
          onClick={() => setSelectedNode(null)}
        >
          Close Editor
        </button>
      </div>
    </div>
  )
}

export default NodeEditor
