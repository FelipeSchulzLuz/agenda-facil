# 06 - Roadmap do MVP e Fases

## 6.1 Principio de planejamento
Prazo alvo: 3 meses para prototipo funcional.
Prioridade: reduzir risco de regra de negocio antes de expandir integracoes.

## 6.2 Escopo MVP (obrigatorio)
- Cadastro de tenant, unidade, profissionais e clientes.
- Configuracao de servicos (duracao, preco, buffer, regras basicas).
- Agenda com disponibilidade e bloqueios.
- Criacao, remarcacao e cancelamento de agendamento.
- Regras de antecedencia e tolerancia.
- Confirmacao e lembretes (1 canal).
- Check-in e fluxo de status principal.
- Relatorios basicos (ocupacao, no-show, faturamento, ticket medio).
- Auditoria de acoes criticas.
- Multi-tenant com isolamento logico.

## 6.3 Fora do MVP
- Marketplace.
- Integracoes multiplas simultaneas (CRM/ERP completos).
- IA para previsao/recomendacao.
- White-label avancado.
- Relatorios analiticos complexos em tempo real completo.

## 6.4 Fases sugeridas
Fase 0 (Semana 1-2): Fundacao
- setup de arquitetura, CI/CD, observabilidade base e seguranca.
- modelagem de dominio e casos de uso core.

Fase 1 (Semana 3-5): Core de agendamento
- disponibilidade, conflitos e comandos de agenda.
- fluxo de status e historico.

Fase 2 (Semana 6-8): Cliente, servicos e financeiro basico
- cadastro completo, politicas de bloqueio, preco e pagamento inicial.

Fase 3 (Semana 9-10): Notificacao e app cliente
- confirmacoes/lembretes e autoagendamento.

Fase 4 (Semana 11-12): Hardening
- testes de carga, seguranca, auditoria, rollout controlado.

## 6.5 Matriz de risco
- Alto: regra de cancelamento/remarcacao e conflito de agenda.
- Alto: isolamento multi-tenant.
- Medio: status automatico sem falso positivo.
- Medio: consistencia de webhooks de pagamento.
- Baixo: customizacoes visuais por tenant.

## 6.6 Criterios de Go-Live
- Cobertura de testes de dominio definida e atingida.
- Zero bug critico aberto em fluxos de agendamento e pagamento.
- Painel de observabilidade com alertas ativos.
- Teste de isolamento tenant aprovado.
- Runbook de incidente disponivel.

## 6.7 Backlog fase 2
- Integracao Google Calendar e Outlook.
- Integracao WhatsApp oficial.
- Modulo de promocoes avancadas.
- Assinaturas e planos recorrentes avancados.
- Relatorios em near real-time com latencia menor.