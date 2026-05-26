# 09 - Copilot Powers, Skills e Agents

## 9.1 Objetivo
Padronizar uso de IA para manter coerencia de regra, arquitetura e qualidade.

## 9.2 Powers (prompts operacionais)
- .github/prompts/power-refinar-escopo-mvp.prompt.md
- .github/prompts/power-revisar-pr-arquitetura.prompt.md
- .github/prompts/power-go-live-readiness.prompt.md

Uso recomendado:
- Planejamento: power-refinar-escopo-mvp
- Revisao tecnica: power-revisar-pr-arquitetura
- Release: power-go-live-readiness

## 9.3 Skills
- .github/skills/rule-impact-analyzer/SKILL.md
- .github/skills/architecture-guardian/SKILL.md
- .github/skills/quality-gate-enforcer/SKILL.md

Uso recomendado:
- Mudanca de regra: rule-impact-analyzer
- Revisao estrutural: architecture-guardian
- Gate de release: quality-gate-enforcer

## 9.4 Agents especializados
- .github/agents/product-strategist.agent.md
- .github/agents/architecture-reviewer.agent.md
- .github/agents/qa-risk-agent.agent.md

## 9.5 Fluxo sugerido com multi agentes
1. product-strategist analisa impacto de negocio.
2. architecture-reviewer valida camadas e isolamento de tenant.
3. qa-risk-agent fecha risco, testes e readiness.
4. agente principal consolida decisao final.

## 9.6 Regra de governanca
- Decisao arquitetural relevante deve registrar/atualizar ADR.
- Regra de negocio alterada deve atualizar catalogo.
- Sem testes e sem trilha de auditoria, nao entra em release.
