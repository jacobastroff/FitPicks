import { Loading } from "./Loading";
import { ErrorModule } from "./ErrorModule";

export function WorkoutList({ isLoading, isError, data }) {
  return (
    <div className="workout-list">
      {isLoading && <Loading />}
      {isError && <ErrorModule>{isError}</ErrorModule>}
    </div>
  );
}
