# 03 - Modelo de Dominio e Arquitetura

## 3.1 Principios de Clean Architecture
- Dominio nao depende de frameworks.
- Casos de uso orquestram regras e nao conhecem detalhes de infra.
- Adaptadores externos implementam portas (repositorios, mensageria, gateways).
- Dependencia sempre aponta para dentro (dominio).

## 3.2 Bounded Contexts sugeridos
1. Identity & Access
- autenticacao, autorizacao, papeis, escopos por tenant.

2. Scheduling
- disponibilidade, slots, conflitos, agendamento, status.

3. Catalog
- servicos, pacotes, precificacao, regras de duracao e buffer.

4. Customer
- cadastro, historico, preferencias, bloqueios.

5. Billing
- cobrancas, pagamentos, estornos, saldo e ledger.

6. Notification
- templates, disparos, callbacks e status de entrega.

7. Reporting
- agregacoes e indicadores de negocio.

## 3.3 Entidades e agregados
Agregado Scheduling:
- Appointment
- AppointmentItem
- AppointmentPolicySnapshot

Invariantes:
- nao permite overlap para mesmo profissional;
- respeita politica de antecedencia;
- respeita disponibilidade;
- valida conflito de recurso quando recurso e exigido.

Agregado Service Catalog:
- Service
- ServicePriceRule
- Package

Agregado Customer:
- Customer
- CustomerBlockPolicy
- CustomerPreference

Agregado Billing:
- Charge
- Payment
- WalletEntry (append-only)

## 3.4 Modelo de pastas (exemplo)
- src/
  - domain/
    - scheduling/
    - catalog/
    - customer/
    - billing/
    - notification/
  - application/
    - use-cases/
    - dto/
    - ports/
  - infrastructure/
    - persistence/
    - messaging/
    - payment/
    - notification/
  - interfaces/
    - http/
    - jobs/
    - mobile-bff/

## 3.5 Casos de uso prioritarios
- CreateAppointment
- RescheduleAppointment
- CancelAppointment
- RegisterCheckin
- MarkNoShow
- CompleteAppointment
- CreateCustomer
- BlockCustomer
- ConfigureService
- SetWorkingHours
- BlockScheduleWindow
- CreateCharge
- RegisterPayment

## 3.6 Contratos de porta (exemplos)
- AppointmentRepository
- AvailabilityQuery
- ConflictChecker
- PaymentGateway
- NotificationGateway
- AuditLogRepository
- UnitOfWork

## 3.7 Concorrencia e consistencia
- Controle otimista por versao em entidades criticas.
- Transacoes curtas no banco para comandos de agenda.
- Idempotencia por chave de requisicao para comandos externos.
- Outbox pattern para eventos de integracao.

## 3.8 Eventos de dominio recomendados
- appointment.created
- appointment.confirmed
- appointment.cancelled
- appointment.no_show_marked
- appointment.completed
- payment.registered
- customer.blocked

## 3.9 Multi-tenant seguro
- tenant_id obrigatorio em todas as entidades de negocio.
- validacao de tenant no boundary de entrada.
- filtro automatico de tenant em repositorios.
- proibicao de joins cross-tenant sem autorizacao explicita.

## 3.10 Decisao tecnica sobre automacao de status
Recomendacao de big tech:
- status "em_atendimento" pode ser sugerido automaticamente por job;
- status "concluido" exige acao explicita ou regra de auto-close com SLA + grace period + trilha de auditoria;
- qualquer auto transicao precisa ser rastreavel (fonte: sistema).

## 3.11 Padrao de erros de dominio
- Erros de regra devem ser deterministas, com codigo estavel.
- Exemplo:
  - APPOINTMENT_CONFLICT_PROFESSIONAL
  - APPOINTMENT_CONFLICT_RESOURCE
  - APPOINTMENT_OUTSIDE_WORKING_HOURS
  - APPOINTMENT_MIN_NOTICE_VIOLATION
  - CUSTOMER_BLOCKED

## 3.12 Boas praticas de codigo
- Regras de negocio em metodos expressivos e pequenos.
- Evitar "if" complexo em controller; delegar para caso de uso.
- Nao misturar validacao de input com validacao de dominio.
- Testes de unidade focados em invariantes de agregado.
- Testes de contrato para adaptadores externos.