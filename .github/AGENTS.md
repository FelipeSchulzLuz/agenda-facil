# AGENTS - Estrategia de Uso de Multi Agentes

Este documento define quando usar subagentes na evolucao do projeto.

## Quando usar multi agentes
- Explorar impacto de uma regra em varios modulos.
- Investigar padroes repetidos de codigo para refatoracao.
- Levantar matriz de riscos antes de grandes mudancas.
- Comparar alternativas arquiteturais com criterios objetivos.

## Padrao de execucao sugerido
1. Agente A (Produto): valida impacto na regra de negocio.
2. Agente B (Arquitetura): valida dependencia e separacao de camadas.
3. Agente C (Qualidade): valida testes, seguranca e observabilidade.
4. Agente principal: consolida decisao final e plano de implementacao.

## Criterios de aceitacao de resultado de agente
- Resultado rastreavel em arquivos do projeto.
- Sem contradizer docs/02-catalogo-regras-negocio.md.
- Sem quebrar isolamento multi-tenant.
- Com proposta de teste associada.

## Anti padroes
- Usar multi agentes para tarefas triviais.
- Aceitar recomendacao sem verificacao de dominio.
- Permitir que agente decida regra nova sem ADR.

## Regra de ouro
Agente auxilia decisao; responsabilidade final continua no time.