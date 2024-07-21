import { WeightEmoji } from "./WeightEmoji";

export function SavedWorkoutsHeader() {
  return (
    <div className="workout-details-heading">
      <WeightEmoji className={"weight-emoji-heading"} />
      <h2 className="saved-workouts-title">Saved Workouts</h2>
      <WeightEmoji className={"weight-emoji-heading"} />
    </div>
  );
}
