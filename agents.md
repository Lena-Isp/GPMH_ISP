# AGENTS.md — правила работы с этим репозиторием

Этот файл — источник правды об архитектуре проекта для AI-агентов (Copilot, Claude, Cursor и др.).
Любое утверждение о коде должно подтверждаться ссылкой на конкретный файл. Если файла нет — его нет. Не выдумывайте.

---

## 1. Что это за проект (проверено по коду)

Корпоративный сайт (SSR-фронтенд).
- `nuxt.config.js → i18n.baseUrl`
- Git-владелец PR: `Lena-Isp` (имя удалённого репозитория в клоне не зафиксировано)
- В `/workspace` нет настроенного `git remote`.

## 2. Стек (из `package.json`, `nuxt.config.js`)

| Технология | Версия / факт |
|---|---|
| Nuxt | `^4.2.0`, `future.compatibilityVersion: 4` (структура `app/`) |
| Vue | `^3.5.22` |
| State | Pinia `^3.0.4` + `@pinia/nuxt` |
| i18n | `@nuxtjs/i18n ^10.4.0`, локали `ru`/`en` (`i18n/locales/{ru,en}.json`), strategy `prefix`, default `ru` |
| CSS | SCSS (`sass`), переменные/миксины подключаются глобально через `vite.css.preprocessorOptions` |
| Анимации | GSAP (+ ScrollTrigger), Swiper `^12` |
| Прочее | `@nuxt/icon` (коллекция `icons` → `app/assets/icons`), `@nuxt/image`, `vue-yandex-maps` |
| Язык | **JavaScript, без TypeScript** (`tsconfig.json` — заглушка от Nuxt) |
| Тесты / линтер | **Отсутствуют** (нет vitest, eslint, prettier в зависимостях) |

Dev-сервер: порт **5000** (`nuxt.config.js → devServer.port`).
Скрипты: `npm run dev | build | generate | preview | start`.

## 3. Структура каталогов (Nuxt 4)

```
app/
  pages/         # маршрутизация (см. §4)
  layouts/       # единственный layout: default.vue
  components/    # elements/, sections/, shell/, ui/, widgets/ (автоимпорт без префикса)
  stores/        # 14 pinia-сторов (см. §6)
  composables/   # useApi, useLanguage, useMenu, useArticleComponent
  plugins/       # api.js ($fetch инстанс), gsap.client.js, tokens.js
  constants/     # navigation.js, mockActives.js
  utils/         # index.js
  assets/        # scss/, icons/, изображения
  app.vue, error.vue
i18n/locales/    # ru.json, en.json
public/          # статика
nuxt.config.js
```

## 4. Реальные маршруты (только эти страницы существуют)

По `app/pages/` (без учёта i18n-префикса `/ru`, `/en`):

- `/` — главная (`index.vue`)
- `/about`, `/about/career`, `/about/history`, `/about/strategy`
- `/business`, `/business/partner/[id]`
- `/contacts`
- `/media` (лента новостей), `/media/[id]` (статья)
- `/search`
- `/ui`, `/ui/elements`, `/ui/fonts`, `/ui/tokens`, `/ui/widgets` — внутренние страницы дизайн-системы

**Чего в проекте НЕТ** (не предлагать, не «чинить», не описывать):
- ❌ админки `/admin/*`
- ❌ роутера `src/router/index.js` (это Vue SPA-паттерн, здесь файловая маршрутизация Nuxt)
- ❌ middleware, `meta.requiresAuth`, авторизации, токенов в localStorage
- ❌ Tailwind CSS / DaisyUI
- ❌ axios (используется нативная `$fetch`/ofetch)
- ❌ папки `src/` (структура `app/`)
- ❌ каталога `i18n/locales/kz.json` (только ru и en)

## 5. API-слой

Единая точка — `app/plugins/api.js`:

```js
каждый запрос получает заголовок 'X-localization': текущая локаль
```

Обёртка над ним — `app/composables/useApi.js`: методы `get(url, options)`, `post(url, body)`,
возвращают `{ data, status }` (распаковывают `responseData.data ?? responseData`).
В сторах обращаться к API нужно только через `useApi()`, а не через `$fetch` напрямую.

Известные эндпоинты (подтверждаются вызовами в сторах): `/news`, `/news/{slug}`, `/news/filters`,
новостной фильтр-формат — Laravel-массивы (см. §7).

## 6. Pinia-сторы (`app/stores/`)

`about, awards, career, common, example, history, leaders, menu, news, partners, redirects, responsibility, search, site`

Все — setup-синтаксис (`defineStore('name', () => {...})`).
Важно: стор `app/stores/news.js` зарегистрирован под id **`media`** (`defineStore('media', ...)`),
несмотря на имя файла.

## 7. Контракт фильтров новостей (текущее соглашение)

Формат query для списка новостей (реализовано в `buildFilterQuery()` внутри `app/stores/news.js`):

```
/media?page=1&per_page=6&filter[partner_id][0]=1043&filter[partner_id][1]=4
```

- Ключи собираются как `filter%5B{ключ}%5D%5B{индекс}%5D={значение}` (закодированные `[`/`]`).
- Маппинг внутренних групп фильтров на поля бэкенда: `FILTER_KEY_MAP = { assets: 'partner_id' }`.
  Новые ключи (`tags`, `years`, `months`) добавляются туда же, если бэкенд ждёт другие имена.
- `perPage = 6` для ленты; `currentPage` стартует со 2 (первая страница уже загружена).
- Состояние фильтров: `activeFilters = { assets: [id...], tag_id: [...], years: [...], months: [...] }`.

## 8. Стиль и конвенции

- Компоненты автоимпортируются из 5 корневых папок `components/` без префиксов — имена должны быть уникальны глобально.
- SCSS-переменные и миксины доступны во всех `.vue`/`.scss` без ручного `@use`.
- Комментарии в коде — на русском.
- Локализация UI-строк: через `$t()` и файлы `i18n/locales/*.json`, не хардкодом.

## 9. Правила для агента (антигаллюцинации)

1. **Только этот репозиторий.** Перед любым утверждением о коде выполни проверку (`grep`, `ls`, чтение файла) и цитируй найденное с путём `файл:строка`.
2. **Нет доказательства — нет утверждения.** Формулируй как гипотезу: «предположительно…», «в коде не нашёл, уточнить у бэкенда».
3. **Не переноси паттерны** из Vue SPA / React / Laravel-шаблонов (router/index.js, requiresAuth, Tailwind, axios) — их здесь нет (см. §4).
4. **Не создавай новые зависимости** (TS, eslint, vitest) без явного запроса пользователя.
5. **Правки API-формата** (фильтры, эндпоинты) согласуй с реальным контрактом бэкенда; после изменения §7 обновляй этот файл.
6. **После изменения структуры/зависимостей** обнови соответствующие разделы AGENTS.md — файл должен оставаться точным.

## 10. Как проверить, что агент не галлюцинирует

Контрольные вопросы с единственно верными ответами по коду:

| Вопрос | Правильный ответ |
|---|---|
| Сколько layout'ов? | Один: `app/layouts/default.vue` |
| Есть ли `/admin`? | Нет |
| HTTP-клиент? | `$fetch` (ofetch) через `plugins/api.js` + `useApi.js`, не axios |
| Локали? | `ru`, `en` |
| id стора новостей? | `media` |
| Порт dev-сервера? | 5000 |
| Формат фильтров? | `filter[key][index]=value` (Laravel-стиль) |

Если агент отвечает иначе — он выдумывает. Потребуйте ссылку `файл:строка`.
