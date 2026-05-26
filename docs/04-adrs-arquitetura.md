# 04 - ADRs de Arquitetura

## ADR-001 - Estrategia de produto: core generico com foco inicial em beleza e saude
Status: Aceito

Contexto:
Produto sera generico por dominio de tempo, mas precisa validar mercado rapido.

Decisao:
Desenvolver nucleo generico e GTM inicial focado em beleza e saude.

Consequencias:
- Reuso de dominio entre segmentos.
- UX inicial mais objetiva.
- Menor risco de produto horizontal amplo demais.

## ADR-002 - Multi-tenant com isolamento logico
Status: Aceito

Contexto:
Necessidade de escalar SaaS com custo operacional controlado.

Decisao:
Banco compartilhado com tenant_id obrigatorio e controles estritos de isolamento.

Consequencias:
- Menor custo e maior simplicidade operacional.
- Exige disciplina forte de seguranca e testes de isolamento.

## ADR-003 - Conflitos de agenda sao bloqueantes
Status: Aceito

Contexto:
Produto nao permite overbooking por diretriz de experiencia.

Decisao:
Conflitos de profissional e recurso impedem criacao/edicao de agendamento.

Consequencias:
- Menos retrabalho operacional.
- Exige algoritmo de disponibilidade consistente.

## ADR-004 - Recursos opcionais por servico
Status: Aceito

Contexto:
Ha tenants que nao controlam recurso fisico, mas outros dependem disso.

Decisao:
Controle de recurso sera feature opcional configuravel por tenant/servico.

Consequencias:
- Mantem simplicidade para pequenos.
- Atende cenarios de capacidade limitada (ressonancia, equipamento unico).

## ADR-005 - Fluxo de status com automacao assistida
Status: Aceito

Contexto:
Auto status total pode gerar falsos positivos de atendimento concluido.

Decisao:
Automatizar confirmacao e sugerir transicoes por horario, mantendo checkpoints manuais para estados criticos.

Consequencias:
- Melhor confiabilidade de dados operacionais.
- Pequeno custo de operacao manual justificavel.

## ADR-006 - Integracoes por fases
Status: Aceito

Contexto:
Todas integracoes no MVP elevam risco de prazo (3 meses).

Decisao:
MVP com 1 gateway de pagamento + 1 canal de notificacao.
Demais integracoes entram em fase 2.

Consequencias:
- Maior chance de entrega do MVP no prazo.
- Menor superficie de falha na fase inicial.

## ADR-007 - Ledger financeiro append-only
Status: Aceito

Contexto:
Eventos financeiros exigem rastreabilidade e conformidade.

Decisao:
Lancamentos financeiros nao sao editados nem removidos; ajustes ocorrem por eventos compensatorios.

Consequencias:
- Auditoria robusta.
- Relatorios financeiros mais confiaveis.

## ADR-008 - Catalogo de regras como fonte de verdade
Status: Aceito

Contexto:
Grande volume de regras configuraveis pode gerar divergencia entre time de negocio e engenharia.

Decisao:
Manter docs/02-catalogo-regras-negocio.md como referencia canonica para backlog e testes.

Consequencias:
- Alinhamento de produto e engenharia.
- Menos ambiguidade em homologacao.