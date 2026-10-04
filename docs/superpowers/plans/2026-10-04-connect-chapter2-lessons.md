# Подключение уроков Главы II к главной странице — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Подключить три готовых урока Главы II (`geometriya-7-2-8/9/10.html`) к главной странице курса `geometry-7/index.html` и привести счётчики прогресса в соответствие.

**Architecture:** Статичная правка одного HTML-файла по образцу, уже заложенному в комментарии файла и в инструкции проекта (раздел 10). Никакого JS, никакой генерации — страница должна работать по `file://`. Проверка — Python-скрипт, который читает `index.html` и сверяет ссылки, счётчики и разметку.

**Tech Stack:** HTML5, CSS3 (встроенные), Python 3.12 (только для проверки).

## Global Constraints

- Рабочий каталог — корень git-репозитория `geometry-7/`. Все пути в задачах относительные.
- Главная страница — только `geometry-7/index.html`. Корневой `index.html` и папку `Глава 1/` не трогать.
- Имена файлов уроков не переименывать: `geometriya-7-2-8.html`, `geometriya-7-2-9.html`, `geometriya-7-2-10.html`.
- Счётчик прогресса: **9 из 19 параграфов (≈ 47%)**. Урок-повторение главы I в счётчик не входит (инструкция п. 10.2).
- Счётчик Главы II: **3/4**, полоса **75%**, глава раскрыта по умолчанию (`open`).
- Счётчик Главы I не менять: **6/6**, полоса 100%.
- Тексты карточек § 1–3 Главы II (абзацы и списки `.topics`) не менять — они уже корректны.
- Коммиты — короткие фразы на русском, в стиле истории репозитория (`повторение`, `Rename lesson files to geometriya-7-1-N standard`).
- В файлах уроков не должно появляться внешних ссылок, JS и шрифтов (инструкция раздел 3, 5).

---

### Task 1: Шапка — комментарий со списком файлов и счётчик прогресса

**Files:**
- Modify: `index.html:7-17` (комментарий со списком готовых файлов)
- Modify: `index.html:133-134` (текст прогресса и полоса)

**Interfaces:**
- Consumes: ничего
- Produces: в комментарии перечислены все 10 готовых файлов; в шапке стоит `9 из 19 параграфов` и полоса `47%`

- [ ] **Step 1: Дополнить комментарий со списком готовых файлов**

Заменить блок строк 7–17:

```html
    <!--
        ФАЙЛЫ УРОКОВ (готовые):
        geometriya-7-1-1.html — §1. Прямая и отрезок
        geometriya-7-1-2.html — §2. Луч и угол
        geometriya-7-1-3.html — §3. Сравнение отрезков и углов
        geometriya-7-1-4.html — §4. Измерение отрезков
        geometriya-7-1-5.html — §5. Измерение углов
        geometriya-7-1-6.html — §6. Перпендикулярные прямые
        Когда появится новый урок: поменяйте статус на "done",
        замените btn-disabled на ссылку btn-go с нужным href.
    -->
```

на:

```html
    <!--
        ФАЙЛЫ УРОКОВ (готовые):
        geometriya-7-1-1.html — §1. Прямая и отрезок
        geometriya-7-1-2.html — §2. Луч и угол
        geometriya-7-1-3.html — §3. Сравнение отрезков и углов
        geometriya-7-1-4.html — §4. Измерение отрезков
        geometriya-7-1-5.html — §5. Измерение углов
        geometriya-7-1-6.html — §6. Перпендикулярные прямые
        geometriya-7-1-7.html — Вопросы для повторения к главе I
        geometriya-7-2-8.html — §1. Первый признак равенства треугольников
        geometriya-7-2-9.html — §2. Медианы, биссектрисы и высоты треугольника
        geometriya-7-2-10.html — §3. Второй и третий признаки равенства треугольников
        Когда появится новый урок: поменяйте статус на "done",
        замените btn-disabled на ссылку btn-go с нужным href.
    -->
```

- [ ] **Step 2: Обновить текст прогресса в шапке**

Заменить строку 133:

```html
        <div class="progress-text">Прогресс курса: <b>6 из 19 параграфов</b> готово (≈ 32%)</div>
```

на:

```html
        <div class="progress-text">Прогресс курса: <b>9 из 19 параграфов</b> готово (≈ 47%)</div>
```

- [ ] **Step 3: Обновить ширину полосы прогресса**

Заменить строку 134:

```html
        <div class="progress-bar"><div class="progress-fill" style="width:32%"></div></div>
```

на:

```html
        <div class="progress-bar"><div class="progress-fill" style="width:47%"></div></div>
```

- [ ] **Step 4: Проверить правку**

Run: `git diff --stat`
Expected: изменён только `index.html`

- [ ] **Step 5: Закоммитить**

```bash
git add index.html
git commit -m "Подключить уроки Главы II: шапка и счётчик прогресса"
```

---

### Task 2: Закрыть незакрытый `.chapter-body` Главы I

**Files:**
- Modify: `index.html:297-298`

**Interfaces:**
- Consumes: ничего
- Produces: теги `<div>`/`</div>` в файле сбалансированы (70/70), HTML валиден

**Обоснование.** При планировании найден существующий баг: у Главы I не закрыт
`<div class="chapter-body">` (открыт в строке 156). Строка 297 — `</details>`
параграфа, строка 298 — `</details>` главы, а закрывающего `</div>` между ними
нет. Главы II–V закрывают `.chapter-body` корректно (строки 385, 440, 526, 597).
Из-за этого в файле 70 открывающих и 69 закрывающих `<div>`. Спека требует
валидный HTML (раздел «Проверка», п. 5), поэтому баг исправляется в рамках
этой задачи. Визуально страница не меняется — браузер и так закрывал тег
неявно.

- [ ] **Step 1: Вставить закрывающий `</div>`**

Заменить строки 297–298:

```html
            </details>
        </details>
```

на:

```html
            </details>
        </div>
        </details>
```

- [ ] **Step 2: Проверить баланс тегов**

Run: `python -c "from pathlib import Path; h=Path('index.html').read_text(encoding='utf-8'); print(h.count('<div'), h.count('</div>'))"`
Expected: `70 70`

- [ ] **Step 3: Закоммитить**

```bash
git add index.html
git commit -m "Закрыть незакрытый chapter-body Главы I"
```

---

### Task 3: Сводка Главы II — счётчик, полоса, раскрытие

**Files:**
- Modify: `index.html:301` (открывающий тег Главы II)
- Modify: `index.html:306` (счётчик главы)
- Modify: `index.html:309` (полоса главы)

**Interfaces:**
- Consumes: ничего
- Produces: Глава II раскрыта по умолчанию, счётчик `3/4`, полоса `75%`

- [ ] **Step 1: Раскрыть Главу II по умолчанию**

Заменить строку 301:

```html
    <details class="chapter" style="--acc:#27ae60">
```

на:

```html
    <details class="chapter" open style="--acc:#27ae60">
```

- [ ] **Step 2: Обновить счётчик Главы II**

Заменить строку 306:

```html
            <span class="chapter-count">0/4</span>
```

на:

```html
            <span class="chapter-count">3/4</span>
```

- [ ] **Step 3: Обновить полосу Главы II**

Заменить строку 309:

```html
        <div class="chapter-bar"><div style="width:0%"></div></div>
```

на:

```html
        <div class="chapter-bar"><div style="width:75%"></div></div>
```

- [ ] **Step 4: Проверить правку**

Run: `git diff index.html`
Expected: в диффе три изменения в блоке Главы II — добавлен `open`, `3/4`, `width:75%`

- [ ] **Step 5: Закоммитить**

```bash
git add index.html
git commit -m "Глава II: счётчик 3/4, полоса 75%, раскрытие по умолчанию"
```

---

### Task 4: Три карточки § 1–3 Главы II — статус, кнопка, строка «Научишься»

**Files:**
- Modify: `index.html:313-328` (карточка § 1)
- Modify: `index.html:330-346` (карточка § 2)
- Modify: `index.html:348-363` (карточка § 3)

**Interfaces:**
- Consumes: ничего
- Produces: у карточек § 1–3 Главы II статус `✅ готово`, кнопка `btn-go` со ссылкой на соответствующий файл урока и строка `.skills`

- [ ] **Step 1: Карточка § 1 — статус и кнопка**

В блоке строк 313–328 заменить:

```html
                    <span class="para-name">§ 1. Первый признак равенства треугольников</span>
                    <span class="status soon">⏳ скоро</span>
```

на:

```html
                    <span class="para-name">§ 1. Первый признак равенства треугольников</span>
                    <span class="status done">✅ готово</span>
```

и заменить:

```html
                    <div class="para-footer"><span class="btn-disabled">Скоро</span></div>
```

на:

```html
                    <p class="skills">Научишься: обозначать вершины, стороны и углы треугольника, считать периметр, доказывать равенство по двум сторонам и углу между ними.</p>
                    <div class="para-footer">
                        <a class="btn-go" href="geometriya-7-2-8.html">Перейти к уроку →</a>
                    </div>
```

- [ ] **Step 2: Карточка § 2 — статус и кнопка**

В блоке строк 330–346 заменить:

```html
                    <span class="para-name">§ 2. Медианы, биссектрисы и высоты треугольника</span>
                    <span class="status soon">⏳ скоро</span>
```

на:

```html
                    <span class="para-name">§ 2. Медианы, биссектрисы и высоты треугольника</span>
                    <span class="status done">✅ готово</span>
```

и заменить:

```html
                    <div class="para-footer"><span class="btn-disabled">Скоро</span></div>
```

на:

```html
                    <p class="skills">Научишься: строить перпендикуляр к прямой, проводить медиану, биссектрису и высоту, доказывать свойства равнобедренного треугольника.</p>
                    <div class="para-footer">
                        <a class="btn-go" href="geometriya-7-2-9.html">Перейти к уроку →</a>
                    </div>
```

- [ ] **Step 3: Карточка § 3 — статус и кнопка**

В блоке строк 348–363 заменить:

```html
                    <span class="para-name">§ 3. Второй и третий признаки равенства треугольников</span>
                    <span class="status soon">⏳ скоро</span>
```

на:

```html
                    <span class="para-name">§ 3. Второй и третий признаки равенства треугольников</span>
                    <span class="status done">✅ готово</span>
```

и заменить:

```html
                    <div class="para-footer"><span class="btn-disabled">Скоро</span></div>
```

на:

```html
                    <p class="skills">Научишься: доказывать равенство по стороне и двум прилежащим углам и по трём сторонам, применять признаки в задачах.</p>
                    <div class="para-footer">
                        <a class="btn-go" href="geometriya-7-2-10.html">Перейти к уроку →</a>
                    </div>
```

- [ ] **Step 4: Проверить правку**

Run: `git diff index.html`
Expected: в диффе три карточки Главы II — у каждой `status done`, `btn-go` с нужным `href` и новая строка `.skills`

- [ ] **Step 5: Закоммитить**

```bash
git add index.html
git commit -m "Глава II: подключить § 1–3, статусы и кнопки «Перейти»"
```

---

### Task 5: Проверка результата

**Files:**
- Create: `verify_index.py` (временный, удаляется после проверки)
- Test: `verify_index.py`

**Interfaces:**
- Consumes: итоговый `index.html`
- Produces: отчёт о соответствии спеке; при провале — ненулевой код выхода

- [ ] **Step 1: Написать проверочный скрипт**

Создать файл `verify_index.py`:

```python
import re
import sys
from pathlib import Path

root = Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")
errors = []

def check(cond, msg):
    if not cond:
        errors.append(msg)

hrefs = re.findall(r'href="(geometriya-7-[^"]+\.html)"', html)
check(len(hrefs) == 10, f"ожидалось 10 ссылок на уроки, найдено {len(hrefs)}")
for h in hrefs:
    check((root / h).is_file(), f"файл не найден: {h}")

check("9 из 19 параграфов" in html, "в шапке нет «9 из 19 параграфов»")
check("≈ 47%" in html, "в шапке нет «≈ 47%»")
check('style="width:47%"' in html, "полоса прогресса не 47%")

check('<span class="chapter-count">6/6</span>' in html, "счётчик Главы I не 6/6")
check('<span class="chapter-count">3/4</span>' in html, "счётчик Главы II не 3/4")
check('width:75%' in html, "полоса Главы II не 75%")

ch2 = html.split("Глава II", 1)[1].split("Глава III", 1)[0]
check(ch2.count('class="status done"') == 3, "в Главе II не 3 статуса done")
check(ch2.count("btn-disabled") == 1, "в Главе II осталась лишняя btn-disabled (§ 4)")
check(ch2.count('class="btn-go"') == 3, "в Главе II не 3 кнопки btn-go")
check(ch2.count('class="skills"') == 3, "в Главе II не 3 строк skills")

for f in ("geometriya-7-2-8.html", "geometriya-7-2-9.html", "geometriya-7-2-10.html"):
    check(f'href="{f}"' in ch2, f"в Главе II нет ссылки на {f}")

check(html.count("<details") == html.count("</details>"), "несбалансированы теги details")
check(html.count("<div") == html.count("</div>"), "несбалансированы теги div")

if errors:
    print("ПРОВАЛ:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
print("OK: все проверки пройдены")
```

- [ ] **Step 2: Запустить проверку**

Run: `python verify_index.py`
Expected: `OK: все проверки пройдены`

- [ ] **Step 3: Удалить временный скрипт**

Run: `Remove-Item verify_index.py`
Expected: файл удалён, `git status` показывает только изменённый `index.html`

- [ ] **Step 4: Показать итоговый дифф**

Run: `git diff index.html`
Expected: дифф содержит изменения из задач 1–4, ничего лишнего

- [ ] **Step 5: Закоммитить исправления, если они были**

Если шаги 1–3 выявили ошибки и потребовались правки — закоммитить их:

```bash
git add index.html
git commit -m "Исправления после проверки подключения Главы II"
```

Если правок не было — шаг пропустить.
