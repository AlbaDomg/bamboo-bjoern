import React, { useState, useEffect, useRef } from 'react';
import BjornAvatar from './BjornAvatar';

/**
 * Componentes Semánticos Reutilizables (Conversation API)
 */

// 1. Componente Message (Burbujas para la Usuaria "DU" y Bjoern AI)
export function ChatMessage({ role, content, children, avatarPath = 'assets/LaptopPanda_transparent.png' }) {
  const isAssistant = role === 'assistant';
  return (
    <div
      className={`flex items-end gap-2.5 sm:gap-3 transition-all animate-fade-in ${isAssistant ? 'justify-start' : 'justify-end'
        }`}
    >
      <div
        className={`max-w-[92%] sm:max-w-[85%] px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${isAssistant
          ? 'bg-[#FAF8F5] border border-[#EBECE5] text-[#34312D] rounded-bl-none'
          : 'bg-white border border-[#EBECE5] text-[#34312D] font-normal rounded-br-none shadow-xs'
          }`}
      >
        {isAssistant && (
          <div className="text-[11px] font-semibold text-[#789340] mb-1.5 flex items-center gap-1.5">
            <span>Bjørn</span>
            <span className="text-[9px] text-[#746E68] font-normal">• KI-Assistent</span>
          </div>
        )}

        {content && <div className="whitespace-pre-wrap">{content}</div>}
        {children && <div className="mt-2">{children}</div>}
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
          className="w-full sm:w-auto min-h-[44px] px-4 py-3 bg-white hover:bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:border-transparent hover:text-white border border-[#789340]/30 text-[#34312D] rounded-xl text-xs font-semibold flex items-center justify-center sm:justify-start gap-2 shadow-xs transition-all cursor-pointer group"
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
          className="flex-1 min-h-[44px] px-4 py-3 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
        className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 font-['Space_Grotesk',sans-serif]"
      >
        <span>{buttonText}</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </form>
  );
}

// 5b. Componente RoleSelectionCard (Bifurcación inicial conversacional de roles)
export function RoleSelectionCard({ onSelectRole }) {
  return (
    <div className="mt-3 p-5 sm:p-6 bg-[#FAF8F5] border border-[#EBECE5] text-[#34312D] rounded-3xl rounded-tl-xs text-sm leading-relaxed shadow-xs w-full font-['Space_Grotesk',sans-serif] animate-fade-in">
      <div className="text-[11px] font-semibold text-[#789340] mb-3 flex items-center gap-1.5">
        <span>Bjørn</span>
        <span className="text-[9px] text-[#746E68] font-normal">• KI-Assistent</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="flex-1 space-y-3 w-full">
          <div>
            <p className="font-semibold text-forest text-base mb-1">Willkommen bei Bamboo Bjørn! 🌿</p>
            <p className="text-charcoal-muted font-normal text-xs sm:text-sm">
              Bitte wählen Sie Ihren Zugangsmodus, um fortzufahren:
            </p>
          </div>

          {/* Botones de Decisión Rápida (Pastillas en vertical) */}
          <div className="flex flex-col gap-2.5 pt-6 w-full">
            <button
              onClick={() => onSelectRole(true)}
              className="w-full min-h-[44px] px-4 py-3 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ich bin bereits Kunde</span>
            </button>
            <button
              onClick={() => onSelectRole(false)}
              className="w-full min-h-[44px] px-4 py-3 bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-[#EBECE5] text-[#34312D] rounded-xl text-xs sm:text-sm font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ich möchte mich informieren</span>
            </button>
          </div>
        </div>
        <video
          src="assets/PandaVideo_sin_fondo.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-28 h-28 sm:w-32 sm:h-32 lg:w-48 lg:h-48 object-contain flex-shrink-0 drop-shadow-xs order-first sm:order-last mx-auto sm:mx-0 self-center sm:self-start"
        />
      </div>
    </div>
  );
}

// 6. Componente CustomerProductsCard (Fase 3: Listado de productos activos de la clienta en tiempo real)
export function CustomerProductsCard({ onConfigureDns, onRenewDomain, onAddMailbox, onConfigureKvm, onRebootKvm, kvmSpecs }) {
  return (
    <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#789340]/20 shadow-sm space-y-4 w-full text-[#34312D] font-['Space_Grotesk',sans-serif]">
      {/* Header Cliente Autenticada */}
      <div className="flex items-center justify-between border-b border-[#EBECE5] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#789340]/15 text-[#789340] flex items-center justify-center font-bold text-xs border border-[#789340]/30 shadow-xs">
            AD
          </div>
          <div>
            <h4 className="font-semibold text-xs sm:text-sm text-[#34312D]">Alba Domínguez</h4>
            <p className="text-[10px] text-[#746E68]">Green Design Studio • Active Öko-Kundin</p>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Alle Systeme Aktiv
        </span>
      </div>

      {/* Grid de Productos Activos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Producto 1: Dominios */}
        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBECE5] flex flex-col justify-between space-y-3 hover:border-[#789340]/40 transition-all shadow-2xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#746E68] flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#746E68] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>Active Domain</span>
              </span>
              <span className="text-[9px] bg-emerald-100/80 text-emerald-800 px-1.5 py-0.5 rounded font-medium border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>SSL OK</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#34312D] mt-1.5 truncate">bamboo-bjoern.eu</p>
            <p className="text-[10px] text-[#746E68] mt-0.5">Frankfurt Solar Node 1</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onConfigureDns}
              className="flex-1 min-h-[32px] px-2 py-1.5 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white text-[10px] font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
            >
              <svg className="w-3 h-3 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>DNS verwalten</span>
            </button>
            <button
              onClick={onRenewDomain}
              className="flex-1 min-h-[32px] px-2 py-1.5 bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 border border-[#EBECE5] text-[#34312D] text-[10px] font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
            >
              <svg className="w-3 h-3 text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Verlängern</span>
            </button>
          </div>
        </div>

        {/* Producto 2: Buzones de Correo con Almacenamiento Verde */}
        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBECE5] flex flex-col justify-between space-y-3 hover:border-[#789340]/40 transition-all shadow-2xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#746E68] flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#746E68] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Öko-Postfächer</span>
              </span>
              <span className="text-[9px] bg-emerald-100/80 text-emerald-800 px-1.5 py-0.5 rounded font-medium border border-emerald-200">
                2 / 5
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#34312D] mt-1.5 truncate">2 von 5 Postfächern aktiv</p>

            {/* Indicator de Almacenamiento */}
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[10px] text-[#746E68]">
                <span>Speicherplatz</span>
                <span className="font-medium text-[#789340]">2,4 GB / 10 GB</span>
              </div>
              <div className="w-full h-2 bg-[#EBECE5] rounded-full overflow-hidden">
                <div className="h-full bg-[linear-gradient(90deg,#789340,#5e7432)] rounded-full w-[24%] transition-all"></div>
              </div>
            </div>
          </div>
          <button
            onClick={onAddMailbox}
            className="w-full min-h-[36px] px-3 py-2 bg-white hover:bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:text-white hover:border-transparent border border-[#789340]/30 text-[#34312D] text-[11px] font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 group"
          >
            <svg className="w-3.5 h-3.5 text-[#789340] group-hover:text-white transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Neues Postfach hinzufügen</span>
          </button>
        </div>

        {/* Producto 3: Servidor KVM Ecológico */}
        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBECE5] flex flex-col justify-between space-y-3 hover:border-[#789340]/40 transition-all shadow-2xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#746E68] flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#746E68] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                <span>Server KVM-01</span>
              </span>
              <span className="text-[9px] bg-emerald-100/80 text-emerald-800 px-1.5 py-0.5 rounded font-medium border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#34312D] mt-1.5 truncate">Frankfurt - Solar Powered</p>
            <p className="text-[10px] text-[#746E68] mt-0.5 font-medium">
              {kvmSpecs ? `${kvmSpecs.vcpu} • ${kvmSpecs.ram} • ${kvmSpecs.nvme}` : '8 vCPU • 16 GB RAM • 160 GB NVMe'}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onRebootKvm}
              className="flex-1 min-h-[32px] px-2 py-1.5 bg-white hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 border border-[#EBECE5] text-[#34312D] text-[10px] font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
            >
              <svg className="w-3 h-3 text-stone-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Neustarten</span>
            </button>
            <button
              onClick={onConfigureKvm}
              className="flex-1 min-h-[32px] px-2 py-1.5 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white text-[10px] font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
            >
              <svg className="w-3 h-3 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Konfigurieren</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6b. Componente KvmServerCard (Tarjeta de Producto Servidor Virtual KVM)
export function KvmServerCard({ serverName = "KVM-01", kvmSpecs, onReboot, onConfigure }) {
  return (
    <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#EBECE5] shadow-xs space-y-4 w-full text-[#34312D] font-['Space_Grotesk',sans-serif]">
      <div className="flex items-start justify-between border-b border-[#EBECE5] pb-3 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm sm:text-base text-[#34312D]">Server {serverName}</h4>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
              Online
            </span>
          </div>
          <p className="text-xs text-[#746E68] mt-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#789340] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Frankfurt - Solar Powered
          </p>
        </div>
        <span className="text-[10px] bg-[#789340]/10 text-[#789340] px-2.5 py-1 rounded-full font-semibold border border-[#789340]/20 flex-shrink-0">
          100% Öko-Energie
        </span>
      </div>

      {/* Grid de Especificaciones Técnicas */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#EBECE5]">
          <span className="text-[10px] text-[#746E68] block font-medium">vCPU</span>
          <span className="text-xs sm:text-sm font-bold text-[#34312D] mt-0.5 block">{kvmSpecs?.vcpu || '8 vCPU'}</span>
        </div>
        <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#EBECE5]">
          <span className="text-[10px] text-[#746E68] block font-medium">RAM</span>
          <span className="text-xs sm:text-sm font-bold text-[#34312D] mt-0.5 block">{kvmSpecs?.ram || '16 GB RAM'}</span>
        </div>
        <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#EBECE5]">
          <span className="text-[10px] text-[#746E68] block font-medium">Disco NVMe</span>
          <span className="text-xs sm:text-sm font-bold text-[#34312D] mt-0.5 block">{kvmSpecs?.nvme || '160 GB NVMe'}</span>
        </div>
      </div>

      {/* Acciones de Administración */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        <button
          onClick={onReboot}
          className="w-full sm:flex-1 min-h-[38px] px-3.5 py-2 bg-white hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 border border-[#EBECE5] text-[#34312D] text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <svg className="w-3.5 h-3.5 text-stone-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Server neustarten</span>
        </button>
        <button
          onClick={onConfigure}
          className="w-full sm:flex-1 min-h-[38px] px-3.5 py-2 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
        >
          <svg className="w-3.5 h-3.5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Konfigurieren</span>
        </button>
      </div>
    </div>
  );
}

// 6e. Componente KvmConfigPanel (Formulario y selector integrado de configuración)
export function KvmConfigPanel({ initialSpecs, onSave, onCancel }) {
  const [vcpu, setVcpu] = useState(initialSpecs?.vcpu || '8 vCPU');
  const [ram, setRam] = useState(initialSpecs?.ram || '16 GB RAM');
  const [nvme, setNvme] = useState(initialSpecs?.nvme || '160 GB NVMe');

  const vcpuOptions = ['2 vCPU', '4 vCPU', '8 vCPU', '16 vCPU'];
  const ramOptions = ['4 GB RAM', '8 GB RAM', '16 GB RAM', '32 GB RAM'];
  const nvmeOptions = ['100 GB NVMe', '160 GB NVMe', '320 GB NVMe', '640 GB NVMe'];

  return (
    <div className="mt-3 p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#789340]/30 shadow-sm w-full text-[#34312D] font-['Space_Grotesk',sans-serif] animate-fade-in">
      <div className="text-[11px] font-semibold text-[#789340] mb-3 flex items-center gap-1.5">
        <span>Bjørn</span>
        <span className="text-[9px] text-[#746E68] font-normal">• KI-Assistent</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        {/* Avatar AdminPanda grande arriba en responsive / derecho en desktop */}
        <div className="sm:order-last mx-auto sm:mx-0 self-center sm:self-start pt-2 flex-shrink-0">
          <BjornAvatar pose="admin" altText="AdminPanda KVM Konfiguration" className="w-40 h-40 sm:w-52 sm:h-52" animationType="zoom" />
        </div>

        <div className="flex-1 space-y-4 w-full sm:order-first">
          <div className="flex items-center justify-between border-b border-[#EBECE5] pb-2.5">
            <div>
              <h4 className="font-semibold text-xs sm:text-sm text-[#34312D]">
                KVM-01 Konfiguration
              </h4>
              <p className="text-[10px] text-[#746E68] mt-0.5">Skalierung der Ressourcen für den Server Frankfurt - Solar Powered</p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded font-medium flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Hot-Plug Aktiv</span>
            </span>
          </div>

          {/* Selector vCPU */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#746E68] block">vCPU Prozessor</label>
            <div className="grid grid-cols-4 gap-1.5">
              {vcpuOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setVcpu(opt)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${vcpu === opt
                    ? 'bg-[#789340] text-white border-[#789340]'
                    : 'bg-[#FAF8F5] text-[#34312D] border-[#EBECE5] hover:border-[#789340]/40'
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Selector RAM */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#746E68] block">Arbeitsspeicher (RAM)</label>
            <div className="grid grid-cols-4 gap-1.5">
              {ramOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRam(opt)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${ram === opt
                    ? 'bg-[#789340] text-white border-[#789340]'
                    : 'bg-[#FAF8F5] text-[#34312D] border-[#EBECE5] hover:border-[#789340]/40'
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Selector NVMe */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#746E68] block">NVMe-Speicher</label>
            <div className="grid grid-cols-4 gap-1.5">
              {nvmeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setNvme(opt)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${nvme === opt
                    ? 'bg-[#789340] text-white border-[#789340]'
                    : 'bg-[#FAF8F5] text-[#34312D] border-[#EBECE5] hover:border-[#789340]/40'
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Acciones del formulario */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#EBECE5]">
            <button
              onClick={() => onSave({ vcpu, ram, nvme })}
              className="flex-1 min-h-[38px] px-4 py-2 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Konfiguration speichern</span>
            </button>
            {onCancel && (
              <button
                onClick={onCancel}
                className="min-h-[38px] px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#746E68] text-xs font-medium rounded-xl transition-all cursor-pointer"
              >
                Abbrechen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 6f. Componente KvmConfigConfirmationCard (Confirmación de reconfiguración)
export function KvmConfigConfirmationCard({ serverName = "KVM-01", targetSpecs, onConfirm, onCancel }) {
  return (
    <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#EBECE5] shadow-xs space-y-3.5 w-full max-w-md font-['Space_Grotesk',sans-serif]">
      <div className="border-b border-[#EBECE5] pb-2.5">
        <h4 className="font-semibold text-xs sm:text-sm text-[#34312D]">
          Möchten Sie die neue Konfiguration auf den Server {serverName} anwenden?
        </h4>
        <p className="text-[11px] text-[#746E68] mt-1 leading-normal">
          Die Ressourcen werden dynamisch auf dem Knoten Frankfurt - Solar Powered zugewiesen.
        </p>
      </div>

      <div className="space-y-1.5 text-xs text-[#746E68] bg-[#FAF8F5] p-3 rounded-xl border border-[#EBECE5]">
        <div className="flex justify-between items-center">
          <span className="font-normal">Server:</span>
          <span className="font-semibold text-[#34312D]">{serverName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-normal">Neue Ressourcen:</span>
          <span className="font-semibold text-[#789340]">
            {targetSpecs?.vcpu} • {targetSpecs?.ram} • {targetSpecs?.nvme}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-normal">Knoten:</span>
          <span className="font-medium text-[#34312D]">Frankfurt - Solar Powered</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-[#EBECE5]">
        <button
          onClick={onConfirm}
          className="flex-1 min-h-[42px] px-4 py-2.5 bg-[#789340] hover:bg-[#688235] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center cursor-pointer"
        >
          Ja, Änderungen anwenden
        </button>
        <button
          onClick={onCancel}
          className="min-h-[42px] px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#34312D] text-xs font-medium rounded-xl transition-all cursor-pointer text-center"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}

// 6g. Componente KvmConfigProgressStatus (Aplicando cambios...)
export function KvmConfigProgressStatus({ serverName = "KVM-01" }) {
  return (
    <div className="flex flex-col gap-2.5 p-4 bg-emerald-50/90 border border-emerald-200/80 text-emerald-900 rounded-2xl text-xs font-medium font-['Space_Grotesk',sans-serif] animate-fade-in">
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping flex-shrink-0"></span>
        <span className="font-semibold text-emerald-900">Neue Konfiguration wird auf {serverName} angewendet...</span>
      </div>
      <div className="w-full h-1.5 bg-emerald-200/70 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full w-3/4 animate-pulse"></div>
      </div>
      <span className="text-[10px] text-emerald-800/80 font-normal">
        vCPU-Kerne, Arbeitsspeicher und NVMe-Speicher werden auf dem Knoten Frankfurt - Solar Powered neu zugewiesen...
      </span>
    </div>
  );
}

// 6c. Componente KvmConfirmationCard (Interfaz de Confirmación para acciones críticas)
export function KvmConfirmationCard({ serverName = "KVM-01", onConfirm, onCancel }) {
  return (
    <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#EBECE5] shadow-xs space-y-3.5 w-full max-w-md font-['Space_Grotesk',sans-serif]">
      <div className="border-b border-[#EBECE5] pb-2.5">
        <h4 className="font-semibold text-xs sm:text-sm text-[#34312D]">
          Möchten Sie den Server {serverName} jetzt neustarten?
        </h4>
        <p className="text-[11px] text-[#746E68] mt-1 leading-normal">
          Diese Aktion meidet ein Neustart-Signal und setzt aktive Verbindungen während des Vorgangs zurück.
        </p>
      </div>

      <div className="space-y-1.5 text-xs text-[#746E68] bg-[#FAF8F5] p-3 rounded-xl border border-[#EBECE5]">
        <div className="flex justify-between items-center">
          <span className="font-normal">Server:</span>
          <span className="font-semibold text-[#34312D]">{serverName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-normal">Standort:</span>
          <span className="font-medium text-[#789340]">Frankfurt - Solar Powered</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-normal">Spezifikationen:</span>
          <span className="font-medium text-[#34312D]">8 vCPU • 16 GB RAM • 160 GB NVMe</span>
        </div>
      </div>

      {/* Botones planos, limpios y profesionales (sin emojis) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-[#EBECE5]">
        <button
          onClick={onConfirm}
          className="flex-1 min-h-[42px] px-4 py-2.5 bg-[#CF614A] hover:bg-[#b8523c] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center cursor-pointer"
        >
          Ja, neustarten
        </button>
        <button
          onClick={onCancel}
          className="min-h-[42px] px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#34312D] text-xs font-medium rounded-xl transition-all cursor-pointer text-center"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}

// 6d. Componente KvmProgressStatus (Estado intermedio de reinicio en progreso)
export function KvmProgressStatus({ serverName = "KVM-01" }) {
  return (
    <div className="flex flex-col gap-2.5 p-4 bg-amber-50/90 border border-amber-200/80 text-amber-900 rounded-2xl text-xs font-medium font-['Space_Grotesk',sans-serif] animate-fade-in">
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping flex-shrink-0"></span>
        <span className="font-semibold text-amber-900">Reiniciando {serverName}...</span>
      </div>
      <div className="w-full h-1.5 bg-amber-200/70 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 rounded-full w-2/3 animate-pulse"></div>
      </div>
      <span className="text-[10px] text-amber-800/80 font-normal">
        Enviando secuencia de reinicio limpia al nodo Frankfurt - Solar Powered...
      </span>
    </div>
  );
}

// 7. Componente DnsConfigCard (Configuración y gestión rápida de DNS)
export function DnsConfigCard({ domain = 'bamboo-bjoern.eu' }) {
  const records = [
    { type: 'A', host: '@', value: '185.199.108.153', ttl: '3600', status: 'Aktiv' },
    { type: 'AAAA', host: '@', value: '2a04:4e42::644', ttl: '3600', status: 'Aktiv' },
    { type: 'MX', host: '@', value: '10 mail.bamboo-bjoern.eu', ttl: '3600', status: 'Aktiv' },
    { type: 'TXT', host: '_spf', value: 'v=spf1 include:_spf.bamboo-bjoern.eu ~all', ttl: '3600', status: 'Aktiv' },
  ];

  return (
    <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#EBECE5] shadow-xs w-full text-[#34312D]">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center justify-between border-b border-[#EBECE5] pb-2">
            <h4 className="font-semibold text-xs sm:text-sm text-[#34312D] flex items-center gap-1.5">
              <span>⚙️</span> DNS-Zone: <span className="text-[#789340] font-mono">{domain}</span>
            </h4>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200 flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>DNSSEC Aktiv</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-[#EBECE5] text-[#746E68]">
                  <th className="py-1.5 px-2 font-semibold">Typ</th>
                  <th className="py-1.5 px-2 font-semibold">Host</th>
                  <th className="py-1.5 px-2 font-semibold">Wert</th>
                  <th className="py-1.5 px-2 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBECE5]/60 font-mono text-[10px]">
                {records.map((r, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]">
                    <td className="py-2 px-2 font-bold text-[#789340]">{r.type}</td>
                    <td className="py-2 px-2 text-[#34312D]">{r.host}</td>
                    <td className="py-2 px-2 text-[#746E68] truncate max-w-[140px] sm:max-w-[200px]">{r.value}</td>
                    <td className="py-2 px-2 text-right">
                      <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded text-[9px] font-sans font-medium border border-emerald-200 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Aktiv</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HackerPanda avatar grande en el lateral derecho / arriba en responsive */}
        <div className="order-first sm:order-last mx-auto sm:mx-0 self-center sm:self-start pt-1 flex-shrink-0">
          <BjornAvatar pose="hacker" altText="HackerPanda DNSSEC Security" className="w-40 h-40 sm:w-52 sm:h-52" animationType="float" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#EBECE5]">
        <div className="flex flex-wrap items-center gap-2 w-full">
          <button
            onClick={onSaveDnsZone}
            className="flex-1 sm:flex-none min-h-[36px] px-3.5 py-2 bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>DNS-Zone speichern</span>
          </button>
          <button className="flex-1 sm:flex-none min-h-[36px] px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>DNS-Prüfung</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 8. Component TelemetryCard
export function TelemetryCard({ serverName = 'Frankfurt Solar Node (KVM-01)' }) {
  return (
    <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#EBECE5] shadow-xs space-y-3 w-full text-[#34312D]">
      <div className="flex items-center justify-between border-b border-[#EBECE5] pb-2">
        <div>
          <h4 className="font-semibold text-xs sm:text-sm text-[#34312D] flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#789340] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Live-Telemetrie: {serverName}</span>
          </h4>
          <p className="text-[10px] text-[#746E68]">Echtzeit-Daten vom Grünen Rechenzentrum Frankfurt</p>
        </div>
        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-medium border border-emerald-200 flex items-center gap-1.5 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#EBECE5] text-center">
          <span className="text-[10px] text-[#746E68] block">CPU Auslastung</span>
          <span className="text-sm sm:text-base font-bold text-[#789340] mt-0.5 block">14.2%</span>
          <span className="text-[9px] text-emerald-700 block mt-0.5">Optimiert (Mistral)</span>
        </div>

        <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#EBECE5] text-center">
          <span className="text-[10px] text-[#746E68] block">PUE Effizienz</span>
          <span className="text-sm sm:text-base font-bold text-[#34312D] mt-0.5 block">1.12</span>
          <span className="text-[9px] text-[#746E68] block mt-0.5">Ziel: 1.10</span>
        </div>

        <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#EBECE5] text-center">
          <span className="text-[10px] text-[#746E68] block">Solar Direct Feed</span>
          <span className="text-sm sm:text-base font-bold text-emerald-700 mt-0.5 block">100%</span>
          <span className="text-[9px] text-emerald-700 block mt-0.5">Solar & Wind</span>
        </div>

        <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#EBECE5] text-center">
          <span className="text-[10px] text-[#746E68] block">Flüssigkühlung</span>
          <span className="text-sm sm:text-base font-bold text-[#CF614A] mt-0.5 block">28.4 °C</span>
          <span className="text-[9px] text-[#746E68] block mt-0.5">Abwärmenutzung</span>
        </div>
      </div>

      <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <span className="text-base">🌱</span>
          <div>
            <span className="font-semibold block">Klimaneutraler Betrieb</span>
            <span className="text-[10px] text-emerald-800">Eingespartes CO₂: 412 kg/Jahr (-95% vs. Standard-Server)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente Principal de Chat Inteligente (BambooBjørn)
 * Soporta la simulación de flujos modulares (Conversation API) y Contexto de Clienta (Fase 3)
 */
export default function BambooChat({ avatarPath = 'assets/LaptopPanda_transparent.png' }) {
  // Estado de selección de rol inicial e inicio de sesión
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initialRoleMessage = {
    id: 'welcome-initial',
    role: 'assistant',
    content: 'Willkommen bei Bamboo Bjørn! 🌿 Bitte wählen Sie Ihren Zugangsmodus, um fortzufahren:',
    isRoleSelectionCard: true,
  };

  const initialClientMessage = {
    id: 'welcome-client',
    role: 'assistant',
    content: 'Willkommen zurück, Frau Domínguez! 🌿 Schön, Sie wiederzusehen. Hier ist die Echtzeit-Übersicht Ihrer aktiven grünen Dienste bei Bamboo Bjørn:',
    isCustomerCard: true,
  };

  const initialVisitorMessage = {
    id: 'welcome-visitor',
    role: 'assistant',
    content: 'Hallo! 🌿 Ich bin Bjørn, Ihr grüner Assistent bei Bamboo Bjørn. Ich bin hier, um Ihnen unser 100% ökologisches Grünes KI-Hosting vorzustellen. Wie kann ich Ihnen heute helfen?',
  };

  // Estado general de mensajes
  const [messages, setMessages] = useState([initialRoleMessage]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Estado del servidor KVM
  const [kvmSpecs, setKvmSpecs] = useState({ vcpu: '8 vCPU', ram: '16 GB RAM', nvme: '160 GB NVMe' });
  const [targetKvmSpecs, setTargetKvmSpecs] = useState({ vcpu: '8 vCPU', ram: '16 GB RAM', nvme: '160 GB NVMe' });

  // Estado del flujo conversacional MVP ('mail.create' | 'kvm.reboot' | 'kvm.config')
  const [flowState, setFlowState] = useState({
    activeFlow: null, // 'mail.create' | 'kvm.reboot' | 'kvm.config'
    step: 'IDLE', // 'SELECT_DOMAIN' | 'ENTER_NAME' | 'CONFIRM' | 'CREATING' | 'CONFIRM_REBOOT' | 'REBOOTING' | 'CONFIG_PANEL' | 'CONFIRM_CONFIG' | 'APPLYING_CONFIG'
    mailboxName: '',
    selectedDomain: '',
    kvmServer: 'KVM-01',
  });

  const messagesEndRef = useRef(null);
  const chatStreamRef = useRef(null);

  useEffect(() => {
    if (chatStreamRef.current) {
      const children = chatStreamRef.current.children;
      if (children && children.length > 0) {
        let target = children[children.length - 1];
        if (target.id === 'scroll-bottom-marker' && children.length > 1) {
          target = children[children.length - 2];
        }
        const containerRect = chatStreamRef.current.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const offsetTop = targetRect.top - containerRect.top + chatStreamRef.current.scrollTop - 12;
        chatStreamRef.current.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth'
        });
      }
    }
  }, [messages, isLoading, flowState]);

  // Selección inicial de rol
  const handleSelectInitialRole = (isKundin) => {
    setIsRoleSelected(true);
    setIsLoggedIn(isKundin);
    setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });

    setMessages([
      initialRoleMessage,
      { id: Date.now().toString(), role: 'user', content: isKundin ? 'Ich bin bereits Kundin' : 'Ich möchte mich informieren' },
      isKundin ? initialClientMessage : initialVisitorMessage,
    ]);
  };

  // Cambiar entre el modo Clienta Autenticada y Modo Visitante desde la cabecera
  const toggleAuthMode = () => {
    const nextMode = !isLoggedIn;
    setIsRoleSelected(true);
    setIsLoggedIn(nextMode);
    setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });
    setMessages([nextMode ? initialClientMessage : initialVisitorMessage]);
  };

  // Acciones Rápidas (CTAs) de la tarjeta de productos
  const handleShowDns = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: 'DNS für bamboo-bjoern.eu konfigurieren' },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Hier ist die aktuelle DNS-Konfiguration für Ihre aktive Domain bamboo-bjoern.eu:',
        customComponent: 'dns_config',
      },
    ]);
  };

  const handleStartDomainRenew = (domain = 'bamboo-bjoern.eu') => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: `Domain ${domain} verlängern` },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Möchten Sie die Registrierung der Domain ${domain} um 1 Jahr verlängern (bis Sep 2027)?`,
        customComponent: 'domain_renew_confirmation',
      },
    ]);
  };

  const handleShowTelemetry = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: 'KVM-Server-Telemetrie anzeigen' },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Hier sind die Live-Messwerte Ihres ökologischen Servers im Rechenzentrum Frankfurt Solar Node:',
        customComponent: 'telemetry',
      },
    ]);
  };

  const handleAddMailboxAction = () => {
    startMailCreateFlow();
  };

  // Acciones Flujo KVM
  const handleShowKvmCard = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: 'Informationen zum Server KVM-01 anzeigen' },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Hier sind die technischen Details und Echtzeit-Verwaltungsoptionen Ihres KVM-Servers:',
        customComponent: 'kvm_card',
      },
    ]);
  };

  const handleRequestRebootKvm = (serverName = 'KVM-01') => {
    setFlowState({ activeFlow: 'kvm.reboot', step: 'CONFIRM_REBOOT', kvmServer: serverName, mailboxName: '', selectedDomain: '' });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: `Server ${serverName} neustarten` },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Möchten Sie den Server ${serverName} jetzt neustarten?`,
        customComponent: 'kvm_confirmation',
      },
    ]);
  };

  const handleConfirmRebootKvm = () => {
    const serverName = flowState.kvmServer || 'KVM-01';
    setFlowState((prev) => ({ ...prev, step: 'REBOOTING' }));

    // Simulación del proceso de reinicio (2.5 segundos)
    setTimeout(() => {
      setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Der Server ${serverName} wurde erfolgreich neu gestartet. Alle Dienste auf dem Knoten Frankfurt - Solar Powered sind wieder online und zu 100% betriebsbereit.`,
        },
      ]);
    }, 2500);
  };

  const handleCancelRebootKvm = () => {
    setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: 'Abbrechen' },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Vorgang abgebrochen. Der Server KVM-01 bleibt ohne Unterbrechung aktiv.' },
    ]);
  };

  // Reconfiguración de Servidores KVM (Opción 2: Formulario / Selector Integrado)
  const handleShowKvmConfigPanel = (serverName = 'KVM-01') => {
    setFlowState({ activeFlow: 'kvm.config', step: 'CONFIG_PANEL', kvmServer: serverName, mailboxName: '', selectedDomain: '' });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: `Konfigurieren ${serverName}` },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Wählen Sie die neue Ressourcenzuweisung für vCPU, Arbeitsspeicher und NVMe-Speicher für den Server ${serverName}:`,
      },
    ]);
  };

  const handleSaveKvmConfig = (specs) => {
    setTargetKvmSpecs(specs);
    setFlowState((prev) => ({ ...prev, step: 'CONFIRM_CONFIG' }));
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: `Konfiguration speichern (${specs.vcpu} • ${specs.ram} • ${specs.nvme})` },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Möchten Sie die neue Konfiguration auf den Server ${flowState.kvmServer || 'KVM-01'} anwenden?`,
      },
    ]);
  };

  const handleConfirmKvmConfig = () => {
    const serverName = flowState.kvmServer || 'KVM-01';
    setFlowState((prev) => ({ ...prev, step: 'APPLYING_CONFIG' }));

    setTimeout(() => {
      setKvmSpecs(targetKvmSpecs);
      setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `🎉 Konfiguration für ${serverName} erfolgreich aktualisiert! Die neuen Ressourcen (${targetKvmSpecs.vcpu} • ${targetKvmSpecs.ram} • ${targetKvmSpecs.nvme}) wurden ohne Ausfallzeit auf dem Knoten Frankfurt - Solar Powered zugewiesen.`,
        },
      ]);
    }, 2500);
  };

  const handleCancelKvmConfig = () => {
    setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: 'Abbrechen' },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Konfiguration abgebrochen. Der Server KVM-01 läuft mit den bisherigen Spezifikationen weiter.' },
    ]);
  };

  // Manejador del envío de texto del usuario
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

    if (lower.includes('reiniciar') || lower.includes('reboot') || lower.includes('reinicia')) {
      handleRequestRebootKvm('KVM-01');
      return;
    }

    if (lower.includes('kvm') || lower.includes('vps') || lower.includes('servidor virtual')) {
      handleShowKvmCard();
      return;
    }

    if (lower.includes('dns') || lower.includes('domain') || lower.includes('registro')) {
      handleShowDns();
      return;
    }

    if (lower.includes('telemetria') || lower.includes('telemetrie') || lower.includes('pue') || lower.includes('cpu')) {
      handleShowTelemetry();
      return;
    }

    if (lower.includes('email') || lower.includes('e-mail') || lower.includes('konto') || lower.includes('correo') || lower.includes('erstellen') || lower.includes('buzon') || lower.includes('postfach')) {
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
      } else if (lower.includes('server') || lower.includes('knoten') || lower.includes('frankfurt')) {
        responseContent = `Unsere Hauptknoten befinden sich strategisch in Frankfurt (Deutschland). Sie arbeiten mit einer ultraniedrigen Power Usage Effectiveness (PUE) von 1,12 und bieten direkte Abwärmenutzung für die umliegende Gemeinde.`;
      } else if (lower.includes('ai') || lower.includes('ki') || lower.includes('intelligenz') || lower.includes('mistral')) {
        responseContent = `Das Grüne KI-Hosting von BambooBjørn nutzt optimierte Modelle wie Mistral AI auf beschleunigter, CO₂-neutraler Hardware, um die Energieeffizienz pro Anfrage zu maximieren.`;
      } else {
        responseContent = `BambooBjørn kombiniert ökologische Infrastruktur und Spitzentechnologie für 100% CO₂-neutrale Web- und E-Mail-Dienste. Möchten Sie einen KVM-Server neu starten, ein neues Öko-Postfach erstellen, Ihre DNS konfigurieren oder die Server-Telemetrie prüfen?`;
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
    setFlowState({ activeFlow: 'mail.create', step: 'SELECT_DOMAIN', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });
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
      setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });
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
    setFlowState({ activeFlow: null, step: 'IDLE', mailboxName: '', selectedDomain: '', kvmServer: 'KVM-01' });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: 'Erstellung abbrechen' },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Verstanden, die Operation wurde abgebrochen. Wie kann ich Ihnen heute weiterhelfen?' },
    ]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-[660px] flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-[#FAF8F5]/95 backdrop-blur-xl border border-white/80 font-['Space_Grotesk',sans-serif] text-[#34312D]">
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

      {/* Cabecera del Chat con Switcher de Perfil (Fase 3) */}
      <header className="px-5 py-3.5 bg-[#34312D] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#47433E]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <img
              src={avatarPath}
              alt="Panda Avatar"
              className="w-14 h-14 object-contain panda-avatar-animated filter drop-shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=BambooPanda';
              }}
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 border-2 border-[#34312D] rounded-full"></span>
          </div>
          <div>
            <h3 className="font-semibold text-base leading-tight tracking-wide flex items-center gap-1.5 font-['Space_Grotesk',sans-serif]">
              Bjørn AI <span className="text-[10px] bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] text-white px-2.5 py-0.5 rounded-full font-medium">Grünes Hosting</span>
            </h3>
            <p className="text-xs text-[#919D97]">Ökologischer Assistent • Bamboo Bjørn</p>
          </div>
        </div>

        {/* Switcher de Estado / Contexto de Usuario */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={toggleAuthMode}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1.5 border ${isLoggedIn
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200 hover:bg-emerald-900'
              : 'bg-stone-800/80 border-stone-600/40 text-stone-300 hover:bg-stone-700'
              }`}
            title="Klicken, um zwischen Kundin und Besucher umzuschalten"
          >
            <span className={`w-2 h-2 rounded-full ${isLoggedIn ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="flex items-center gap-1">
              {isLoggedIn ? (
                <>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Kundin (Alba)</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span>Besucher</span>
                </>
              )}
            </span>
          </button>

          <button
            onClick={startMailCreateFlow}
            className="text-xs px-3 py-1.5 rounded-xl bg-[linear-gradient(55deg,#789340_38%,#CF614A_82%)] hover:brightness-108 text-white font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>+ Neues Öko-E-Mail</span>
          </button>
        </div>
      </header>

      {/* Área de Mensajes Stream */}
      <div ref={chatStreamRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-[#FAF8F5] to-[#F8F8F8] custom-scrollbar overscroll-y-contain touch-pan-y">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} avatarPath={avatarPath}>
            {msg.isRoleSelectionCard && !isRoleSelected && (
              <RoleSelectionCard onSelectRole={handleSelectInitialRole} />
            )}
            {msg.isCustomerCard && (
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-5 w-full">
                <div className="flex-1 w-full">
                  <CustomerProductsCard
                    onConfigureDns={handleShowDns}
                    onRenewDomain={() => handleStartDomainRenew('bamboo-bjoern.eu')}
                    onAddMailbox={handleAddMailboxAction}
                    onConfigureKvm={() => handleShowKvmConfigPanel('KVM-01')}
                    onRebootKvm={() => handleRequestRebootKvm('KVM-01')}
                    kvmSpecs={kvmSpecs}
                  />
                </div>
                <video
                  src="assets/PandaVideo_sin_fondo.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-28 h-28 sm:w-32 sm:h-32 lg:w-48 lg:h-48 object-contain flex-shrink-0 drop-shadow-xs order-first lg:order-last mx-auto lg:mx-0 self-center lg:self-start mt-2 lg:mt-0"
                />
              </div>
            )}
            {msg.customComponent === 'dns_config' && <DnsConfigCard domain="bamboo-bjoern.eu" />}
            {msg.customComponent === 'telemetry' && <TelemetryCard serverName="Frankfurt Solar Node (KVM-01)" />}
            {msg.customComponent === 'kvm_card' && (
              <KvmServerCard
                serverName="KVM-01"
                kvmSpecs={kvmSpecs}
                onReboot={() => handleRequestRebootKvm('KVM-01')}
                onConfigure={() => handleShowKvmConfigPanel('KVM-01')}
              />
            )}
            {msg.customComponent === 'kvm_confirmation' && (
              <KvmConfirmationCard
                serverName={flowState.kvmServer || 'KVM-01'}
                onConfirm={handleConfirmRebootKvm}
                onCancel={handleCancelRebootKvm}
              />
            )}
          </ChatMessage>
        ))}

        {/* Componente dinámico de Input de Texto en Línea */}
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

        {/* Componente dinámico de Tarjeta de Confirmación de Correo */}
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

        {/* Componente dinámico de Estado de Carga / Creación de Correo */}
        {flowState.activeFlow === 'mail.create' && flowState.step === 'CREATING' && (
          <div className="ml-2 animate-fade-in max-w-sm">
            <LoadingStatus message="Bjørn richtet Ihr 100% CO₂-neutrales Postfach ein..." />
          </div>
        )}

        {/* Componente dinámico de Estado de Reinicio KVM */}
        {flowState.activeFlow === 'kvm.reboot' && flowState.step === 'REBOOTING' && (
          <div className="ml-2 animate-fade-in max-w-md">
            <KvmProgressStatus serverName={flowState.kvmServer || 'KVM-01'} />
          </div>
        )}

        {/* Componentes dinámicos de Reconfiguración KVM */}
        {flowState.activeFlow === 'kvm.config' && flowState.step === 'CONFIG_PANEL' && !isLoading && (
          <div className="ml-2 animate-fade-in max-w-md">
            <KvmConfigPanel
              initialSpecs={kvmSpecs}
              onSave={handleSaveKvmConfig}
              onCancel={handleCancelKvmConfig}
            />
          </div>
        )}

        {flowState.activeFlow === 'kvm.config' && flowState.step === 'CONFIRM_CONFIG' && !isLoading && (
          <div className="ml-2 animate-fade-in max-w-md">
            <KvmConfigConfirmationCard
              serverName={flowState.kvmServer || 'KVM-01'}
              targetSpecs={targetKvmSpecs}
              onConfirm={handleConfirmKvmConfig}
              onCancel={handleCancelKvmConfig}
            />
          </div>
        )}

        {flowState.activeFlow === 'kvm.config' && flowState.step === 'APPLYING_CONFIG' && (
          <div className="ml-2 animate-fade-in max-w-md">
            <KvmConfigProgressStatus serverName={flowState.kvmServer || 'KVM-01'} />
          </div>
        )}

        {/* Indicador visual de pensando */}
        {isLoading && (
          <div className="flex items-end gap-3 justify-start">
            <div className="bg-[#FAF8F5] border border-[#EBECE5] px-4 py-3 rounded-2xl rounded-bl-none shadow-xs flex items-center gap-1.5">
              <span className="text-xs text-[#746E68] font-medium mr-1">Bjørn denkt nach</span>
              <span className="w-1.5 h-1.5 bg-[#789340] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-[#789340] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#CF614A] rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} id="scroll-bottom-marker" />
      </div>

      {/* Formulario de Entrada de Texto Libre */}
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
                : 'Fragen Sie Bjørn etwas...'
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

