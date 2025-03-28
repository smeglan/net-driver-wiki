interface DigimonStatsProps {
  stats: {
    game: {
      hp: number;
      attack: number;
      defense: number;
      speed: number;
    };
    base: {
      hp: number;
      attack: number;
      defense: number;
      speed: number;
    };
  };
}

export default function DigimonStats({
  stats: { game, base },
}: DigimonStatsProps) {
  return (
    <div className="flex flex-col gap-4">
      {[
        {
          label: "HP",
          value: game.hp,
          valueBase: base.hp,
          color: "bg-red-500",
          icon: "❤️",
        },
        {
          label: "Attack",
          value: game.attack,
          valueBase: base.attack,
          color: "bg-yellow-500",
          icon: "⚔️",
        },
        {
          label: "Defense",
          value: game.defense,
          valueBase: base.defense,
          color: "bg-blue-500",
          icon: "🛡️",
        },
        {
          label: "Speed",
          value: game.speed,
          valueBase: base.speed,
          color: "bg-green-500",
          icon: "⚡",
        },
      ].map((stat) => (
        <div key={stat.label} className="flex items-center gap-2 p-2">
          <div className="flex flex-col items-center w-32">
            <span className="text-xs font-bold">{stat.icon}</span>
            <span className="text-xs font-bold">
              {stat.label.split("").join("\n")}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-800 rounded-lg overflow-hidden">
            <div
              className={`h-full ${stat.color} transition-all`}
              style={{ width: `${((stat.value * 100) / 5 / 100) * 100}%` }}
            ></div>
          </div>
          <div className="w-10 h-12 flex flex-col items-center justify-between border border-green-500 rounded-md">
            <span className="text-sm font-bold">{stat.value}</span>
            <div className="w-full border-t border-green-500"></div>
            <span className="text-xs">{stat.valueBase}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
