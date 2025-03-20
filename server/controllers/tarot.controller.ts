import { Request, Response } from "express";
import { tarotService } from "../services/tarot.service";
import { deepseekService } from "../services/deepseek.service";
import { UserData } from "../../shared/schema";
// Импортируем определение карт Таро
import { tarotCards } from "../services/tarot.service";

export const getTarotReading = async (req: Request, res: Response) => {
  try {
    const { name, birthdate } = req.body as UserData;

    // Validate input
    if (!name || !birthdate) {
      return res.status(400).json({ message: "Имя и дата рождения обязательны" });
    }

    // Get three random cards
    const cards = tarotService.getRandomCards(3);

    // Format cards for AI prompt
    const cardsForPrompt = cards.map((card) => card.name).join(", ");

    // Generate interpretation using DeepSeek AI
    const interpretationText = await deepseekService.generateTarotInterpretation(
      name,
      birthdate,
      cardsForPrompt
    );

    // Parse the interpretation
    const parsedInterpretation = tarotService.parseInterpretation(interpretationText);

    return res.status(200).json({
      cards,
      interpretation: parsedInterpretation,
    });
  } catch (error) {
    console.error("Error in tarot reading generation:", error);
    return res.status(500).json({
      message: "Произошла ошибка при создании расклада",
    });
  }
};

export const getCardImage = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    
    // Поиск карты по старым названиям файлов
    const cardOldFilename = tarotCards.find((c: {image: string}) => c.image.toLowerCase() === filename.toLowerCase());
    let imagePath = null;
    
    if (cardOldFilename) {
      // Если запрашивается файл по старому имени, используем новое имя для поиска
      imagePath = tarotService.getCardImagePath(cardOldFilename.image);
    } else {
      // Поиск карты напрямую (если запрос уже содержит новое имя файла)
      imagePath = tarotService.getCardImagePath(filename);
    }
    
    if (!imagePath) {
      return res.status(404).json({ message: "Изображение не найдено" });
    }
    
    return res.sendFile(imagePath);
  } catch (error) {
    console.error("Error serving card image:", error);
    return res.status(500).json({
      message: "Произошла ошибка при загрузке изображения карты",
    });
  }
};
