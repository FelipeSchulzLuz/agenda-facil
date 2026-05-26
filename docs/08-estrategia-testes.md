# 08 - Estrategia de Testes

## 8.1 Piramide de testes
- Base: testes de unidade de dominio (invariantes).
- Meio: testes de integracao de casos de uso com banco e filas.
- Topo: testes E2E dos fluxos criticos.

## 8.2 Cobertura por risco
Fluxos obrigatorios:
- criar agendamento sem conflito;
- bloquear agendamento com conflito de profissional;
- bloquear agendamento com conflito de recurso (quando habilitado);
- cancelar e remarcar com antecedencia valida/invalida;
- marcar no-show apos tolerancia;
- registrar pagamento e estorno compensatorio;
- validar isolamento por tenant;
- confirmar entrega de notificacao.

## 8.3 Testes de regressao de regra
Cada regra em docs/02-catalogo-regras-negocio.md deve ter pelo menos:
- 1 caso feliz;
- 1 caso de violacao;
- 1 caso de borda temporal.

## 8.4 Testes de concorrencia
- Duas requisicoes simultaneas para mesmo slot/profissional devem resultar em uma unica confirmada.
- Testar controle otimista e tratamento de retry seguro.

## 8.5 Testes de contratos externos
- Gateway de pagamento com simulacoes de sucesso, falha, timeout e webhook duplicado.
- Canal de notificacao com falha temporaria e retry.

## 8.6 Testes de seguranca
- Autorizacao por papel e tenant.
- Tentativa de acesso cross-tenant.
- Sanitizacao de logs para dados sensiveis.
- Confirmacao de criptografia para dados definidos.

## 8.7 Testes de performance
- Agenda com carga realista e pico controlado.
- SLO P95 <= 2s para consultas principais.
- Testes de endurance para jobs de notificacao.

## 8.8 Testes de observabilidade
- Verificar emissao de logs estruturados com correlation_id.
- Verificar traces em fluxos de agendamento/pagamento.
- Validar alertas por erro e por degradacao de SLO.

## 8.9 Quality gates no CI
- build e lint obrigatorios.
- unit tests obrigatorios.
- cobertura minima de dominio (definir percentual com o time).
- testes de seguranca estaticos.
- bloqueio de merge para falha em contrato de API.