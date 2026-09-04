import React, { useState, useEffect, useRef } from 'react';

/**
 * Componentes Semánticos Reutilizables (Conversation API)
 */

// 1. Componente Message (Burbujas para la Usuaria "DU" y Bjoern AI)
export function ChatMessage({ role, content, children, avatarPath = '/panda-avatar.png' }) {
  const isAssistant = role === 'assistant';
  return (
    <div
      className={`flex items-end gap-2.5 sm:gap-3 transition-all animate-fade-in ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`max-w-[92%] sm:max-w-[80%] px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
          isAssistant
            ? 'bg-[#FAF8F5] border border-[#EBECE5] text-[#34312D] rounded-bl-none'
            : 'bg-white border border-[#EBECE5] text-[#34312D] font-normal rounded-br-none shadow-xs'
        }`}
      >
        {isAssistant && (
          <div className="text-[11px] font-semibold text-[#789340] mb-1.5 flex items-center gap-1.5">
            <span>Björn</span>
            <span class="text-[9px] text-[#746E68] font-normal">• Bamboo Assistant</span>
          </div>
        )}

        <div className="whitespace-pre-wrap">{content}</div>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}

// 2. Componente OptionButtons (Botones de selección de dominio / opción múltiple)
export function OptionButtons({ options, onSelect }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-1 w-full">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(option)}
          className="w-full sm:w-auto min-h-[44px] px-4 py-3 bg-white hover:bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:border-transparent hover:text-white border border-[#789340]/30 text-[#34312D] rounded-xl text-xs font-semibold flex items-center justify-center sm:justify-start gap-2 shadow-xs transition-all cursor-pointer group active:scale-[0.98]"
        >
          <span className="w-2 h-2 rounded-full bg-[#789340] group-hover:bg-white transition-colors flex-shrink-0"></span>
          <span>{option.label || option}</span>
        </button>
      ))}
    </div>
  );
}

// 3. Componente ConfirmationCard (Tarjeta de resumen con botones de acción [Crear] / [Cancelar])
export function ConfirmationCard({ title, details, onConfirm, onCancel }) {
  return (
    <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#EBECE5] shadow-xs space-y-3 w-full max-w-full">
      <div className="flex items-center justify-between border-b border-[#EBECE5] pb-2">
        <h4 className="font-semibold text-xs sm:text-sm text-[#34312D] flex items-center gap-1.5">
          <span className="text-emerald-500">🍃</span> {title}
        </h4>
        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
          -95% CO₂
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-[#746E68]">
        {details.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center gap-2">
            <span className="font-normal flex-shrink-0">{item.label}:</span>
            <span className="font-semibold text-[#34312D] truncate text-right">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-[#EBECE5]">
        <button
          onClick={onConfirm}
          className="flex-1 min-h-[44px] px-4 py-3 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Öko-Postfach erstellen</span>
        </button>
        <button
          onClick={onCancel}
          className="min-h-[44px] px-4 py-3 bg-gray-100 hover:bg-gray-200 text-[#746E68] text-xs font-medium rounded-lg transition-all cursor-pointer text-center"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}

// 4. Componente LoadingStatus (Estado intermedio animado)
export function LoadingStatus({ message }) {
  return (
    <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50/80 border border-emerald-200/60 text-emerald-800 rounded-2xl text-xs font-medium animate-pulse">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0"></span>
      <span>{message}</span>
    </div>
  );
}

// 5. Componente InlineTextInput (Input incrustado directamente en la tarjeta de la pregunta)
export function InlineTextInput({ placeholder = "Gewünschter Name (z. B. kontakt)...", buttonText = "Weiter", onSubmit }) {
  const [val, setVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!val.trim()) return;
    onSubmit(val.trim());
    setVal('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="w-full sm:flex-1 min-h-[44px] px-4 py-2.5 bg-white border border-[#EBECE5] focus:border-[#789340] rounded-xl text-xs sm:text-sm text-[#34312D] placeholder-[#746E68]/60 focus:outline-none focus:ring-2 focus:ring-[#789340]/20 transition-all font-['Space_Grotesk',sans-serif]"
        autoFocus
      />
      <button
        type="submit"
        disabled={!val.trim()}
        className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 font-['Space_Grotesk',sans-serif] active:scale-[0.98]"
      >
        <span>{buttonText}</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </form>
  );
}

// 6. Componente VisitorInfoCard (Tarjeta Informativa para Interesadas / Modo Visitante)
export function VisitorInfoCard({ title, subtitle, metrics = [], content, ctaText, onCtaClick }) {
  return (
    <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#EBECE5] shadow-xs space-y-3 w-full max-w-full">
      <div className="flex items-center justify-between border-b border-[#EBECE5] pb-2">
        <div>
          <h4 className="font-semibold text-xs sm:text-sm text-[#34312D] flex items-center gap-1.5">
            <span>🌿</span> {title}
          </h4>
          {subtitle && <p className="text-[10px] sm:text-[11px] text-[#746E68] mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#34312D] leading-relaxed">{content}</p>

      {metrics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
          {metrics.map((m, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-lg"
            >
              <span>{m.icon || '🌱'}</span>
              <span>{m.label}: {m.value}</span>
            </span>
          ))}
        </div>
      )}

      {ctaText && (
        <div className="pt-2 border-t border-[#EBECE5] flex justify-end">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer font-['Space_Grotesk',sans-serif] active:scale-[0.98]"
          >
            <span>{ctaText}</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Componente Principal de Chat Inteligente (BambooBjørn)
 * Soporta la simulación de flujos modulares (Conversation API)
 */
export default function BambooChat({ avatarPath = '/panda-avatar.png' }) {
  // Estado general de mensajes
  const [messages, setMessages] = useState([
    {
      id: 'welcome-panda',
      role: 'assistant',
      content:
        'Hallo! 🌿 Ich bin Björn, Ihr grüner Assistent bei Bamboo Björn. Ich bin hier, um Ihnen unser 100% ökologisches Grünes KI-Hosting vorzustellen. Wie kann ich Ihnen heute helfen?',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Estado del flujo conversacional MVP ('mail.create')
  const [flowState, setFlowState] = useState({
    activeFlow: null, // 'mail.create'
    step: 'IDLE', // 'SELECT_DOMAIN' | 'ENTER_NAME' | 'CONFIRM' | 'CREATING' | 'SUCCESS'
    mailboxName: '',
    selectedDomain: '',
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, flowState]);

  // Manejador del envío de texto del usuario (Respuestas para Visitantes / Interessentin)
  const handleSend = (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Si estamos esperando el nombre del buzón en el flujo mail.create
    if (flowState.activeFlow === 'mail.create' && flowState.step === 'ENTER_NAME') {
      processMailName(text);
      return;
    }

    const lower = text.toLowerCase();

    if (lower.includes('email') || lower.includes('e-mail') || lower.includes('konto') || lower.includes('correo') || lower.includes('erstellen')) {
      startMailCreateFlow();
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      let responseContent = '';
      if (lower.includes('vision') || lower.includes('was ist') || lower.includes('bamboo') || lower.includes('wer')) {
        responseContent = `BambooBjørn ist Europas führende Plattform für hochleistungsfähiges Grünes KI-Hosting. Unsere Mission ist die Dekarbonisierung der Cloud durch 100% erneuerbare Energie, Flüssigkeitskühlung und klimaneutrale KI-Server.`;
      } else if (lower.includes('nachhaltig') || lower.includes('energie') || lower.includes('co2') || lower.includes('kohlenstoff') || lower.includes('oeko')) {
        responseContent = `Unsere Architektur reduziert die Kohlenstoffemissionen im Vergleich zu herkömmlichen Rechenzentren um bis zu 95%. Unser gesamter Strom stammt direkt aus zertifizierten Solar- und Windquellen in Europa.`;
      } else if (lower.includes('server') || lower.includes('pue') || lower.includes('knoten') || lower.includes('frankfurt')) {
        responseContent = `Unsere Hauptknoten befinden sich strategisch in Frankfurt (Deutschland). Sie arbeiten mit einer ultraniedrigen Power Usage Effectiveness (PUE) von 1,12 und bieten direkte Abwärmenutzung für die umliegende Gemeinde.`;
      } else if (lower.includes('ai') || lower.includes('ki') || lower.includes('intelligenz') || lower.includes('mistral')) {
        responseContent = `Das Grüne KI-Hosting von BambooBjørn nutzt optimierte Modelle wie Mistral AI auf beschleunigter, CO₂-neutraler Hardware, um die Energieeffizienz pro Anfrage zu maximieren.`;
      } else {
        responseContent = `BambooBjørn kombiniert ökologische Infrastruktur und Spitzentechnologie für 100% CO₂-neutrale Web- und E-Mail-Dienste. Möchten Sie Ihr erstes Öko-Postfach erstellen oder unsere Kennzahlen kennenlernen?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
        },
      ]);
    }, 700);
  };

  // Iniciar flujo de creación de correo (Paso 1: Selección de Dominio)
  const startMailCreateFlow = () => {
    setFlowState({ activeFlow: 'mail.create', step: 'SELECT_DOMAIN', mailboxName: '', selectedDomain: '' });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Ausgezeichnet! Wir erstellen Ihr neues 100% ökologisches E-Mail-Postfach. Für welche Domain möchten Sie die neue E-Mail-Adresse erstellen?',
        },
      ]);
    }, 600);
  };

  // Paso 1 -> 2: Seleccionar dominio y solicitar el nombre del buzón
  const handleSelectDomain = (domain) => {
    setFlowState((prev) => ({ ...prev, step: 'ENTER_NAME', selectedDomain: domain }));
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: `Ausgewählte Domain: ${domain}` },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Perfekt, wir erstellen Ihre E-Mail unter @${domain} 🌿. Geben Sie den gewünschten Namen für Ihr Postfach ein (z. B. kontakt, hallo, info):`,
      },
    ]);
  };

  // Paso 2 -> 3: Procesar nombre del buzón y mostrar tarjeta de confirmación final
  const processMailName = (name) => {
    const cleanName = name.split('@')[0].toLowerCase().trim();
    setFlowState((prev) => ({ ...prev, step: 'CONFIRM', mailboxName: cleanName }));
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Alles bereit! Wir haben das Konfigurationsblatt für Ihre neue Öko-E-Mail vorbereitet. Bitte überprüfen Sie die Details vor der Erstellung:`,
        },
      ]);
    }, 600);
  };

  // Confirmar creación final (Simulación)
  const handleConfirmCreate = () => {
    setFlowState((prev) => ({ ...prev, step: 'CREATING' }));
    
    // Simular tiempo de aprovisionamiento en servidor (1.5s)
    setTimeout(() => {
      setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '' });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `🎉 Öko-Postfach erfolgreich erstellt! Ihre Adresse ${flowState.mailboxName}@${flowState.selectedDomain} ist jetzt auf dem Knoten Frankfurt Solar Grid mit kostenlosem SSL-Zertifikat und null CO₂-Emissionen aktiv.`,
        },
      ]);
    }, 1500);
  };

  // Cancelar flujo
  const handleCancelFlow = () => {
    setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '' });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: 'Erstellung abbrechen' },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Verstanden, die Operation wurde abgebrochen. Wie kann ich Ihnen heute weiterhelfen?' },
    ]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[600px] flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-[#FAF8F5]/90 backdrop-blur-xl border border-white/80 font-['Space_Grotesk',sans-serif] text-[#34312D] transition-all">
      {/* Inline styles para animación del avatar */}
      <style>{`
        @keyframes pandaFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(1deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(120, 147, 64, 0.25); }
          50% { box-shadow: 0 0 18px rgba(207, 97, 74, 0.4); }
        }
        .panda-avatar-animated {
          animation: pandaFloat 3.5s ease-in-out infinite, pulseGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Cabecera del Chat */}
      <header className="px-6 py-4 bg-[#34312D] text-white flex items-center justify-between border-b border-[#47433E]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <img
              src={avatarPath}
              alt="Panda Avatar"
              className="w-16 h-16 object-contain panda-avatar-animated filter drop-shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=BambooPanda';
              }}
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 border-2 border-[#34312D] rounded-full"></span>
          </div>
          <div>
            <h3 className="font-semibold text-base leading-tight tracking-wide flex items-center gap-1.5 font-['Space_Grotesk',sans-serif]">
              Björn AI <span className="text-[10px] bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] text-white px-2.5 py-0.5 rounded-full font-medium">Grünes Hosting</span>
            </h3>
            <p className="text-xs text-[#919D97]">Ökologischer Assistent • Bamboo Björn</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={startMailCreateFlow}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#789340] hover:bg-[#688235] text-white font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>+ Neues Öko-E-Mail</span>
          </button>
        </div>
      </header>

      {/* Área de Mensajes Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#FAF8F5] to-[#F8F8F8] custom-scrollbar">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} avatarPath={avatarPath} />
        ))}

        {/* Componente dinámico de Input de Texto en Línea (Incrustado en el flujo) */}
        {flowState.activeFlow === 'mail.create' && flowState.step === 'ENTER_NAME' && !isLoading && (
          <div className="ml-2 max-w-md animate-fade-in">
            <div className="p-4 bg-white rounded-2xl border border-[#EBECE5] shadow-xs">
              <span className="text-xs text-[#746E68] font-normal">Geben Sie den gewünschten Namen für Ihr neues Öko-Postfach ein:</span>
              <InlineTextInput
                placeholder="Gewünschter Name (z. B. kontakt, hallo)..."
                buttonText="Weiter"
                onSubmit={(val) => {
                  const userMsg = { id: Date.now().toString(), role: 'user', content: val };
                  setMessages((prev) => [...prev, userMsg]);
                  processMailName(val);
                }}
              />
            </div>
          </div>
        )}

        {/* Componente dinámico de Selección de Dominio */}
        {flowState.activeFlow === 'mail.create' && flowState.step === 'SELECT_DOMAIN' && !isLoading && (
          <div className="ml-2 animate-fade-in">
            <OptionButtons
              options={['bamboo-bjoern.eu', 'bamboo-eco.de', 'zero-carbon-mail.com']}
              onSelect={handleSelectDomain}
            />
          </div>
        )}

        {/* Componente dinámico de Tarjeta de Confirmación */}
        {flowState.activeFlow === 'mail.create' && flowState.step === 'CONFIRM' && !isLoading && (
          <div className="ml-2 animate-fade-in max-w-md">
            <ConfirmationCard
              title="Öko-Postfach Übersicht"
              details={[
                { label: 'Vollständige Adresse', value: `${flowState.mailboxName}@${flowState.selectedDomain}` },
                { label: 'Server', value: 'Frankfurt Solar Grid (EU)' },
                { label: 'Sicherheit', value: 'Kostenloses Wildcard-SSL' },
                { label: 'CO₂-Fußabdruck', value: '100% Erneuerbare Energie' },
              ]}
              onConfirm={handleConfirmCreate}
              onCancel={handleCancelFlow}
            />
          </div>
        )}

        {/* Componente dinámico de Estado de Carga / Creación */}
        {flowState.activeFlow === 'mail.create' && flowState.step === 'CREATING' && (
          <div className="ml-2 animate-fade-in max-w-sm">
            <LoadingStatus message="Björn richtet Ihr 100% CO₂-neutrales Postfach ein..." />
          </div>
        )}

        {/* Indicador visual de pensando */}
        {isLoading && (
          <div className="flex items-end gap-3 justify-start">
            <div className="bg-[#FAF8F5] border border-[#EBECE5] px-4 py-3 rounded-2xl rounded-bl-none shadow-xs flex items-center gap-1.5">
              <span className="text-xs text-[#746E68] font-medium mr-1">Björn denkt nach</span>
              <span className="w-1.5 h-1.5 bg-[#789340] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-[#789340] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#CF614A] rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de Entrada de Texto Libre (TextInput siempre accesible) */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-[#FAF8F5]/90 border-t border-[#EBECE5] flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              flowState.step === 'ENTER_NAME'
                ? 'Gewünschten Namen eingeben (z. B. kontakt)...'
                : 'Schreiben Sie eine Nachricht oder Frage zum grünen Hosting...'
            }
            className="w-full pl-4 pr-10 py-3 bg-white border border-[#EBECE5] rounded-2xl text-sm text-[#34312D] placeholder-[#746E68]/70 focus:outline-none focus:ring-2 focus:ring-[#789340]/40 focus:border-[#789340] transition-all font-['Space_Grotesk',sans-serif]"
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-5 py-3 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer font-['Space_Grotesk',sans-serif]"
        >
          <span>Senden</span>
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
