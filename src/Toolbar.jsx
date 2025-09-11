import React from "react";

export default function Toolbar({ prompt, setPrompt, onRun, selected, setSelected }) {
  return (
    <div className="toolbar">
      <textarea
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows="4"
      />
      <div className="actions">
        <button onClick={onRun} className="primary">Run</button>
        <button onClick={() => alert("Judging...")} className="secondary">Judge</button>
      </div>
      <div className="model-selection">
        <h4>Select Models</h4>
        <div>
          {selected.map((id) => (
            <label key={id}>
              <input
                type="checkbox"
                checked
                onChange={() => {
                  setSelected((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
                }}
              />
              {`Model ${id + 1}`}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
