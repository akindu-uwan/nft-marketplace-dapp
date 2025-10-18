const PlaceholderArt = ({
  seed = 1
}: {
  seed?: number
}) => (
  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
    <div className="absolute inset-0 opacity-40" style={{
      backgroundImage:
        "radial-gradient(40% 40% at 30% 30%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%), radial-gradient(50% 50% at 70% 70%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
    }} />
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id={`g${seed}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopOpacity="1" stopColor="#22d3ee" />
          <stop offset="50%" stopOpacity="1" stopColor="#a78bfa" />
          <stop offset="100%" stopOpacity="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      <path fill={`url(#g${seed})`} d="M49.8,-70.7C63.2,-61.6,72.2,-47.6,78.1,-32.9C84.1,-18.2,87,-2.8,83.3,11.4C79.6,25.6,69.2,38.5,57.1,50.1C45,61.6,31.1,71.9,15.3,76.2C-0.6,80.4,-18.3,78.7,-33.2,71.8C-48.1,64.9,-60.2,52.8,-69.2,38.2C-78.2,23.5,-84.2,6.3,-82.8,-10.5C-81.4,-27.2,-72.6,-43.5,-59.8,-53.8C-47,-64.1,-30.2,-68.4,-13,-73.1C4.3,-77.8,21.7,-82.8,37.4,-79.7C43.7,-78.4,46.6,-75.5,49.8,-70.7Z" transform="translate(100 100)" />
    </svg>
  </div>
);

export default PlaceholderArt;