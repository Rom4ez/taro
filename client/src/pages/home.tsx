import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UserInputForm } from "@/components/tarot/UserInputForm";
import { CardDeck } from "@/components/tarot/CardDeck";
import { InterpretationSection } from "@/components/tarot/InterpretationSection";
import { Button } from "@/components/ui/button";
import { TarotReading, UserData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>("");
  const [showReading, setShowReading] = useState(false);
  const [reading, setReading] = useState<TarotReading | null>(null);

  const mutation = useMutation({
    mutationFn: async (userData: UserData) => {
      const res = await apiRequest("POST", "/api/tarot-reading", userData);
      const data = await res.json();
      return data as TarotReading;
    },
    onSuccess: (data) => {
      setReading(data);
      setShowReading(true);
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: "Не удалось получить прогноз. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
      console.error("Error:", error);
    },
  });

  const handleFormSubmit = (values: UserData) => {
    setUserName(values.name);
    mutation.mutate(values);
  };

  const handleReset = () => {
    setShowReading(false);
    setReading(null);
  };

  // Format current date in Russian
  const formattedDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#121212] to-[#2D2D2D] text-[#F5F5F5] font-sans relative overflow-x-hidden">
      {/* Stars background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/stars-background.svg')",
          backgroundSize: "cover",
        }}
      ></div>
      
      <div className="flex-grow z-10 relative">
        <Header />

        <main className="container mx-auto px-4 pb-20">
          {!showReading ? (
            <UserInputForm onSubmit={handleFormSubmit} isLoading={mutation.isPending} />
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-medium text-[#D4AF37] mb-4">
                  {userName}, ваш расклад на {formattedDate}
                </h2>
                <p className="text-lg text-gray-300 max-w-xl mx-auto">
                  Три карты раскрывают энергии дня: что влияет на вас, к чему стремиться и чего избегать.
                </p>
              </div>

              <CardDeck 
                cards={reading?.cards || []} 
                isLoading={mutation.isPending} 
              />
              
              <InterpretationSection 
                interpretation={reading?.interpretation || null} 
                isLoading={mutation.isPending}
              />

              <div className="text-center mt-12">
                <Button
                  onClick={handleReset}
                  className="py-3 px-6 bg-gradient-to-r from-[#3BAEA0] to-[#8A4FFF] text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  Новый расклад
                </Button>
              </div>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
