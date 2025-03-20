import { Interpretation } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

interface InterpretationSectionProps {
  interpretation: Interpretation | null;
  isLoading: boolean;
}

export function InterpretationSection({
  interpretation,
  isLoading,
}: InterpretationSectionProps) {
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto bg-black bg-opacity-50 p-6 md:p-8 rounded-lg shadow-[0_0_15px_rgba(138,79,255,0.5)]">
        <h3 className="text-2xl font-serif font-medium text-[#D4AF37] mb-6">
          Толкование вашего расклада
        </h3>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-20 bg-gray-800/50 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!interpretation) return null;

  return (
    <div className="max-w-3xl mx-auto bg-black bg-opacity-50 p-6 md:p-8 rounded-lg shadow-[0_0_15px_rgba(138,79,255,0.5)]">
      <h3 className="text-2xl font-serif font-medium text-[#D4AF37] mb-6">
        Толкование вашего расклада
      </h3>

      <div className="space-y-6 text-lg">
        <div className="space-y-2">
          <h4 className="text-xl font-serif text-[#3BAEA0]">Основная энергия дня</h4>
          <p>{interpretation.mainEnergy}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-serif text-[#3BAEA0]">Что принесет пользу</h4>
          <p>{interpretation.whatHelps}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-serif text-[#3BAEA0]">Чего следует избегать</h4>
          <p>{interpretation.whatToAvoid}</p>
        </div>

        <div className="pt-4">
          <Separator className="mb-4 bg-[#8A4FFF]/30" />
          <h4 className="text-xl font-serif text-[#D4AF37] mb-2">Рекомендации на день</h4>
          <ul className="list-disc pl-5 space-y-2">
            {interpretation.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
