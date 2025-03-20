import path from "path";
import fs from "fs";
import { Card, Interpretation } from "../../client/src/lib/types";

// Tarot card definitions
export const tarotCards: Card[] = [
  { id: "0", name: "Шут", image: "Карта Дурак.jpg" },
  { id: "1", name: "Маг", image: "Карта Волшебник.jpg" },
  { id: "2", name: "Верховная Жрица", image: "Карта Верховная Жрица.jpg" },
  { id: "3", name: "Императрица", image: "Карта Императрица.jpg" },
  { id: "4", name: "Император", image: "Карта Император.jpg" },
  { id: "5", name: "Иерофант", image: "Карта Иерофант.jpg" },
  { id: "6", name: "Влюбленные", image: "Карта Влюбленные.jpg" },
  { id: "7", name: "Колесница", image: "Карта Колесница.jpg" },
  { id: "8", name: "Сила", image: "Карта Сила.jpg" },
  { id: "9", name: "Отшельник", image: "Карта Отшельник.jpg" },
  { id: "10", name: "Колесо Фортуны", image: "Карта Колесо фортуны.jpg" },
  { id: "11", name: "Справедливость", image: "Карта Правосудие.jpg" },
  { id: "12", name: "Повешенный", image: "Карта Повешенный Человек.jpg" },
  { id: "13", name: "Смерть", image: "Карта Смерть.jpg" },
  { id: "14", name: "Умеренность", image: "Карта Воздержанность.jpg" },
  { id: "15", name: "Дьявол", image: "Карта Дьявол.jpg" },
  { id: "16", name: "Башня", image: "Карта Башня.jpg" },
  { id: "17", name: "Звезда", image: "Карта Звезда.jpg" },
  { id: "18", name: "Луна", image: "Карта Луна.jpg" },
  { id: "19", name: "Солнце", image: "Карта Солнце.jpg" },
  { id: "20", name: "Суд", image: "Карта Суд.jpg" },
  { id: "21", name: "Мир", image: "Карта Мир.jpg" }
];

class TarotService {
  getRandomCards(count: number): Card[] {
    const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getCardImagePath(filename: string): string | null {
    // Check if the filename exists in our tarot cards
    const card = tarotCards.find(c => c.image === filename);
    if (!card) return null;
    
    // In a real app, this would point to where your tarot images are stored
    // For this example, we'll assume images are in a 'tarot-img' folder in the project root
    const imagePath = path.join(process.cwd(), "tarot-img", filename);
    
    // Check if the file exists
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
    
    // If the real image doesn't exist, return a fallback image
    return path.join(process.cwd(), "public", "images", "card-back.svg");
  }

  parseInterpretation(text: string): Interpretation {
    try {
      // Default values in case parsing fails
      let interpretation: Interpretation = {
        mainEnergy: "Сегодня день полон возможностей и неожиданных поворотов.",
        whatHelps: "Доверяйте своей интуиции и будьте открыты новым идеям.",
        whatToAvoid: "Избегайте поспешных решений и необдуманных действий.",
        recommendations: [
          "Уделите время саморефлексии",
          "Будьте внимательны к деталям",
          "Доверяйте своему внутреннему голосу",
          "Проявите заботу о близких",
          "Избегайте конфликтов и стрессовых ситуаций"
        ]
      };

      // Extract the main energy section
      const mainEnergyMatch = text.match(/ОСНОВНАЯ_ЭНЕРГИЯ:(.+?)(?=ЧТО_ПОМОЖЕТ:|$)/s);
      if (mainEnergyMatch && mainEnergyMatch[1]) {
        interpretation.mainEnergy = mainEnergyMatch[1].trim();
      }

      // Extract what helps section
      const whatHelpsMatch = text.match(/ЧТО_ПОМОЖЕТ:(.+?)(?=ЧЕГО_ИЗБЕГАТЬ:|$)/s);
      if (whatHelpsMatch && whatHelpsMatch[1]) {
        interpretation.whatHelps = whatHelpsMatch[1].trim();
      }

      // Extract what to avoid section
      const whatToAvoidMatch = text.match(/ЧЕГО_ИЗБЕГАТЬ:(.+?)(?=РЕКОМЕНДАЦИИ:|$)/s);
      if (whatToAvoidMatch && whatToAvoidMatch[1]) {
        interpretation.whatToAvoid = whatToAvoidMatch[1].trim();
      }

      // Extract recommendations
      const recommendationsMatch = text.match(/РЕКОМЕНДАЦИИ:(.+?)(?=$)/s);
      if (recommendationsMatch && recommendationsMatch[1]) {
        const recommendationsText = recommendationsMatch[1].trim();
        const recommendationsList = recommendationsText
          .split("\n")
          .map(rec => rec.trim().replace(/^-\s*/, ""))
          .filter(rec => rec.length > 0);
        
        if (recommendationsList.length > 0) {
          interpretation.recommendations = recommendationsList;
        }
      }

      return interpretation;
    } catch (error) {
      console.error("Error parsing interpretation:", error);
      // Return default values if parsing fails
      return {
        mainEnergy: "Сегодня энергии дня направлены на самопознание и внутренний рост.",
        whatHelps: "Медитация и спокойное размышление принесут вам ясность.",
        whatToAvoid: "Избегайте спешки и импульсивных решений.",
        recommendations: [
          "Найдите время для себя",
          "Прислушайтесь к своей интуиции",
          "Будьте гибкими в планах",
          "Уделите внимание близким",
          "Практикуйте благодарность"
        ]
      };
    }
  }
}

export const tarotService = new TarotService();
