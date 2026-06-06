import { Fragment } from "react";

type Props = {
  text: string;
  className?: string;
  trigger?: "view" | "mount";
  delay?: number;
  stagger?: number;
};

// Word-by-word rise via pure CSS animation. Plays on render and always ends
// visible (animation-fill-mode: both). No observer and no framer, so text can
// never get stuck hidden.
export default function Words({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
}: Props) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="word-mask">
              <span
                className="word-rise"
                style={{ animationDelay: `${(delay + i * stagger).toFixed(2)}s` }}
              >
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
