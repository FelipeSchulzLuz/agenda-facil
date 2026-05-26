# 10 - MCP Setup e Governanca

## 10.1 MCPs configurados
Arquivo de configuracao:
- .vscode/mcp.json

Servidores configurados:
- context7: documentacao de bibliotecas atualizada
- sequential-thinking: decomposicao estruturada de problemas complexos
- playwright: testes e automacao de fluxos web
- github: busca e contexto de codigo em repositorios

## 10.2 Variaveis de ambiente
Crie variaveis locais com base em .env.example:
- CONTEXT7_API_KEY
- GITHUB_TOKEN

## 10.3 Boas praticas de uso
1. Nao salvar tokens no repositorio.
2. Usar MCP apenas quando agrega evidencia objetiva.
3. Documentar no PR quando decisao dependeu de MCP externo.
4. Priorizar regras internas do projeto quando houver conflito com exemplo externo.

## 10.4 Quality controls com MCP
- Context7: validar uso correto de libs antes de implementar.
- Sequential thinking: validar plano de mudanca em regras criticas.
- Playwright: validar fluxo de ponta a ponta para agendamento e cancelamento.
- GitHub: validar padroes de implementacao e anti-padroes.

## 10.5 Checklist de seguranca
- [ ] Token com escopo minimo necessario
- [ ] Token rotacionado periodicamente
- [ ] Sem logs com credenciais
- [ ] Ambiente de dev separado de producao

## 10.6 Nota de compatibilidade
Dependendo da versao local do cliente MCP, nomes de pacotes podem variar. Se algum servidor nao iniciar, ajuste command/args mantendo a mesma governanca de seguranca e auditoria.
