# Pogodynka (System Monitorowania IoT)

## Opis projektu
System do monitorowania urządzeń IoT składający się z aplikacji webowej (frontend) i serwera (backend). Aplikacja symulujemonitorowanie, wizualizację i zarządzanie danymi z urządzeń IoT.

## Funkcjonalności

### System autoryzacji
- Logowanie użytkowników
- Rejestracja nowych użytkowników
- Zabezpieczenie dostępu do danych poprzez tokeny
- Sprawdzanie danych wejściowych przy logowaniu i rejestracji

### Panel główny (Dashboard)
- Wyświetlanie aktualnego stanu wszystkich urządzeń
- Porównanie obecnych odczytów z poprzednimi
- Interaktywne wykresy pokazujące trendy w czasie
- Możliwość filtrowania danych według identyfikatora urządzenia

### Zarządzanie danymi
- Dodawanie nowych pomiarów z urządzeń
- Przechowywanie historii pomiarów
- Automatyczne sortowanie danych według identyfikatorów urządzeń
- Obsługa wielu urządzeń jednocześnie

## Technologie

### Backend
- Node.js z TypeScript
- Express.js jako framework aplikacji
- MongoDB do przechowywania danych
- System autoryzacji oparty na JWT
- Architektura REST API
- Middleware do logowania żądań i autoryzacji
- Modułowa struktura kodu z podziałem na kontrolery, serwisy i modele

### Frontend
- React z TypeScript
- Vite jako narzędzie buildowania
- Material-UI do interfejsu użytkownika
- Axios do komunikacji z API
- React Router do nawigacji
- Komponenty do wizualizacji danych i wykresów

## Struktura projektu

### Backend (IoT-back)
```
lib/
├── controllers/          # Kontrolery obsługujące żądania HTTP
├── middlewares/         # Middleware autoryzacji i logowania
├── modules/
│   ├── models/         # Modele danych
│   ├── schemas/        # Schematy bazy danych
│   └── services/       # Logika biznesowa
└── utils/              # Funkcje pomocnicze
```

### Frontend (IoT-front)
```
src/
├── components/          # Komponenty React
│   ├── shared/         # Komponenty współdzielone
│   └── ...            # Komponenty funkcjonalne
├── models/             # Interfejsy TypeScript
└── utils/             # Funkcje pomocnicze
```

## Instalacja i uruchomienie

1. Instalacja zależności backendu:
```bash
cd IoT-back
npm install
```

2. Instalacja zależności frontendu:
```bash
cd IoT-front
npm install
```

3. Konfiguracja zmiennych środowiskowych:
Utworzenie plików .env w katalogach backend i frontend z odpowiednimi zmiennymi:

Backend:
```
PORT=port_serwera
MONGODB_URI=adres_bazy_danych
JWT_SECRET=sekretny_klucz
```

Frontend:
```
VITE_API_URL=adres_backendu
```

4. Uruchomienie backendu:
```bash
cd IoT-back
npm run dev
```

5. Uruchomienie frontendu:
```bash
cd IoT-front
npm run dev
```

## Wymagania systemowe
- Node.js (wersja 14 lub wyższa)
- MongoDB
- NPM lub Yarn
