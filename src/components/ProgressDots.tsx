export default function ProgressDots({
  current,
  total,
  color = "pink",
}: {
  current: number;
  total: number;
  color?: "pink" | "sky";
}) {
  const filled = color === "pink" ? "bg-pink-400" : "bg-sky-400";
  const empty = "bg-gray-200";

  return (
    <div className="flex items-center justify-center gap-2 py-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-full transition-all duration-300 ${
            i < current
              ? `${filled} scale-100`
              : i === current
                ? `${filled} scale-125 animate-pop`
                : `${empty} scale-100`
          }`}
        />
      ))}
    </div>
  );
}
