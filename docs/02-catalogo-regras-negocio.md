# 02 - Catalogo de Regras de Negocio

Este documento e a fonte oficial de regras funcionais para implementacao.

## 2.1 Entidades de negocio centrais
- Tenant (empresa/profissional contratante).
- Unidade.
- Usuario interno (admin, gerente, recepcao, profissional, financeiro).
- Cliente final.
- Profissional.
- Servico.
- Recurso.
- Agendamento.
- Pacote/assinatura.
- Pagamento.
- Politica de cancelamento/remarcacao.
- Notificacao.

## 2.2 Regras de agenda e disponibilidade
1. Agenda por profissional e obrigatoria.
2. Bloqueios de agenda devem ter prioridade sobre slots livres.
3. Jornada, pausa, almoco, folga e feriado sao configuraveis por profissional.
4. Antecedencia minima para agendar e cancelamento/remarcacao e configuravel por tenant.
5. Tolerancia de atraso e configuravel por tenant.
6. Encaixe e permitido somente em slots livres validos pelas mesmas regras de conflito.
7. Recorrencia e permitida via serie de ocorrencias, com validacao individual por ocorrencia.

## 2.3 Regras de conflito
1. Conflito de profissional nunca e permitido.
2. Overbooking e proibido no nucleo.
3. Em caso de indisponibilidade de recurso, agendamento deve ser bloqueado.
4. Sistema deve sugerir alternativas de horario quando houver bloqueio.
5. Conflitos sao impeditivos, nao apenas informativos.

## 2.4 Regras de servico
1. Servico pode ter duracao padrao por tenant.
2. Servico pode ter duracao personalizada por profissional.
3. Agendamento pode ter um ou multiplos servicos.
4. Duracao total do agendamento e soma das duracoes + buffers.
5. Pacotes de servicos sao suportados com validade e saldo.
6. Preco pode variar por unidade e/ou profissional.

## 2.5 Regra para recursos (ajuste de consistencia)
As respostas trazem aparente contradicao entre "nao controlar recurso" e "controlar capacidade". Para evitar lacuna:

Decisao sugerida:
- Recurso e opcional no modelo.
- Quando habilitado para um servico, conflito de recurso passa a ser obrigatorio.
- Quando nao habilitado, o sistema controla apenas agenda de profissional.

Com isso, o produto permanece simples para quem nao precisa de recurso, sem perder suporte a cenarios como ressonancia.

## 2.6 Regras de clientes
1. Cliente pode ser cadastrado antes do primeiro agendamento.
2. Campos minimos iniciais: nome, telefone; CPF e email configuraveis por tenant com recomendacao forte de CPF para segmentos regulados.
3. Cliente pode ter multiplos contatos.
4. Cliente pode ser bloqueado por politicas de no-show/inadimplencia.
5. Alteracao de dados criticos (exemplo: CPF) exige fluxo restrito e auditoria.

## 2.7 Regras de status do agendamento
Estados canonicos:
- criado
- confirmado
- checkin_realizado
- em_atendimento
- concluido
- cancelado
- faltou

Transicoes:
- criado -> confirmado (automatico ou manual conforme regra do tenant)
- confirmado -> checkin_realizado (manual/online)
- checkin_realizado -> em_atendimento (manual ou automatizado por horario)
- em_atendimento -> concluido (manual preferencial)
- confirmado -> cancelado (cliente ou interno, com politicas)
- confirmado -> faltou (manual interno apos janela de tolerancia)

Melhoria sugerida:
- Evitar fechamento 100% automatico para concluido sem sinal operacional.
- Usar automacao com fallback manual para evitar falso concluido.

## 2.8 Regras financeiras
1. Formas de pagamento suportadas: no ato, antecipado, parcial e posterior.
2. Suporte a sinal, credito e debito do cliente.
3. Politicas de multa por no-show/cancelamento tardio sao configuraveis.
4. Eventos financeiros devem ser imutaveis (ledger append-only).
5. Estorno deve ser lancamento compensatorio, nunca edicao destrutiva.

## 2.9 Regras de notificacao
1. Confirmacao de agendamento deve ser enviada automaticamente.
2. Lembretes sao configuraveis por quantidade e antecedencia.
3. Templates separados por tipo de mensagem (confirmacao, lembrete, cancelamento, pos-atendimento).
4. Interacao do cliente pelo canal (confirmar/cancelar) deve atualizar status com rastreabilidade.

## 2.10 Regras de acesso e auditoria
1. Controle de acesso por papeis + escopo de tenant.
2. Profissional visualiza somente propria agenda por padrao.
3. Toda acao critica deve gerar trilha de auditoria.
4. Auditoria minima: usuario, tenant, data/hora, tipo de acao, entidade afetada, antes/depois.

## 2.11 Regras de relatorios
MVP:
- ocupacao;
- faturamento;
- no-show;
- ticket medio;
- retencao.

Filtros minimos:
- periodo;
- profissional;
- unidade;
- servico.

## 2.12 Regras de multi-tenant
1. Todo registro de negocio possui tenant_id obrigatorio.
2. Toda consulta deve filtrar tenant_id no nivel de repositorio.
3. Chaves unicas devem considerar tenant_id quando aplicavel.
4. Operacoes cross-tenant sao proibidas por padrao.

## 2.13 Politica de evolucao de regras
- Toda nova regra de negocio deve nascer com:
  - descricao funcional;
  - invariante de dominio;
  - teste de unidade de regra;
  - impacto em eventos e auditoria.