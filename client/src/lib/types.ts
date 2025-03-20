export interface Card {
  id: string;
  name: string;
  image: string;
}

export interface Interpretation {
  mainEnergy: string;
  whatHelps: string;
  whatToAvoid: string;
  recommendations: string[];
}

export interface TarotReading {
  cards: Card[];
  interpretation: Interpretation;
}

export interface UserData {
  name: string;
  birthdate: string;
}
