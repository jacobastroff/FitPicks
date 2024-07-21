export function ListHeader({ numResults }) {
  return (
    <p className="list-header">
      Found {numResults} result{numResults > 1 ? "s" : ""}
    </p>
  );
}
