export interface MessageOptions {
  role: "system" | "user" | "assistant" | "function",
  content: string,
}

export interface FunctionToolOptions {
  type: "function",
  function: {
    name: string,
    descriptions: string,
    parameters: object
  }
}

export interface RetrievalToolOptions {
  type: "retrieval",
  retrieval: {
    knowledge_id: string,
    prompt_template: string
  }
}

export interface WebSearchToolOptions {
  type: "web_search",
  web_search: {
    enable: boolean,
    search_query?: string,
    search_result?: boolean,
    search_prompt?: string
  }
}

export type ToolOptions = FunctionToolOptions | RetrievalToolOptions | WebSearchToolOptions;

export interface CreateCompletionsOptions {
  model: string,
  messages: Array<MessageOptions>,
  requestId?: string,
  doSample?: boolean,
  stream?: boolean | 'append',
  temperature?: number,
  topP?: number,
  maxTokens?: number,
  seed?: number,
  stop?: Array<string>,
  tools?: Array<ToolOptions>,
  toolChoice?: string,
}

export interface CreateCompletionsResponse {
  id: string,
  created: number,
  choices: Array<{
    index: number,
    finish_reason: string,
    delta: { role: string, content: string },
    tool_calls?: Array<{
      function: {
        name: string,
        arguments: string,
      },
      id: string,
      type: string
    }>,
    message?: string,
  }>,
  usage?: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number,
  },
  web_search?: {
    icon: string,
    title: string,
    link: string,
    media: string,
    content: string
  }
}