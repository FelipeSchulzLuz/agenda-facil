# Plano Completo de Execução do MVP - Agenda Fácil

Este plano detalha ponto a ponto todas as fases necessárias para a construção do MVP, garantindo que não haja barreiras de entendimento durante o desenvolvimento.

## Fase 0: Fundação (Semanas 1-2)
**Objetivo:** Setup estrutural do projeto, isolamento multi-tenant, observabilidade e fundação de dados.
1. **Setup Inicial:** Configurar repositório com Node.js, TypeScript (Strict), ESLint, Prettier e framework de testes (Vitest/Jest). Definir path aliases para a Clean Architecture.
2. **Infra e Banco de Dados:** Criar `docker-compose.yml` (PostgreSQL, Redis). Configurar ORM (Prisma/Drizzle) e criar as migrações iniciais.
3. **Clean Architecture:** Criar e isolar as pastas `domain`, `application`, `infrastructure` e `interfaces`.
4. **Fundação Multi-tenant:** Criar `TenantId` no domínio e middleware (`AsyncLocalStorage`) para injetar o tenant em todas as requisições e repositórios.
5. **Observabilidade:** Logger estruturado (Pino) com geração/propagação de `correlation_id` e tratamento global de erros HTTP.
6. **Auditoria Base:** Interface `AuditService` e implementação inicial para logar ações críticas na tabela `AuditLogs`.
7. **CI/CD:** Pipeline de validação de PRs (Lint, Type Check, Testes).

## Fase 1: Core de Agendamento (Semanas 3-5)
**Objetivo:** Implementar o motor de disponibilidade, regras de conflito e ciclo de vida do agendamento.
1. **Modelagem de Domínio:** Entidades `Professional`, `Appointment` e Value Objects (`TimeSlot`, `DateRange`).
2. **Motor de Disponibilidade:** Serviço de domínio para calcular slots livres considerando pausas, buffers e horários de trabalho.
3. **Casos de Uso Core:** `CreateAppointment` (com Anti-Overbooking), `CancelAppointment` e `RescheduleAppointment`.
4. **Persistência:** Repositórios transacionais (Unit of Work) para garantir concorrência segura.
5. **Testes Estratégicos:** Cobertura de cenários de overbooking e limites de antecedência.

## Fase 2: Cliente, Serviços e Financeiro Básico (Semanas 6-8)
**Objetivo:** Gestão de clientes, catálogo de serviços e motor financeiro imutável.
1. **Domínio de Clientes:** Entidade `Customer` e casos de uso de criação e bloqueio (no-show), ofuscando PII.
2. **Catálogo:** Entidade `Service` (duração, preço) vinculada aos profissionais.
3. **Motor Financeiro Ledger:** Entidades `Charge` e `WalletEntry`. Garantir regra `append-only` (sem updates) e estornos compensatórios.
4. **Integração:** Acoplar geração de cobrança após a confirmação do agendamento.
5. **Validações:** Testes de imutabilidade financeira e proteção de visibilidade de dados cross-tenant.

## Fase 3: Notificação e App Cliente (Semanas 9-10)
**Objetivo:** Comunicação ativa e APIs para autoagendamento.
1. **Serviço de Notificação:** Adaptador `NotificationGateway` e templates base.
2. **Automação de Lembretes:** Worker assíncrono para varrer agendamentos e enviar lembretes.
3. **APIs BFF:** Endpoints otimizados e rate-limited para listagem pública de horários (para o App Cliente).
4. **Fluxos Rápidos:** API para cadastro expresso de cliente + agendamento em um único step.

## Fase 4: Hardening e Go-Live Readiness (Semanas 11-12)
**Objetivo:** Qualidade final, segurança e relatórios.
1. **Auditoria de Segurança:** Revisão contra falhas de IDOR (Tenant validation) e verificação rigorosa de logs sem PII (LGPD).
2. **Relatórios Iniciais:** Endpoints de leitura (CQRS simplificado) para ocupação, faturamento e no-shows.
3. **Testes de Carga:** Scripts de K6 validando latência do agendamento sob concorrência.
4. **Infraestrutura e Deploy (CI/CD):** 
   - Configurar GitHub Actions para Continuous Deployment (CD) em ambientes de Staging e Produção.
   - Implementar regras rígidas de Nginx (Rate Limiting, Security Headers, SSL/TLS moderno, bloqueio de User-Agents suspeitos).
   - Configurar Health Checks e monitoramento de performance.
5. **Prontidão de Produção:** Setup final de variáveis de ambiente, runbooks de incidentes e migrações resilientes.

## Regras de Rigor para Ambiente de Produção (Guardrails)
- **Deploy:** Somente via GitHub Actions, proibido deploy manual. Merge em `main` exige aprovação e todos os testes verdes.
- **Nginx:** Deve atuar como Reverse Proxy com `fail2ban` integrado e limites de requisição por IP para prevenir DoS.
- **Segurança:** Headers `Content-Security-Policy`, `X-Frame-Options` e `Strict-Transport-Security` são obrigatórios.
- **Isolamento:** Variáveis de ambiente de PRD devem estar em segredos encriptados (GitHub Secrets) e nunca no código.
- **Auditabilidade:** Todo deploy gera um registro automático de qual versão (SHA do Git) foi implantada.
