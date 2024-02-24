# Dokumentacja Projektu BudgetBuddy 

## Opis Projektu

FlaskApp to aplikacja webowa napisana w oparciu o framework Flask w języku Python. Projekt ma na celu zarządzanie wydarzeniami użytkowników, umożliwiając im dodawanie, edytowanie i przeglądanie własnych wydarzeń. Dodatkowo, aplikacja posiada mechanizm uwierzytelniania użytkowników.

## Technologie

- Flask
- SQLAlchemy
- Flask-CORS
- Flask-Login
- Werkzeug
- Flask-Talisman
- Python-dotenv

## Struktura Projektu


## Opis Plików

- **models.py**: Plik zawierający definicje klas modeli danych aplikacji.

## Opis Klas Modeli

### Klasa `User`

Reprezentuje użytkownika aplikacji. Posiada następujące pola:
- `id`: Unikalny identyfikator użytkownika.
- `username`: Nazwa użytkownika, unikalna, niepusta.
- `password_hash`: Skrócony, bezpieczny zapis hasła użytkownika.

### Funkcja `load_user`

Funkcja używana przez Flask-Login do ładowania użytkownika na podstawie jego identyfikatora. 

### Klasa `Event`

Reprezentuje wydarzenie w aplikacji. Posiada następujące pola:
- `id`: Unikalny identyfikator wydarzenia.
- `description`: Opis wydarzenia, niepusty.
- `created_at`: Data i czas utworzenia wydarzenia, domyślnie ustawiona na aktualną datę i czas.
- `user_id`: Klucz obcy do użytkownika, który utworzył to wydarzenie.
- `user`: Relacja z użytkownikiem, do którego przypisane jest wydarzenie.

## Baza Danych

Aplikacja wykorzystuje bazę danych PostgreSQL do przechowywania danych. Konfiguracja połączenia oraz inne ustawienia związane z bazą danych są przechowywane w obiekcie aplikacji Flask.

### Konfiguracja Bazy Danych

Aby połączyć się z bazą danych, aplikacja używa zmiennej środowiskowej do przechowywania danych uwierzytelniających, takich jak nazwa użytkownika, hasło, adres hosta oraz nazwa bazy danych. Konfiguracja bazy danych jest ustawiana w pliku `.env`, a następnie odczytywana i używana przez aplikację.

### Ustawienia Aplikacji

- `SQLALCHEMY_DATABASE_URI`: Adres URI bazy danych PostgreSQL, zbudowany na podstawie zmiennych środowiskowych.
- `SECRET_KEY`: Klucz tajny aplikacji, wykorzystywany do zabezpieczenia sesji i innych danych.

### Inne Ustawienia

- `CORS`: Konfiguracja obsługi żądań międzydomenowych (CORS), umożliwiająca komunikację z zewnętrznymi zasobami.
- `LoginManager`: Konfiguracja mechanizmu uwierzytelniania użytkowników, który umożliwia zarządzanie sesjami użytkowników i zabezpieczenia dostępu do poszczególnych części aplikacji.


