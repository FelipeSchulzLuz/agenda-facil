---
applyTo: "src/domain/**/*.ts,src/application/**/*.ts"
description: "Use when implementing or reviewing business rules, use cases, domain entities and scheduling logic"
---

# Backend Domain Instructions

## Prioridades
1. Correta aplicacao das regras de negocio.
2. Simplicidade de codigo e nomes explicitos.
3. Testabilidade por unidade e integracao.

## Regras
- Implementar invariantes no dominio, nao no endpoint.
- Todo caso de uso deve ser idempotente quando exposto externamente.
- Erros de dominio devem ter codigo estavel.
- Evitar efeitos colaterais antes de confirmar persistencia.
- Publicar eventos de dominio apos commit da transacao (outbox recomendado).

## Checklist de revisao
- Regra alterada existe no catalogo?
- Existe teste cobrindo caso feliz, violacao e borda?
- tenant_id esta presente em consultas e comandos?
- Logs removem dados sensiveis?
- Existe impacto em auditoria?
