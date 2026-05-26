# Agenda Facil - Documentacao do Projeto

Este repositorio de documentacao consolida a visao de produto, regras de negocio e diretrizes de arquitetura para o sistema generico de agendamento Agenda Facil.

## Objetivo
Criar uma plataforma SaaS multi-tenant, mobile-first, para negocios que operam por horario marcado, com foco inicial em beleza e saude, mantendo o nucleo de dominio generico para expansao futura.

## Escopo desta documentacao
- Estrategia de produto e recorte de mercado.
- Catalogo de regras de negocio (fonte de verdade funcional).
- Modelo de dominio e arquitetura orientada a Clean Architecture.
- Requisitos nao funcionais, seguranca e observabilidade.
- Roadmap do MVP e criterios de release.
- Duvidas remanescentes para fechamento final.

## Estrutura
- docs/01-estrategia-produto.md
- docs/02-catalogo-regras-negocio.md
- docs/03-modelo-dominio-e-arquitetura.md
- docs/04-adrs-arquitetura.md
- docs/05-qualidade-seguranca-observabilidade.md
- docs/06-roadmap-mvp-e-fases.md
- docs/07-duvidas-remanescentes.md
- docs/08-estrategia-testes.md
- docs/09-copilot-powers-skills-agents.md
- docs/10-mcp-setup-e-governanca.md

## Governanca de IA (Copilot)
- .github/copilot-instructions.md
- .github/AGENTS.md
- .github/instructions/backend-domain.instructions.md
- .github/prompts/avaliar-regra-negocio.prompt.md
- .github/prompts/power-refinar-escopo-mvp.prompt.md
- .github/prompts/power-revisar-pr-arquitetura.prompt.md
- .github/prompts/power-go-live-readiness.prompt.md
- .github/agents/product-strategist.agent.md
- .github/agents/architecture-reviewer.agent.md
- .github/agents/qa-risk-agent.agent.md
- .github/skills/rule-impact-analyzer/SKILL.md
- .github/skills/architecture-guardian/SKILL.md
- .github/skills/quality-gate-enforcer/SKILL.md

## MCPs
- .vscode/mcp.json
- .env.example

## Principios adotados
- Product first: regras de negocio antes de framework.
- Dominio isolado: regras centrais independentes de UI, banco e APIs externas.
- Multi-tenant seguro: isolamento logico obrigatorio por tenant.
- Simplicidade evolutiva: MVP enxuto com pontos de extensao planejados.
- Medicao continua: telemetria, auditoria e metrica de negocio desde o inicio.

## Status
Documentacao inicial consolidada em 2026-05-25 com base nas respostas de discovery e com sugestoes tecnicas para reduzir risco de arquitetura e retrabalho.

## Gemini CLI (configuracao)

Para facilitar uso local do Gemini CLI para integrações e testes, adicionamos um `package.json` com dependência de desenvolvimento.

- Instalar dependências do projeto (se ainda nao existir `node_modules`):

```powershell
npm install
npm run install:gemini
```

- Autenticar/usar o CLI (opcional, dependendo do fluxo do CLI):

```powershell
# Defina sua chave em .env (ver .env.example) ou exporte antes:
setx GEMINI_API_KEY "sua_chave_aqui"
# Executar o CLI
npm run gemini -- --help
# Ou iniciar fluxo de autenticacao (se suportado):
npm run gemini:auth
```

Coloque chaves privadas apenas em variaveis de ambiente e nunca commite valores reais neste repositorio.