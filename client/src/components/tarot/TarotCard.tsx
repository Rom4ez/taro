import { Card } from "@/lib/types";

interface TarotCardProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
}

export function TarotCard({ card, isFlipped, onFlip }: TarotCardProps) {
  return (
    <div
      className={`card-container perspective-1000 ${isFlipped ? "cursor-default" : "cursor-pointer"}`}
      onClick={!isFlipped ? onFlip : undefined}
    >
      <div
        className={`relative transition-transform duration-800 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Front */}
        <div
          className={`backface-hidden ${
            isFlipped ? "opacity-0" : "opacity-100"
          } transition-opacity duration-800`}
        >
          <div className="aspect-[2/3] rounded-xl flex items-center justify-center bg-gradient-to-br from-[#8A4FFF]/10 to-[#4A154B]/20 border-2 border-[#D4AF37]/50 shadow-[0_0_15px_rgba(138,79,255,0.5)]">
            <div className="text-center">
              <i className="ri-sparkling-2-fill text-5xl text-[#D4AF37] mb-2"></i>
              <p className="font-serif text-lg">Нажмите, чтобы открыть</p>
            </div>
          </div>
        </div>

        {/* Card Back */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 ${
            isFlipped ? "opacity-100" : "opacity-0"
          } transition-opacity duration-800`}
        >
          <div className="h-full">
            <img
              src={`/api/card-image/${card.image}`}
              alt={card.name}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 w-full p-3 bg-black bg-opacity-70 rounded-b-xl">
              <h3 className="font-serif text-lg font-medium text-[#D4AF37]">{card.name}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
