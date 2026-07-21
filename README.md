# intask-web

iPhone/веб-клиент задач [intask](https://github.com/) — PWA, читает/пишет тот же
формат (TOML-файлы в git-репозитории) через GitHub Contents API. Один
самодостаточный `index.html`, без сборки и зависимостей.

Открой размещённую по HTTPS страницу, введи `owner/repo` приватного репозитория
с задачами и Personal Access Token (Contents: read/write) — токен хранится только
в браузере. «Демо» показывает интерфейс без токена.
