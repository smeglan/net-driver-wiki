interface DigimonAttributesProps {
  type?: string;
  attribute?: string;
  stage?: string;
}

const AttributeBadge = ({ attribute }: { attribute: string }) => {
  const colors: Record<string, string> = {
    vaccine: "bg-green-500",
    virus: "bg-red-500",
    data: "bg-blue-500",
    free: "bg-yellow-500",
  };

  return (
    <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg">
      <span className={`badge ${colors[attribute] || "bg-gray-500"} text-black rounded-full px-3 py-1 shadow-md capitalize`}>
        {attribute}
      </span>
    </div>
  );
};

const StageBadge = ({ stage }: { stage: string }) => {
  const colors: Record<string, string> = {
    "baby 1": "bg-pink-500",
    "baby 2": "bg-purple-500",
    child: "bg-blue-500",
    adult: "bg-green-500",
    perfect: "bg-orange-500",
    "no-level": "bg-gray-500",
  };

  return (
    <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg">
      <span className={`badge ${colors[stage] || "bg-gray-500"} text-black rounded-full px-3 py-1 shadow-md capitalize`}>
        {stage}
      </span>
    </div>
  );
};

export default function DigimonAttributes({ type, attribute, stage }: DigimonAttributesProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {stage && (
        <div className="flex flex-col items-center bg-black/40 p-3 rounded-lg">
          <span className="text-xs text-gray-400">Etapa:</span>
          <StageBadge stage={stage} />
        </div>
      )}

      {attribute && (
        <div className="flex flex-col items-center bg-black/40 p-3 rounded-lg">
          <span className="text-xs text-gray-400">Atributo:</span>
          <AttributeBadge attribute={attribute} />
        </div>
      )}

      {type && (
        <div className="col-span-2 flex flex-col items-center bg-black/40 p-3 rounded-lg">
          <span className="text-xs text-gray-400">Tipo:</span>
          <span className="badge bg-white text-black rounded-full px-4 py-2 shadow-md capitalize">
            {type}
          </span>
        </div>
      )}
    </div>
  );
}
