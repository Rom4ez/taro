export function Header() {
  return (
    <header className="text-center py-8 px-4">
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-[#D4AF37] to-[#F5F5F5] bg-clip-text text-transparent">
          Мистический
        </span>{" "}
        Таро
      </h1>
      <p className="text-xl text-gray-300 font-serif italic">
        Ваш персональный ежедневный прогноз
      </p>
    </header>
  );
}
