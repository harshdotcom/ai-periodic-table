# AI Periodic Table

Interactive Angular app that presents core AI concepts as a periodic table and pairs them with recipe-style system examples.

Repository: `https://github.com/harshdotcom/ai-periodic-table`

## What It Includes

- Periodic table view for AI building blocks
- AI recipes view for common system patterns
- Light and dark theme toggle
- Compact repository callout linked to the GitHub repo
- Responsive layout for desktop and mobile

## Tech Stack

- Angular 19
- TypeScript
- CSS

## Local Development

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Then open:

```text
http://localhost:4200/
```

## Available Scripts

Start dev server:

```bash
npm start
```

Build production bundle:

```bash
npm run build
```

Build for GitHub Pages:

```bash
npm run build:pages
```

Watch build output during development:

```bash
npm run watch
```

Run unit tests:

```bash
npm test
```

## Project Structure

```text
src/
  app/
    app.component.*
    element/
    equations/
  styles.css
```

## Main Views

### Periodic Table

Shows AI concepts grouped into:

- Reactive
- Retrieval
- Orchestration
- Validation
- Models

### AI Recipes

Shows example combinations such as:

- Basic Chatbot
- Enterprise Q&A (RAG)
- ReAct Agent
- Safe Consumer AI
- AI Tutor

## Notes

- Theme styles are driven by CSS variables in `src/styles.css`
- The app uses standalone Angular components
- The periodic table data and recipe definitions live in `src/app/app.component.ts`

## Deploy to GitHub Pages

This repository is configured to deploy to GitHub Pages with GitHub Actions.

### 1. Push to GitHub

Push this project to:

```text
https://github.com/harshdotcom/ai-periodic-table
```

### 2. Enable GitHub Pages

In the GitHub repository:

- Go to `Settings`
- Open `Pages`
- Under `Build and deployment`, choose `GitHub Actions`

### 3. Deploy

The workflow file is:

```text
.github/workflows/deploy-pages.yml
```

It will:

- install dependencies with `npm ci`
- build the Angular app with `npm run build:pages`
- deploy the output in `dist/ai-periodic-table/browser`

### 4. Live URL

Once deployment finishes, the site will be available at:

```text
https://harshdotcom.github.io/ai-periodic-table/
```

### Local check before pushing

You can test the Pages build locally with:

```bash
npm run build:pages
```

This uses the correct base href for a GitHub Pages project site:

```text
/ai-periodic-table/
```

## License

No license file is currently included in this repository.
