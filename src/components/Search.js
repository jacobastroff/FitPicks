export function Search({ stateVar, callback }) {
  return (
    <div>
      <input
        className="search-input"
        value={stateVar}
        onChange={callback}
        placeholder="Type Specific Workout Name Here..."
      />
    </div>
  );
}
