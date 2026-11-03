import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Terminal,
  Lightbulb,
} from 'lucide-react';
import { ChatMessage, UserProfile } from '../types';
import { playSound } from '../utils/sound';

interface ByteChatModalProps {
  user: UserProfile;
  onClose: () => void;
  onOpenPlaygroundWithCode?: (code: string, language: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome-1',
    role: 'assistant',
    content:
      'Hoo-hoo! 🦉 Olá, eu sou o **Byte**, seu tutor robótico de programação no ByteLingo!\n\nEstou aqui para tirar dúvidas de sintaxe, explicar conceitos de algoritmos, debugar códigos de Python, JavaScript, Rust, Java ou Lógica pura.\n\nSobre o que você gostaria de aprender ou praticar agora?',
    timestamp: 'agora',
  },
];

const SUGGESTED_QUESTIONS = [
  'Como funciona o Borrow Checker no Rust?',
  'Explique recursão com um exemplo em Python',
  'Qual a diferença entre let, const e var no JS?',
  'Como inverter uma string sem funções prontas?',
  'O que é complexidade Big-O de forma simples?',
];

export const ByteChatModal: React.FC<ByteChatModalProps> = ({
  user,
  onClose,
  onOpenPlaygroundWithCode,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('bytelingo_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    try {
      localStorage.setItem('bytelingo_chat_history', JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (contentToSend?: string) => {
    const text = (contentToSend || input).trim();
    if (!text || isLoading) return;

    playSound('click');
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userContext: {
            activeTrack: user.activeTrack,
            streak: user.streak,
            xp: user.xp,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API (${response.status})`);
      }

      const data = await response.json();
      const replyText = data.reply || 'Ops, tive uma pequena falha na conexão de dados. Pode repetir?';

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      playSound('correct');
    } catch (err: unknown) {
      console.error('Falha no chat do Byte:', err);
      const fallbackMessage: ChatMessage = {
        id: `assistant-fallback-${Date.now()}`,
        role: 'assistant',
        content:
          'Hoo! Parece que o servidor de inteligência está temporariamente offline, mas aqui vai uma dica de ouro: divida qualquer problema grande em funções pequenas de uma única responsabilidade!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    playSound('click');
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('bytelingo_chat_history');
    } catch {
      // Ignore
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    playSound('click');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Helper to render formatted markdown-like text with code blocks
  const renderMessageContent = (content: string, msgId: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const firstLine = lines[0].trim();
        const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
        const language = hasLang ? firstLine : '';
        const code = hasLang ? lines.slice(1).join('\n') : lines.join('\n');
        const codeBlockId = `${msgId}-block-${index}`;

        return (
          <div key={index} className="my-3 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 text-slate-100 text-xs">
            <div className="bg-slate-800/80 px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-700/60">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase">{language || 'código'}</span>
              </span>
              <button
                onClick={() => handleCopyCode(code, codeBlockId)}
                className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-0.5 rounded-md hover:bg-slate-700 transition-colors"
                title="Copiar código"
              >
                {copiedCodeId === codeBlockId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 overflow-x-auto font-mono text-xs leading-relaxed text-emerald-300 bg-slate-950/50">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Format bold text and inline code in normal paragraphs
      const lines = part.split('\n');
      return (
        <div key={index} className="space-y-1.5 leading-relaxed text-sm">
          {lines.map((line, lIdx) => {
            if (!line.trim()) return <div key={lIdx} className="h-1.5" />;

            // Simple parser for `inline code` and **bold**
            const segments = line.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
            return (
              <p key={lIdx}>
                {segments.map((seg, sIdx) => {
                  if (seg.startsWith('`') && seg.endsWith('`')) {
                    return (
                      <code
                        key={sIdx}
                        className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-semibold border border-slate-200 dark:border-slate-700"
                      >
                        {seg.slice(1, -1)}
                      </code>
                    );
                  }
                  if (seg.startsWith('**') && seg.endsWith('**')) {
                    return (
                      <strong key={sIdx} className="font-extrabold text-slate-900 dark:text-slate-100">
                        {seg.slice(2, -2)}
                      </strong>
                    );
                  }
                  return seg;
                })}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full h-[88vh] max-h-[760px] border-2 border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 transition-colors">
        {/* Header */}
        <div className="p-4 sm:px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between border-b-2 border-emerald-700 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl shadow-inner">
              🦉
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-white tracking-tight">Byte Tutor IA</h3>
                <span className="flex items-center gap-1 bg-emerald-500/80 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-lime-300 animate-pulse" />
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-emerald-100 text-xs">
                Seu mentor pessoal de código no ByteLingo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white transition-colors cursor-pointer"
              title="Limpar Conversa"
              aria-label="Limpar Conversa"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Fechar Chat"
              aria-label="Fechar Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50 dark:bg-slate-950 transition-colors">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center shrink-0 text-base shadow-xs">
                    🦉
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-2 border-slate-200/80 dark:border-slate-800 rounded-tl-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] mb-1 font-bold opacity-75">
                    <span>{isUser ? 'Você' : 'Byte Tutor'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className={isUser ? 'text-sm font-medium leading-relaxed whitespace-pre-wrap' : ''}>
                    {isUser ? msg.content : renderMessageContent(msg.content, msg.id)}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-base">
                🦉
              </div>
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 shadow-xs">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Byte está digitando</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length <= 3 && !isLoading && (
          <div className="px-4 py-2 bg-slate-100/80 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center gap-2 scrollbar-none">
            <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Perguntas Rápidas:
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="shrink-0 text-xs font-semibold px-3 py-1 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-full transition-colors shadow-2xs cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Message Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 flex items-center gap-2 transition-colors"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tire uma dúvida de código com o Byte..."
            disabled={isLoading}
            className="flex-1 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-hidden transition-all disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 hover:brightness-105 active:translate-y-0.5 active:border-b-0 text-white font-bold transition-all disabled:opacity-40 disabled:pointer-events-none shadow-sm cursor-pointer"
            aria-label="Enviar mensagem"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
