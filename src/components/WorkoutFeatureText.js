import { WeightEmoji } from "./WeightEmoji";

export function WorkoutFeatureText({ children }) {
  return (
    <li className="icon-list-item">
      <WeightEmoji className="weight-emoji-feature" />
      <span className="workout-feature-text">{children}</span>
    </li>
  );
}
