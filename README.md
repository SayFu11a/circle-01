# Historical Dates Block

## Быстрый старт

# 1. Клонируйте репозитарий

git clone https://github.com/SayFu11a/circle-01.git
cd circle-01

# 2. Установите зависимости:

npm install

# 3. Запустите DEV сервер:

npm run dev

# 4. Собрать production‑версию:

npm run build

---

## Окружение

node -v: v22.13.1
npm -v: 11.1.0
Рекомендуется Node.js 18+.

## Перечень технологий:

- React 18
- TypeScript
- SCSS (CSS Modules)
- GSAP 3
- Swiper 12
- Webpack 5

react-typescript-webpack-starter/
├─ src/
│ ├─ assets/ # ассеты проекта (шрифты, картинки, глобальные стили и т.п.)
│ │ ├─ fonts/
│ │ ├─ images/
│ │ └─ stylesheets/
│ │ └─ app.scss # пример глобального файла стилей
│ ├─ components/
│ │ └─ HistoricalDatesBlock/ # наш независимый блок
│ │ ├─ components/ # атомарные/вспомогательные компоненты блока
│ │ │ ├─ CircleSvg.tsx # SVG-круг, точки, ховер-маркер, подписи у активной точки
│ │ │ ├─ DatesDisplay.tsx # отображение лет (start/end)
│ │ │ ├─ EventsSlider.tsx # слайдер событий (Swiper)
│ │ │ └─ Nav.tsx # навигация: счетчик и кнопки prev/next
│ │ ├─ data/
│ │ │ └─ timeSlices.mock.ts # пример данных для блока (мок)
│ │ ├─ hooks/
│ │ │ └─ useYearsAnimation.ts # анимация чисел лет через GSAP Timeline
│ │ ├─ utils/
│ │ │ ├─ fade.ts # fade-анимация подписей активной/следующей точки
│ │ │ └─ geometry.ts # расчеты геометрии (координаты точек на окружности)
│ │ ├─ constants.ts # константы: радиусы, длительности анимаций, отступы
│ │ ├─ HistoricalDatesBlock.tsx # главный компонент: логика переключений/поворота/состояние
│ │ ├─ index.tsx # точка входа: экспорт компонента
│ │ ├─ styles.module.scss # стили блока (SCSS модули)
│ │ └─ types.ts # типы данных (TimeSlice, TimeEvent, пропсы)
│ ├─ App.ts # пример использования блока в приложении
│ ├─ global.d.ts # типизация импортов для SCSS-модулей и др.
│ ├─ index.html # html-шаблон
│ └─ Main.tsx # входная точка React-приложения
├─ webpack.config.development.js # конфиг dev-сборки
├─ webpack.config.production.js # конфиг prod-сборки
├─ tsconfig.json # конфиг TypeScript
├─ package.json
├─ README.md
└─ ...
