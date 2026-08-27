import React, { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';

/**
 * Componente de Chat Inteligente para Bamboo Bjoern
 * Basado en Tailwind CSS y @ai-sdk/react
 */
export default function BambooChat({ avatarPath = '/panda-avatar.png', apiPath = '/api/chat' }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: apiPath,
    initialMessages: [
      {
        id: 'welcome-panda',
        role: 'assistant',
        content:
          '¡Hola! 🌿 Soy Björn, tu asistente verde en Bamboo Bjoern. Estoy aquí para ayudarte a elegir el mejor hosting 100% ecológico y de alto rendimiento para tus proyectos. ¿En qué puedo orientarte hoy?',
      },
    ],
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="w-full max-w-2xl mx-auto h-[600px] flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-xl border border-white/60 font-sans text-slate-800 transition-all">
      {/* Inline styles para animación sutil del avatar de panda */}
      <style>{`
        @keyframes pandaFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(1deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(114, 152, 96, 0.2); }
          50% { box-shadow: 0 0 18px rgba(114, 152, 96, 0.45); }
        }
        .panda-avatar-animated {
          animation: pandaFloat 3.5s ease-in-out infinite, pulseGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Cabecera del Chat */}
      <header className="px-6 py-4 bg-[#142E23] text-white flex items-center justify-between border-b border-[#234E3C]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <img
              src={avatarPath}
              alt="Panda Avatar"
              className="w-12 h-12 object-contain panda-avatar-animated filter drop-shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=BambooPanda';
              }}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#142E23] rounded-full"></span>
          </div>
          <div>
            <h3 className="font-semibold text-base leading-tight tracking-wide flex items-center gap-1.5">
              Björn AI <span className="text-[10px] bg-[#729860]/30 text-[#E4EEE1] px-2 py-0.5 rounded-full border border-[#729860]/40 font-normal">Hosting Verde</span>
            </h3>
            <p className="text-xs text-[#919D97]">Asistente Ecológico • Bamboo Bjoern</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#234E3C] text-[#E4EEE1] border border-white/10 font-medium">
            100% Renewable 🍃
          </span>
        </div>
      </header>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#F7F8F4]/80 to-white/60 custom-scrollbar">
        {messages.map((message) => {
          const isAssistant = message.role === 'assistant';
          return (
            <div
              key={message.id}
              className={`flex items-end gap-3 ${
                isAssistant ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Avatar del panda para mensajes del asistente */}
              {isAssistant && (
                <div className="flex-shrink-0 mb-1">
                  <img
                    src={avatarPath}
                    alt="Björn Panda"
                    className="w-14 h-14 object-contain panda-avatar-animated filter drop-shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=BambooPanda';
                    }}
                  />
                </div>
              )}

              {/* Burbuja del mensaje */}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
                  isAssistant
                    ? 'bg-white border border-[#EBECE5] text-[#1C201D] rounded-bl-none shadow-stone-200/50'
                    : 'bg-[#142E23] text-white rounded-br-none shadow-[#142E23]/20'
                }`}
              >
                {/* Etiqueta distintiva del Panda */}
                {isAssistant && (
                  <div className="text-[11px] font-semibold text-[#729860] mb-1 flex items-center gap-1">
                    <span>Björn</span>
                    <span className="text-[9px] text-[#69756F] font-normal">• Bamboo Assistant</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          );
        })}

        {/* Indicador visual de "pensando..." */}
        {isLoading && (
          <div className="flex items-end gap-3 justify-start">
            <div className="flex-shrink-0 mb-1">
              <img
                src={avatarPath}
                alt="Björn Panda Pensando"
                className="w-12 h-12 object-contain panda-avatar-animated filter drop-shadow-md"
                onError={(e) => {
                  e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=BambooPanda';
                }}
              />
            </div>
            <div className="bg-white border border-[#EBECE5] px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
              <span className="text-xs text-[#69756F] font-medium mr-1">Björn está pensando</span>
              <span className="w-1.5 h-1.5 bg-[#729860] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-[#729860] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#729860] rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de Entrada */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white/90 border-t border-[#EBECE5] flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Pregunta sobre nuestros servidores eco, rendimiento..."
            className="w-full pl-4 pr-10 py-3 bg-[#F7F8F4] border border-[#DCDDD4] rounded-xl text-sm text-[#1C201D] placeholder-[#69756F] focus:outline-none focus:ring-2 focus:ring-[#729860]/50 focus:border-[#729860] transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-3 bg-[#729860] hover:bg-[#5e804f] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-[#729860]/20 active:scale-95 transition-all"
        >
          <span>Enviar</span>
          <svg
            className="w-4 h-4 transform rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19V5m0 0l-7 7m7-7l7 7"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
