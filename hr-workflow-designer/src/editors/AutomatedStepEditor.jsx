import { useWorkflow } from '../hooks/useWorkflow'

const AutomatedStepEditor = ({ data = {}, updateData }) => {
  const { automations } = useWorkflow()

  const selectedAction =
    automations.find((a) => a.id === data.actionId) || automations[0]

  const handleActionChange = (e) => {
    const actionId = e.target.value
    updateData({ actionId, params: {} })
  }

  const handleParamChange = (param) => (e) => {
    updateData({ params: { ...data.params, [param]: e.target.value } })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={data.title || ''}
          onChange={(e) => updateData({ title: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Automation Action</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={data.actionId || ''}
          onChange={handleActionChange}
        >
          <option value="">Select action...</option>
          {automations.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>
      {selectedAction && selectedAction.params.length > 0 && (
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-2">Parameters</p>
          {selectedAction.params.map((param) => (
            <div key={param} className="mb-2">
              <label className="block text-xs capitalize">{param}</label>
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                value={data.params?.[param] || ''}
                onChange={handleParamChange(param)}
                placeholder={`Enter ${param}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AutomatedStepEditor
