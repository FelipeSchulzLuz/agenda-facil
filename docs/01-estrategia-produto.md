# 01 - Estrategia de Produto

## 1.1 Proposta de valor
Agenda Facil resolve o problema de negocios que vendem tempo e capacidade de atendimento:
- organizacao de agenda de profissionais;
- autoagendamento para cliente final;
- reducao de no-show com confirmacoes e lembretes;
- regras de cancelamento e remarcacao configuraveis;
- integracao de pagamentos para reduzir atrito operacional.

## 1.2 Decisao de posicionamento (generico com foco)
Recomendacao para reduzir risco e acelerar validacao:
- Dominio generico no nucleo (tempo, disponibilidade, conflito, status, cobranca).
- Vertical de entrada: beleza e saude no go-to-market inicial.

Racional:
- Reuso de regra central entre segmentos.
- Menor complexidade comercial e de UX no inicio.
- Evita documentacao excessivamente abstrata e sem aderencia real.

## 1.3 ICP inicial (Ideal Customer Profile)
- Profissional autonomo e microempresa com 1 a 10 profissionais.
- Alto impacto de no-show e remarcacao no faturamento.
- Necessidade de agenda mobile e controle basico financeiro.

## 1.4 Segmentacao de rollout
- Fase 1: PF/autonomos e pequenas operacoes.
- Fase 2: empresas multiunidade (CNPJ).
- Fase 3: franquias e operacoes com necessidades avancadas de governanca.

## 1.5 Modelo de negocio
- SaaS por assinatura.
- Planos por limites de profissionais, unidades e volume de agendamentos.
- Add-ons futuros: automacoes avancadas, integracoes premium, relatorios avancados.

## 1.6 Decisoes importantes ja consolidadas
- Multi-tenant desde o inicio com isolamento logico.
- Aplicativo mobile como canal principal de cliente final.
- Marketplace fora do MVP.
- Nao permitir overbooking no nucleo.

## 1.7 Ajustes sugeridos (melhoria)
1. Definir claramente escopo PF x CNPJ no MVP.
Contexto: hoje ha indicacao de foco em PF, mas tambem ha requisitos de multiunidade e perfis empresariais.
Recomendacao: manter modelo de dados preparado para CNPJ, mas liberar funcionalmente no MVP apenas PF + pequena equipe.

2. Reduzir integracoes obrigatorias no MVP.
Contexto: foi citado WhatsApp, Google, Outlook, CRM, ERP e pagamentos como obrigatorios.
Recomendacao: obrigatorio no MVP apenas 1 gateway de pagamento e 1 canal de notificacao; demais ficam para fase 2.

3. Definir principio de configuracao por tenant.
Contexto: varias regras estao configuraveis pelo administrador.
Recomendacao: criar matriz de configuracao com guardrails para evitar estados invalidos.

## 1.8 Metricas North Star e de apoio
- North Star: agendamentos concluidos por periodo por tenant.
- Apoio:
  - taxa de ocupacao;
  - taxa de no-show;
  - tempo medio para preencher vaga cancelada;
  - ticket medio;
  - retenção de clientes finais;
  - retenção de tenants pagantes.

## 1.9 Definicao de sucesso do MVP
- Time to first value menor ou igual a 1 dia para novo tenant.
- Criacao de agendamento em menos de 30 segundos em fluxo padrao.
- Reducao de no-show percebida pelo tenant apos 30 dias.
- Estabilidade com SLA inicial definido na doc de qualidade.