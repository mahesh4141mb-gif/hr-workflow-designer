import { Handle, Position } from 'reactflow'

const StartNode = ({ data }) => (
  <div className="bg-emerald-100 border-2 border-emerald-600 rounded-lg px-6 py-4 text-center font-semibold">
    <div className="text-emerald-800">Start</div>
    <div className="text-sm mt-1">{data.title || 'Workflow Start'}</div>
    <Handle type="source" position={Position.Right} />
  </div>
)
export default StartNode
