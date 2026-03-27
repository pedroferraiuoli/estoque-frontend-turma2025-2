# Sistema de Controle - Frontend

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

Instale os browsers necessários para o Playwright:

```bash
npx playwright install
```

## Rodando o projeto

```bash
# Servidor de desenvolvimento (React/Vite)
npm run dev
```

## Testes com Playwright

```bash
# Rodar os testes
npx playwright test

# Rodar testes com interface visual
npx playwright test --ui

# Ver relatório dos testes
npx playwright show-report
```


## Testes com Cucumber

```bash
# Rodar os testes
npx cucumber-js --config cucumber.mjs --import features/steps/**/*.ts --import features/support/**/*.ts
```

```bash
# Rodar os testes via scripts no package.json
npm run cucumber
```