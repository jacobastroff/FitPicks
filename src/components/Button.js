export function Button({ callback, children }) {
  return (
    <button onClick={callback} className="button">
      {children}
    </button>
  );
}
