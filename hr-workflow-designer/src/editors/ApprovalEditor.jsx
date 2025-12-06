const ApprovalEditor = ({ data = {}, updateData }) => {
  const handleChange = (field) => (e) => {
    const value =
      field === 'autoApproveThreshold' ? Number(e.target.value) : e.target.value
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={data.title || ''}
          onChange={handleChange('title')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Approver Role</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={data.approverRole || 'Manager'}
          onChange={handleChange('approverRole')}
        >
          <option>Manager</option>
          <option>HRBP</option>
          <option>Director</option>
          <option>CEO</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">
          Auto-approve if amount ≤
        </label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          value={data.autoApproveThreshold || 0}
          onChange={handleChange('autoApproveThreshold')}
        />
      </div>
    </div>
  )
}

export default ApprovalEditor
