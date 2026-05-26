# 05 - Qualidade, Seguranca e Observabilidade

## 5.1 Objetivos nao funcionais iniciais
- P95 de carregamento da agenda <= 2s.
- Disponibilidade mensal inicial: 99.5% (MVP), evoluindo para 99.9%.
- RPO de backup <= 24h no MVP.
- RTO <= 4h no MVP.

## 5.2 Seguranca de aplicacao
- Autenticacao forte (tokens com expiracao curta + refresh seguro).
- Autorizacao por RBAC + escopo de tenant.
- Protecao contra IDOR com validacao de tenant ownership.
- Criptografia em transito (TLS) e em repouso para dados sensiveis.
- Rotacao de segredos e segregacao por ambiente.

## 5.3 LGPD e privacidade
- Consentimento explicito para coleta e uso de dados.
- Base legal e finalidade por categoria de dado.
- Politica de retencao por tipo de registro.
- Direito de exclusao/anonimizacao com trilha de auditoria.
- Minimizar coleta de PII no MVP.

## 5.4 Auditoria
Acoes criticas com log obrigatorio:
- alteracao de dados pessoais;
- alteracao de politicas;
- criacao/edicao/cancelamento de agendamento;
- alteracoes financeiras;
- mudancas de permissao e perfil.

Campos minimos de auditoria:
- timestamp UTC;
- actor_id;
- tenant_id;
- entidade;
- acao;
- before/after (quando aplicavel);
- correlation_id.

## 5.5 Observabilidade (padrao big tech)
- Logs estruturados em JSON.
- Correlation id por requisicao.
- Traces distribuidos para fluxos criticos.
- Metricas de aplicacao e negocio separadas.
- Alertas por SLO violado, nao so por infra.

## 5.6 SLOs de negocio sugeridos
- Falha de criacao de agendamento < 0.5%.
- Entrega de notificacao de confirmacao > 98%.
- Taxa de erro em pagamento < 1% (excluindo recusas bancarias legitimas).

## 5.7 Resiliencia
- Timeouts, retry com backoff e circuit breaker para integracoes.
- Fila para tarefas assincronas de notificacao.
- Idempotencia para callbacks/webhooks.
- DLQ para mensagens falhas.

## 5.8 Qualidade de entrega
- Definition of Ready e Definition of Done.
- PR com checklist de seguranca e impacto em regra de negocio.
- Feature flags para rollout gradual.
- Canary/release progressivo em producao.

## 5.9 Politica de dados sensiveis
- Nao logar CPF completo e dados sensiveis clinicos.
- Mascaramento em telas administrativas.
- Acesso a anexos/documentos com autorizacao explicita e trilha de acesso.