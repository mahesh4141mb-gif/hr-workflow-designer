import { Handle, Position } from 'reactflow'

const AutomatedStepNode = ({ data }) => (
  <div className="bg-orange-100 border-2 border-orange-600 rounded-lg px-6 py-4 text-center">
    <Handle type="target" position={Position.Left} />
    <div className="font-semibold text-orange-900">Automated</div>
    <div className="text-sm">{data.title || 'System Action'}</div>
    <Handle type="source" position={Position.Right} />
  </div>
)
export default AutomatedStepNode
