---
mode: ask
description: "Avalia impacto de uma mudanca de regra de negocio no Agenda Facil"
---

# Objetivo
Avaliar uma mudanca de regra de negocio considerando dominio, arquitetura, seguranca e testes.

# Entrada esperada
- Regra atual.
- Regra proposta.
- Modulos afetados.

# Instrucao
Para a regra proposta, responda obrigatoriamente:
1. Quais invariantes do dominio mudam.
2. Quais casos de uso precisam mudar.
3. Quais riscos de regressao existem.
4. Quais testes novos sao necessarios.
5. Se a mudanca exige ADR novo.
6. Impacto em auditoria, multi-tenant e observabilidade.

# Formato de resposta
- Resumo executivo (maximo 8 linhas)
- Impactos tecnicos
- Riscos e mitigacoes
- Plano de implementacao em etapas
- Lista de testes obrigatorios