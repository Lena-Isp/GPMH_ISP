# Media page: мультивыбор чипов-фильтров + API-формат запроса

## Что сделано

### 1. Интерактивные чипы (`app/components/elements/Chips.vue`)
- Чипы стали кнопками с мультивыбором (toggle), визуальное состояние `active`.
- Событие `change` отдаёт список выбранных значений группы.

### 2. Модалка фильтров (`app/components/widgets/FilterModal.vue`)
- Локальный «черновик» выбранных фильтров — применение только по кнопке, а не на каждый клик.
- Кнопка применения со счётчиком выбранных чипов, сброс черновика при закрытии.

### 3. Стор (`app/stores/news.js`)
- `activeFilters` + `setFilters()` / `applyFilters()` со сбросом пагинации.
- `buildFilterQuery()` собирает параметры в формате API:
  `filter[partner_id][0]=1043&filter[partner_id][1]=4&page=1&per_page=6`
- Соответствие групп модалки → параметров API: `FILTER_PARAM_MAP`
  (`assets→partner_id`, `tags→tag_id`, `years→year`, `months→month`).
- Все запросы `/news` (первая страница, подгрузка, SSR-инициализация) включают фильтры.

### 4. Страница (`app/pages/media/index.vue`)
- URL query — источник истины фильтров: шароссылки вида
  `/media?filter[partner_id][0]=1043&filter[partner_id][1]=4&page=1&per_page=6` работают.
- Парсинг (`filtersFromQuery`) и сборка query в том же формате.
- Фильтры из URL синхронизируются со стором **до** `useAsyncData` — первый SSR-запрос уже отфильтрован.

## Затронутые файлы (только код проекта)
- `app/components/elements/Chips.vue`
- `app/components/widgets/FilterModal.vue`
- `app/pages/media/index.vue`
- `app/stores/news.js`

`.gitignore` не изменялся; `.nuxt/` и `node_modules/` в коммитах отсутствуют.

## Открытый вопрос
Имена параметров для групп `tags`, `years`, `months` (`tag_id`, `year`, `month`) — предположение.
Если API ожидает другие ключи, правится только `FILTER_PARAM_MAP` (стор + страница).
