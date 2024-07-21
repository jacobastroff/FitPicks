export function Button({ callback, children, className }) {
  return (
    <button onClick={callback} className={className}>
      {children}
    </button>
  );
}
