import { useState } from "react";
import { TarotCard } from "./TarotCard";
import { Card } from "@/lib/types";

interface CardDeckProps {
  cards: Card[];
  isLoading: boolean;
}

export function CardDeck({ cards, isLoading }: CardDeckProps) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {isLoading
        ? Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="aspect-[2/3] rounded-xl bg-gradient-to-br from-[#8A4FFF]/10 to-[#4A154B]/20 border-2 border-[#D4AF37]/50 shadow-[0_0_15px_rgba(138,79,255,0.5)] animate-pulse"
              ></div>
            ))
        : cards.map((card, index) => (
            <TarotCard
              key={index}
              card={card}
              isFlipped={!!flippedCards[index]}
              onFlip={() => handleFlip(index)}
            />
          ))}
    </div>
  );
}
