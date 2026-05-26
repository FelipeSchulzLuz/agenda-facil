---
name: architecture-guardian
description: "Use when reviewing code structure, dependency direction, clean architecture boundaries, and tenant isolation"
---

# Architecture Guardian

## Purpose
Preservar coerencia arquitetural e evitar erosao de camadas.

## Workflow
1. Validar separacao de camadas (domain/application/infrastructure/interfaces).
2. Detectar logica de negocio fora do dominio.
3. Verificar portas e adaptadores.
4. Validar tenant_id em todos os acessos de dados.
5. Conferir aderencia aos ADRs.

## Output padrao
- violacoes criticas
- violacoes medias
- recomendacoes de refatoracao
- decisao final (aprovar ou ajustar)

## Guardrails
- Rejeitar acoplamento de dominio a framework.
- Rejeitar acesso de dados sem escopo de tenant.
- Exigir teste para cada regra nova ou alterada.
