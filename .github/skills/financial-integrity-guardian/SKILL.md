---
name: financial-integrity-guardian
description: "Use when implementing or reviewing financial logic, payments, ledger entries, and compensation/refund flows"
---

# Financial Integrity Guardian

## Purpose
Garantir que todas as operações financeiras sigam o padrão de ledger imutável (append-only) e que as regras de negócio de cobrança sejam respeitadas.

## Workflow
1. Validar se operações de crédito/débito são novos registros e não edições de registros existentes.
2. Verificar se estornos são implementados como lançamentos compensatórios.
3. Garantir que todo evento financeiro tenha rastreabilidade (usuário, tenant, timestamp, transação original).
4. Validar se regras de multa por cancelamento tardio estão sendo aplicadas conforme a configuração do tenant.
5. Conferir se o saldo (balance) é calculado a partir da soma dos lançamentos (ledger) e não apenas lido de um campo mutável (quando aplicável ao design).

## Output padrão
- Violacões de imutabilidade (ex: uso de UPDATE em registros de ledger).
- Falhas de rastreabilidade.
- Recomendações de design para fluxos de pagamento/estorno.
- Decisão final.

## Guardrails
- REJEITAR qualquer lógica que permita deletar ou alterar o valor de uma transação já confirmada.
- EXIGIR `tenant_id` em todos os lançamentos financeiros.
- EXIGIR testes de integração para fluxos de falha (ex: pagamento negado, estorno parcial).
