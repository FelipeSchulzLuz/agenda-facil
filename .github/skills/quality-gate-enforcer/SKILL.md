---
name: quality-gate-enforcer
description: "Use when validating release readiness, regression risk, test completeness, and observability requirements"
---

# Quality Gate Enforcer

## Purpose
Aplicar gate de qualidade antes de merge e release.

## Workflow
1. Validar cobertura de testes dos fluxos criticos.
2. Validar riscos de concorrencia e idempotencia.
3. Validar seguranca e autorizacao por tenant/papel.
4. Validar trilha de auditoria para acoes criticas.
5. Validar telemetria e alertas minimos.

## Fluxos criticos obrigatorios
- agendamento sem conflito
- agendamento com conflito
- cancelamento/remarcacao com politica
- no-show
- pagamento + estorno
- notificacao de confirmacao
- isolamento multi-tenant

## Output padrao
- status dos gates (pass/fail)
- bloqueios para release
- mitigacoes recomendadas
- decisao go/no-go
