# Agenda Fácil - AI Development Guide (GEMINI.md)

Este arquivo é a bússola para o desenvolvimento auxiliado por IA no projeto Agenda Fácil. Ele define a identidade do projeto, mandatos arquiteturais, fluxos de trabalho com agentes e o ferramental de IA (Skills, Powers e MCPs).

## 1. Identidade e Missão
O **Agenda Fácil** é uma plataforma SaaS multi-tenant focada em negócios que vendem tempo e capacidade de atendimento (inicialmente beleza e saúde).
- **Core Problem:** Gestão de agenda, redução de no-show e automação de pagamentos.
- **Princípio Alpha:** O isolamento de dados por `tenant_id` e a integridade financeira (ledger) são inegociáveis.

## 2. Mandatos Arquiteturais (Guardrails)
Toda interação de IA deve respeitar e aplicar estes princípios:
- **Clean Architecture:** Domínio puro, Casos de Uso orquestradores, Infraestrutura em Adaptadores. A dependência sempre aponta para o Domínio.
- **Multi-tenancy Rigoroso:** Toda entidade de negócio e toda query DEVE conter `tenant_id`. Operações cross-tenant são proibidas por padrão.
- **Integridade Financeira:** Operações financeiras são `append-only`. Estornos são novos lançamentos compensatórios.
- **Test-First (Empirical Validation):** Mudanças em regras de negócio exigem novos testes ou atualização de testes existentes antes da implementação ser dada como concluída.

## 3. Fluxo de Trabalho com Agentes
Utilize os sub-agentes especializados para tarefas de alta complexidade:

| Agente | Quando Invocar (`invoke_agent`) |
| :--- | :--- |
| `product-strategist` | Refinamento de requisitos, análise de impacto de negócio e MVP. |
| `architecture-reviewer` | Revisão de design de sistema, novas camadas, isolamento de tenant. |
| `qa-risk-agent` | Análise de riscos, estratégia de testes e critérios de aceite. |
| `codebase_investigator` | Mapeamento de dependências e entendimento de fluxos legados. |

## 4. AI Toolbox

### 4.1 Skills (Especialistas de Domínio)
Ative via `activate_skill <skill_name>`:
- `architecture-guardian`: Valida camadas e isolamento de tenant.
- `rule-impact-analyzer`: Analisa impacto de novas regras no catálogo existente.
- `quality-gate-enforcer`: Garante que a release atenda aos critérios de qualidade.
- `financial-integrity-guardian`: (Novo) Valida imutabilidade e ledger financeiro.
- `security-and-privacy-guardian`: (Novo) Garante conformidade com LGPD e segurança de dados.

### 4.2 Powers (Prompts Operacionais)
Use para acelerar tarefas específicas:
- `power-refinar-escopo-mvp`: Decompõe ideias em tarefas de MVP.
- `power-revisar-pr-arquitetura`: Checklist rigoroso de PR.
- `power-go-live-readiness`: Check final pré-deploy.
- `avaliar-regra-negocio`: Valida consistência de novas regras funcionais.

### 4.3 MCPs (Contexto em Tempo Real)
Configurados em `.vscode/mcp.json`:
- `sequential-thinking`: Para raciocínio estruturado em problemas complexos.
- `playwright`: Para validação de fluxos UI/E2E.
- `github`: Para busca e contexto global do repositório.
- `context7`: Documentação de bibliotecas externas atualizada.

## 5. Gestão de Memória (Local Memory)
- Use `MEMORY.md` para registrar decisões locais do desenvolvedor (ex: "rodar comando X para migrar banco").
- Não registre segredos ou tokens na memória.
- Mantenha a memória concisa; a fonte da verdade para o projeto é a pasta `docs/`.

## 6. Checklist de Finalização (AI Definition of Done)
1. [ ] Código segue Clean Architecture?
2. [ ] `tenant_id` validado em todos os pontos de entrada/saída?
3. [ ] Testes de unidade e integração cobrem a nova lógica?
4. [ ] Se regra de negócio mudou, `docs/02-catalogo-regras-negocio.md` foi atualizado?
5. [ ] Se decisão arquitetural foi tomada, um novo ADR foi criado em `docs/04-adrs-arquitetura.md`?
