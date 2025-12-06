const EndEditor = ({ data = {}, updateData }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium">End Message</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={data.endMessage || ''}
          onChange={(e) => updateData({ endMessage: e.target.value })}
          placeholder="e.g. Onboarding completed successfully!"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="summary"
          checked={data.summaryFlag || false}
          onChange={(e) => updateData({ summaryFlag: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="summary">Generate summary report</label>
      </div>
    </div>
  )
}

export default EndEditor
