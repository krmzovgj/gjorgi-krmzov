// Hand-drawn accents, same family as the hero wave. Ink-colored via
// currentColor, decorative only.

// Curly arrow, head pointing up-left, tail swirling in from bottom-right.
export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 146 142"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65.4481 61.0621C63.6352 60.9762 61.7916 61.066 59.9187 61.3523C53.3463 62.3559 48.6768 68.284 47.143 74.7959C45.6094 81.3051 47.2449 88.2642 52.6353 91.2264C55.7172 92.9207 58.4662 93.2911 60.8513 92.8132C63.2236 92.3372 65.2709 90.9971 66.9378 89.1127C71.5813 83.8586 73.2542 74.2768 71.8829 69.7799C71.2472 67.7001 70.4421 65.6573 69.492 63.6581C76.6955 65.1932 83.2583 69.719 89.0198 75.5828C101.542 88.3265 110.24 107.471 113.158 117.789C113.315 118.344 113.983 118.686 114.65 118.555C115.317 118.425 115.731 117.87 115.574 117.316C112.598 106.793 103.712 87.2751 90.9416 74.2794C84.3455 67.5657 76.6991 62.6083 68.3237 61.346C60.3893 46.5794 44.7906 33.9182 31.6769 23.1065C31.1932 22.705 30.4052 22.7082 29.922 23.1128C29.4419 23.5175 29.4428 24.1698 29.9295 24.5715C42.5065 34.942 57.4912 47.0011 65.4481 61.0621ZM66.599 63.2087C64.5697 63.011 62.4883 63.0556 60.3641 63.3818C54.6757 64.2496 50.9035 69.555 49.576 75.1921C48.7639 78.6475 48.8833 82.2568 50.1553 85.1566C50.954 86.98 52.2071 88.5172 54.0059 89.5047C56.3653 90.8017 58.4457 91.1745 60.269 90.8071C62.1048 90.4404 63.6473 89.352 64.936 87.8914C69.1695 83.1035 70.7253 74.3811 69.4765 70.2879C68.7406 67.8735 67.7677 65.5155 66.599 63.2087Z"
        fill="currentColor"
      />
      <path
        d="M30.54 23.7676L28.1159 43.9668"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M30.7167 23.2047L48.0653 29.4001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Three radiating emphasis lines, bursting toward the top-right.
export function DoodleSpark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 54 43"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.72174 14.0624C5.16996 10.1913 5.97154 6.12186 6.71328 2.17337C6.86954 1.32284 6.18394 0.51393 5.18261 0.429707C4.18259 0.284505 3.24383 0.873207 3.08962 1.66277C2.3747 5.48986 1.61465 9.43757 0.221706 13.1269C-0.0799353 13.9131 0.457641 14.78 1.4235 15.0465C2.38862 15.3129 3.41937 14.8486 3.72174 14.0624Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0015 26.3268C29.9216 20.2263 36.8759 13.3103 44.9988 7.33649C45.7565 6.80496 45.8289 5.83047 45.1591 5.20483C44.4887 4.57919 43.3289 4.49153 42.5691 5.08402C34.4235 11.0573 27.4472 17.9728 19.5043 24.0727C18.7621 24.6656 18.7191 25.6406 19.4087 26.2667C20.0995 26.8318 21.2593 26.9197 22.0015 26.3268Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.261 38.7787C46.8423 38.8593 42.4237 38.9396 38.0043 39.0202C36.9936 38.9967 36.1886 39.7106 36.2091 40.5652C36.2304 41.4198 37.0703 42.0491 38.0817 42.0725C42.5077 41.9921 46.9329 41.912 51.3582 41.8315C52.3709 41.794 53.1708 41.0803 53.1444 40.2255C53.116 39.4317 52.273 38.7412 51.261 38.7787Z"
        fill="currentColor"
      />
    </svg>
  );
}

// A single confident underline stroke, drawn slightly off level so it reads
// by hand rather than by rule. Used under the price.
export function DoodleUnderline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 9.5C34 4.8 71 3.4 108 4.2C139 4.9 170 6.7 197 5.1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        // The box is stretched to the width of whatever it underlines, which
        // would squash the stroke with it. This keeps the line an even weight
        // at any scale.
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
