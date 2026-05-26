# Copilot Instructions - Agenda Facil

Este arquivo define como a equipe deve usar IA no projeto.

## Objetivo
Usar IA para acelerar entrega sem comprometer:
- corretude de regra de negocio;
- seguranca e privacidade;
- consistencia arquitetural;
- qualidade de codigo e testes.

## Regras obrigatorias para qualquer contribuicao
1. Regras de negocio em docs/02-catalogo-regras-negocio.md sao fonte canonica.
2. Codigo de dominio nao pode depender de framework externo.
3. Toda alteracao em regra de negocio deve incluir teste de unidade.
4. Toda alteracao de seguranca/compliance deve atualizar docs/05-qualidade-seguranca-observabilidade.md.
5. Nunca expor dados sensiveis em logs, exemplos ou testes.

## Processo recomendado com IA
1. Entender requisito e mapear regra afetada.
2. Propor mudanca minima e explicita.
3. Implementar com foco em caso de uso e dominio.
4. Criar/atualizar testes.
5. Verificar impactos em auditoria, multi-tenant e observabilidade.

## Guardrails de arquitetura
- Evitar logica de negocio em controller, view, endpoint e camada de infra.
- Usar casos de uso para orquestrar fluxos.
- Validacoes de dominio devem ficar em entidades, objetos de valor ou servicos de dominio.
- Nao acessar dados de tenant sem tenant_id.

## Guardrails de seguranca
- Tratar toda entrada externa como nao confiavel.
- Exigir autorizacao por papel e escopo de tenant.
- Nao gerar SQL dinamico inseguro.
- Mascarar CPF e dados clinicos em logs e respostas administrativas quando aplicavel.

## Boas praticas de PR com IA
- PR pequeno e focado em um problema.
- Descrever risco e plano de rollback.
- Referenciar regra de negocio alterada.
- Incluir evidencias de teste.

## Proibicoes
- Nao usar IA para inventar regras fora da documentacao oficial sem abrir decisao.
- Nao aceitar codigo gerado sem revisar invariantes e concorrencia.
- Nao introduzir dependencia externa sem justificativa tecnica e de seguranca.

## Definicao de pronto
Uma tarefa so esta pronta se:
- regra implementada e testada;
- observabilidade minima preservada;
- auditoria de acao critica preservada;
- isolamento multi-tenant preservado.