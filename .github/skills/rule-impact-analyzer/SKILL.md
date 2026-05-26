---
name: rule-impact-analyzer
description: "Use when changing business rules, appointment policies, cancellation logic, or pricing behavior in Agenda Facil"
---

# Rule Impact Analyzer

## Purpose
Analisar impacto completo de mudanca de regra de negocio antes da implementacao.

## Inputs esperados
- regra atual
- regra proposta
- modulos afetados

## Workflow
1. Mapear invariante de dominio alterada.
2. Mapear casos de uso e eventos afetados.
3. Identificar impacto em multi-tenant, auditoria e notificacoes.
4. Definir testes obrigatorios de regressao.
5. Propor ordem segura de rollout.

## Output padrao
- impacto funcional
- impacto tecnico
- riscos
- plano de implementacao
- plano de testes

## Guardrails
- Nao aprovar mudanca sem criterio de aceite testavel.
- Nao ignorar impacto em cancelamento/remarcacao e conflito de agenda.
