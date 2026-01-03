**PAIED Program: Detailed Curriculum for Month 8 – Advanced AI Integrations**

**Month Overview** This month focuses on **connecting AI systems to the real world**—secure APIs, multi-agent coordination, and **MCP (Model Context Protocol) servers** for dynamic tool/agent interactions. Building on Months 6–7 (agents \+ fine-tuned models), you'll create robust, production-like systems using **Supabase** (Edge Functions, auth), **Python**, and optional **Flutter/Next.js** frontends. Per our philosophy—"They may not believe the papers, but you will get paid for the working projects"—emphasize launching integrated demos that solve complex tasks.

By the end, you'll build and deploy an **end-to-end integrated AI system** (e.g., app with agents \+ fine-tuned model \+ MCP tools)—freelance gold\!

**Ethical AI Focus**: Secure data handling; transparent tool use; avoid over-reliance on external APIs.

**Resources Provided**: Free Supabase/Colab. Weekly live webinars (recorded). Mentor reviews. Community debugging.

**Weekly Effort**: 15 hours (non-workers) or 13 hours (workers). Use AI for scaffolding.

**Week 1: Integration Basics (Tools/APIs)**

**Objectives**: Master secure API connections; tool-calling in agents.

**Lessons & Topics** (2–3 hours/day):

1. **API Fundamentals** (Day 1): REST/GraphQL; headers, auth.  
2. **Secure Calls** (Day 2): Environment variables; Supabase secrets.  
3. **Tool Use in Agents** (Day 3): LangChain tools (e.g., weather/search).  
4. **Ethical API** (Day 4): Rate limits; privacy compliance.

**Resources**:

* **Video (EN)**: [REST API Tutorial](https://www.youtube.com/watch?v=7YcW25PHnAA) - Complete REST API guide.  
* **Video (PT)**: [Tutorial REST API](https://www.youtube.com/results?search_query=REST+API+tutorial+português) - Guia completo de REST API.  
* **Video (EN)**: [GraphQL Tutorial](https://www.youtube.com/results?search_query=graphql+tutorial) - GraphQL basics.  
* **Video (PT)**: [Tutorial GraphQL](https://www.youtube.com/results?search_query=graphql+tutorial+português) - Conceitos básicos de GraphQL.  
* **Video (EN)**: [API Authentication Methods](https://www.youtube.com/results?search_query=API+authentication) - JWT, OAuth, API keys.  
* **Video (PT)**: [Métodos de Autenticação API](https://www.youtube.com/results?search_query=autenticação+API+português) - JWT, OAuth, chaves API.  
* **Video (EN)**: [Environment Variables Tutorial](https://www.youtube.com/results?search_query=environment+variables+tutorial) - Secure configuration.  
* **Video (PT)**: [Tutorial Variáveis de Ambiente](https://www.youtube.com/results?search_query=variáveis+ambiente+português) - Configuração segura.  
* **Video (EN)**: [LangChain Tools Tutorial](https://www.youtube.com/results?search_query=langchain+tools) - Creating and using tools.  
* **Video (PT)**: [Tutorial Ferramentas LangChain](https://www.youtube.com/results?search_query=langchain+tools+português) - Criando e usando ferramentas.  
* **Video (EN)**: [API Rate Limiting](https://www.youtube.com/results?search_query=API+rate+limiting) - Best practices.  
* **Video (PT)**: [Rate Limiting de API](https://www.youtube.com/results?search_query=rate+limiting+API+português) - Melhores práticas.  
* **Docs (EN)**: [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions).  
* **Guide (EN)**: [LangChain Tools Guide](https://python.langchain.com/docs/modules/tools/).

**Hands-On Activities** (3–4 hours):

* Connect agent to public API (e.g., weather).

**Assignment**: Agent with 2 external tools.

**Week 2: MCP Servers and Secure Comms**

**Objectives**: Implement MCP for dynamic agent-tool links.

**Lessons & Topics** (2–3 hours/day):

1. **MCP Overview** (Day 1): 2026 standard for context/tool routing.  
2. **Server Setup** (Day 2): Python/FastAPI or Supabase Functions.  
3. **Protocol Handling** (Day 3): Context passing; tool registration.  
4. **Security** (Day 4): Encryption; auth tokens.

**Resources**:

* **Video (EN)**: [MCP Protocol Explained](https://www.youtube.com/results?search_query=MCP+model+context+protocol) - Understanding MCP.  
* **Video (PT)**: [Protocolo MCP Explicado](https://www.youtube.com/results?search_query=MCP+protocolo+português) - Entendendo MCP.  
* **Video (EN)**: [FastAPI Tutorial](https://www.youtube.com/results?search_query=fastapi+tutorial) - Building API servers.  
* **Video (PT)**: [Tutorial FastAPI](https://www.youtube.com/results?search_query=fastapi+tutorial+português) - Construindo servidores API.  
* **Video (EN)**: [Supabase Functions Tutorial](https://www.youtube.com/results?search_query=supabase+functions) - Serverless functions.  
* **Video (PT)**: [Tutorial Supabase Functions](https://www.youtube.com/results?search_query=supabase+functions+português) - Funções serverless.  
* **Video (EN)**: [API Security Best Practices](https://www.youtube.com/results?search_query=API+security) - Encryption and auth.  
* **Video (PT)**: [Melhores Práticas de Segurança API](https://www.youtube.com/results?search_query=segurança+API+português) - Criptografia e autenticação.  
* **Video (EN)**: [Context Passing in APIs](https://www.youtube.com/results?search_query=API+context+passing) - Managing context.  
* **Video (PT)**: [Passagem de Contexto em APIs](https://www.youtube.com/results?search_query=API+contexto+português) - Gerenciando contexto.  
* **Spec (EN)**: [MCP Spec](https://modelcontextprotocol.io/) (emerging 2026 docs via HF/LangChain).

**Hands-On Activities** (3–4 hours):

* Basic MCP server; connect agent.

**Assignment**: Agent using MCP for tool calls.

**Week 3: Security & Scaling (Supabase Edge Functions)**

**Objectives**: Build resilient, scalable integrations.

**Lessons & Topics** (2–3 hours/day):

1. **Edge Functions** (Day 1): Serverless Python in Supabase.  
2. **Auth/Security** (Day 2): Row-level security; JWT.  
3. **Scaling Patterns** (Day 3): Caching; rate limiting.  
4. **Monitoring** (Day 4): Logs; error ethics.

**Resources**:

* **Video**: [Supabase Edge Functions Complete Guide](https://www.youtube.com/results?search_query=supabase+edge+functions) - Serverless deployment.  
* **Video**: [Row-Level Security Tutorial](https://www.youtube.com/results?search_query=row+level+security) - Database security.  
* **Video**: [JWT Authentication Tutorial](https://www.youtube.com/results?search_query=JWT+authentication) - Token-based auth.  
* **Video**: [Caching Strategies](https://www.youtube.com/results?search_query=caching+strategies) - Performance optimization.  
* **Video**: [Rate Limiting Implementation](https://www.youtube.com/results?search_query=rate+limiting+implementation) - Protecting APIs.  
* **Video**: [API Monitoring and Logging](https://www.youtube.com/results?search_query=API+monitoring+logging) - Observability.  
* **Guide**: [Supabase Functions Scaling Guide](https://supabase.com/docs/guides/functions).

**Hands-On Activities** (3–4 hours):

* Deploy agent logic to Edge Functions.

**Assignment**: Secure integrated backend.

**Week 4: Multi-Modal and Real-Time Systems**

**Objectives**: Handle text/image/video; real-time flows.

**Lessons & Topics** (2–3 hours/day):

1. **Multi-Modal Basics** (Day 1): Vision/language models.  
2. **Real-Time** (Day 2): WebSockets; Supabase Realtime.  
3. **Combined Systems** (Day 3): Agent \+ multi-modal.  
4. **Final Ethics** (Day 4): Consent for media; transparency.

**Resources**:

* **Video (EN)**: [Multi-Modal AI Explained](https://www.youtube.com/results?search_query=multimodal+AI) - Text, image, video models.  
* **Video (PT)**: [IA Multi-Modal Explicada](https://www.youtube.com/results?search_query=IA+multimodal+português) - Modelos de texto, imagem, vídeo.  
* **Video (EN)**: [Vision-Language Models](https://www.youtube.com/results?search_query=vision+language+models) - Combining modalities.  
* **Video (PT)**: [Modelos Visão-Linguagem](https://www.youtube.com/results?search_query=modelos+visão+linguagem+português) - Combinando modalidades.  
* **Video (EN)**: [WebSockets Tutorial](https://www.youtube.com/results?search_query=websockets+tutorial) - Real-time communication.  
* **Video (PT)**: [Tutorial WebSockets](https://www.youtube.com/results?search_query=websockets+tutorial+português) - Comunicação em tempo real.  
* **Video (EN)**: [Supabase Realtime Tutorial](https://www.youtube.com/results?search_query=supabase+realtime) - Live data updates.  
* **Video (PT)**: [Tutorial Supabase Realtime](https://www.youtube.com/results?search_query=supabase+realtime+português) - Atualizações de dados ao vivo.  
* **Video (EN)**: [Real-Time AI Systems](https://www.youtube.com/results?search_query=realtime+AI+systems) - Building live AI apps.  
* **Video (PT)**: [Sistemas de IA em Tempo Real](https://www.youtube.com/results?search_query=sistemas+IA+tempo+real+português) - Construindo apps de IA ao vivo.  
* **Models (EN)**: [HF Multi-Modal Models](https://huggingface.co/models?pipeline_tag=image-to-text).

**Hands-On Activities** (3–4 hours):

* Add real-time/multi-modal to agent.

**Assignment**: Prepare milestone integration.

**Month 8 Milestone Project**

**Project**: Build/deploy an **integrated AI system** (e.g., Flutter/Next.js app \+ fine-tuned model \+ multi-agent via MCP \+ Supabase backend). Public live demo \+ GitHub. Include ethical/security notes. (6–8 hours total.) **Rubric**: Integration Complexity (40%), Security/Ethics (25%), Functionality (20%), Scalability (10%), Demo (5%). Mentor approval unlocks Month 9—your most advanced project yet\!

Systems connected—final month: capstones and career launch\!

 

