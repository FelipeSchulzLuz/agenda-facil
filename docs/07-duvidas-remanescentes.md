# 07 - Duvidas Remanescentes para Fechamento

Este documento lista apenas pontos ainda abertos apos suas respostas, para eliminar lacunas antes do inicio da codificacao.

## 7.1 Produto e mercado
1. No MVP, vamos suportar apenas PF/autonomo, ou PF + CNPJ com equipe pequena?
2. Multiunidade entra no MVP ou fase 2?
3. Quais segmentos terao prioridade comercial no primeiro lancamento (beleza, saude ou ambos)?

## 7.2 Recursos e capacidade
1. Confirmar decisao final: recurso opcional por servico no MVP (sim/nao)?
2. Se sim, no MVP havera apenas capacidade 1 ou tambem capacidade maior que 1?
3. Bloqueio de recurso por manutencao sera manual, recorrente ou ambos?

## 7.3 Status operacional
1. Conclusao automatica do atendimento sera permitida sem acao manual? Recomendacao tecnica: nao.
2. Janela para marcar no-show apos horario previsto (ex: 15 minutos) deve ser global ou por tenant?

## 7.4 Financeiro
1. Quais metodos de pagamento entram no MVP (PIX, cartao, dinheiro)?
2. Nota fiscal no MVP sera emissao nativa ou apenas exportacao para sistema externo?
3. Politica de multa por no-show: percentual, valor fixo ou ambos?

## 7.5 Integracoes
1. Qual canal de notificacao sera o oficial do MVP (push ou email)?
2. Quais integracoes ficam para fase 2 explicitamente?
3. Qual gateway de pagamento sera escolhido para iniciar?

## 7.6 Seguranca e compliance
1. CPF sera obrigatorio para todos os tenants ou configuravel por segmento?
2. Prazo de retencao de historico e anexos (em anos) para cada tipo de tenant?
3. Quais papeis podem visualizar anexos sensiveis?

## 7.7 Operacao e suporte
1. Havera suporte humano para alteracoes criticas (ex: mudanca de CPF)?
2. Qual SLA de suporte no MVP?
3. Havera ambiente de sandbox para testes de tenant antes de producao?

## 7.8 Decisoes sugeridas para aprovar agora
- Aprovar integracoes minimas do MVP (1 notificacao + 1 pagamento).
- Aprovar politica de auto-status assistida (nao 100% automatica para concluido).
- Aprovar suporte a recurso opcional para cenarios de capacidade limitada.
- Aprovar recorte PF + pequena equipe no MVP para cumprir prazo de 3 meses.