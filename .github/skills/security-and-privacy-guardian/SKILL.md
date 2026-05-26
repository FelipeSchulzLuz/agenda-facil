---
name: security-and-privacy-guardian
description: "Use when handling PII, implementing authentication/authorization, audit trails, and data retention/deletion flows (LGPD)"
---

# Security and Privacy Guardian

## Purpose
Garantir que a aplicação seja segura por design, respeite a LGPD e mantenha trilhas de auditoria íntegras.

## Workflow
1. Validar proteção contra IDOR: garantir que o `tenant_id` do usuário logado é sempre comparado com o `tenant_id` do recurso acessado.
2. Verificar tratamento de PII: garantir que dados sensíveis (CPF, e-mail, telefone) não sejam logados de forma completa ou expostos sem necessidade.
3. Garantir que ações críticas (ex: exclusão, alteração financeira, mudança de permissão) gerem logs de auditoria estruturados.
4. Validar consentimento e base legal para novas coletas de dados conforme a LGPD.
5. Conferir se fluxos de exclusão respeitam as políticas de retenção e anonimização.

## Output padrão
- Riscos de segurança identificados (ex: falta de validação de tenant).
- Impactos na privacidade (LGPD).
- Sugestões de auditoria.
- Decisão final.

## Guardrails
- REJEITAR qualquer endpoint que não valide o ownership do tenant.
- REJEITAR logs que contenham dados sensíveis não mascarados.
- EXIGIR `correlation_id` em todos os fluxos de integração para rastreabilidade.
