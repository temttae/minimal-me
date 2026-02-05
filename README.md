# temttae

A personal site, live at [temttae.netlify.app](https://temttae.netlify.app).

Built with [Astro](https://astro.build/) and typeset in [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Sans).

## 🚀 Project Structure

```text
/
├── public/
│   ├── favicon.svg
├── src/
│   │── pages/
│   │   │── 404.astro
│   │   │── index.astro
│   │   └── work.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/             (Astro islands)
│   ├── assets/
│   │── scripts/
│   └── styles/
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Resources

1. [Astro Crash Course in 20 Minutes!](https://www.youtube.com/watch?v=zrPVTf761OI)
