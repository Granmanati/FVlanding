import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, MessageCircle, CheckCircle2,
    Instagram, Activity, Shield, Send, Info
} from 'lucide-react';

const WA_NUMBER = "34675982253";
const WA_LINK = `https://wa.me/${WA_NUMBER}`;

const getWaLink = (message: string) => `${WA_LINK}?text=${encodeURIComponent(message)}`;

// --- Sub-components para limpieza visual ---
const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="px-3 py-1 bg-brand-dark/5 text-brand-dark text-[10px] font-black rounded-full uppercase tracking-widest">
        {children}
    </span>
);

export default function App() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // Chatbot State v2.0
    const [chatOpen, setChatOpen] = useState(false);
    const [chatStep, setChatStep] = useState(0);
    const [hasInteractedWithChat, setHasInteractedWithChat] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // Advanced Chat Data Selection v2.0
    const [chatSelections, setChatSelections] = useState({
        camino: '', // 'agudo', 'cronico', 'deporte', 'duda'
        motivo: '',
        intensidad: '',
        duracion: '',
        tratamientosPrevios: '',
        deporte: '',
        objetivo: '', // 'recuperacion', 'rendimiento'
        redFlags: '',
        zona: '',
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            if (window.scrollY > window.innerHeight * 0.4 && !chatOpen && !hasInteractedWithChat) {
                setChatOpen(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [chatOpen, hasInteractedWithChat]);

    const handleChatSelection = (field: string, value: string, nextStep: number) => {
        setHasInteractedWithChat(true);
        setChatSelections(prev => ({ ...prev, [field]: value }));
        setIsTyping(true);

        // Simular pensamiento humano v2.0
        setTimeout(() => {
            setIsTyping(false);
            setChatStep(nextStep);
        }, 1200);
    };

    const isZoneQualified = () => {
        const validZones = ['Barajas', 'Torrejón de Ardoz', 'Paracuellos', 'Daganzo', 'Ajalvir'];
        return validZones.includes(chatSelections.zona);
    };

    const getChatWaMessage = () => {
        const prefixes = {
            agudo: '🚨 **URGENTE: CASO AGUDO**',
            cronico: '🧘 **DOLOR PERSISTENTE**',
            deporte: '🏆 **FISIO DEPORTIVA / RENDIMIENTO**',
            duda: '❓ **DUDA RÁPIDA**'
        };
        const prefix = prefixes[chatSelections.camino as keyof typeof prefixes] || 'Fisio Request';

        let details = '';
        if (chatSelections.camino === 'agudo') details = `\n- Motivo: ${chatSelections.motivo}\n- Intensidad: ${chatSelections.intensidad}/10`;
        if (chatSelections.camino === 'cronico') details = `\n- Duración: ${chatSelections.duracion}\n- Ttos previos: ${chatSelections.tratamientosPrevios}`;
        if (chatSelections.camino === 'deporte') details = `\n- Deporte: ${chatSelections.deporte}\n- Objetivo: ${chatSelections.objetivo}`;

        return `Hola Darío y Vanesa. Vengo de la web.\n${prefix}${details}\n- Zona: ${chatSelections.zona}\n- Red Flags: ${chatSelections.redFlags}\n\nMe gustaría agendar una valoración inicial.`;
    };

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white selection:bg-brand-dark/10">
            {/* VITE HEADER v2.0 - Ultra Glass */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-header py-4' : 'bg-transparent py-8'}`}>
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-center max-w-7xl">
                    <a href="#" className="flex items-center gap-3">
                        <div className="bg-brand-dark text-white p-2 rounded-xl shadow-lg shadow-brand-dark/20">
                            <Activity size={24} />
                        </div>
                        <span className="text-2xl font-black text-brand-dark tracking-tighter">Fisiovanguardia</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-10">
                        {['Servicio', 'Diferencia', 'Precios', 'Nosotros'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-dark transition-colors">
                                {item}
                            </a>
                        ))}
                        <a
                            href={WA_LINK}
                            className="bg-brand-dark text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:premium-shadow-xl transition-all active:scale-95"
                        >
                            Reservar agora
                        </a>
                    </nav>

                    <button className="md:hidden text-brand-dark" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <X size={28} className={mobileMenuOpen ? 'block' : 'hidden'} />
                        <Menu size={28} className={mobileMenuOpen ? 'hidden' : 'block'} />
                    </button>
                </div>
            </header>

            {/* HERO v2.0 - Apple-level Spacing */}
            <section className="pt-40 pb-20 md:pt-60 md:pb-40 px-6 relative overflow-hidden">
                <div className="container mx-auto max-w-7xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="flex justify-center gap-3">
                            <Badge>Madrid Noreste</Badge>
                            <Badge>Ruta Exclusiva</Badge>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-dark leading-[0.95] tracking-tighter text-balance">
                            Tu salón,<br />nuestra clínica.
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed italic">
                            "Llevamos el rigor de la fisioterapia avanzada a la privacidad de tu casa. Sin traslados, solo resultados."
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                            <a
                                href="#comenzar"
                                onClick={(e) => { e.preventDefault(); setChatOpen(true); }}
                                className="inline-flex items-center justify-center gap-4 bg-brand-dark text-white px-12 py-6 rounded-3xl font-black text-xl premium-shadow-xl hover:scale-105 transition-all active:scale-95"
                            >
                                <MessageCircle size={28} />
                                Iniciar valoración gratuita
                            </a>
                            <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-sm">
                                <Shield size={16} /> 100% Confidencial y Clínico
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-full bg-slate-50/50 rounded-[100%] -z-10 blur-3xl"></div>
            </section>

            {/* SECCIÓN 2: DIFERENCIA CLÍNICA v2.0 */}
            <section id="diferencia" className="py-32 px-6 bg-slate-50/50">
                <div className="container mx-auto max-w-7xl grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter leading-none">¿Por qué <br /><span className="text-brand-light">Fisiovanguardia?</span></h2>
                        <div className="space-y-10">
                            {[
                                { title: 'Sin Intermediarios', desc: 'Tratas directamente con Darío o Vanesa. Sin gestores de citas ni clínicos externos.' },
                                { title: 'Rutas Optimizadas', desc: 'Solo cubrimos Madrid NE para garantizar que el fisio llegue fresco y puntual a tu cita.' },
                                { title: 'Evidencia Científica', desc: 'No somos masajistas. Aplicamos terapia manual y ejercicio basados en el rigor clínico.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-dark premium-shadow group-hover:bg-brand-dark group-hover:text-white transition-all">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black mb-2">{item.title}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/hero.png" className="rounded-[40px] premium-shadow-xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Sesión de fisioterapia" />
                    </div>
                </div>
            </section>

            {/* PRICING v2.0 - Premium Minimalist */}
            <section id="precios" className="py-40 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6 tracking-tighter">Inversión en tu salud.</h2>
                        <p className="text-xl text-slate-400 font-medium">Tarifas transparentes. Sin sorpresas, todo incluido.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { name: 'Sesión Única', price: '60€', desc: 'Para necesidades puntuales.', highlights: ['60 min tratamiento', 'Desplazamiento inc.'] },
                            { name: 'Bono 5 Sesiones', price: '275€', desc: 'Nuestra recomendación clínica.', recommended: true, highlights: ['55€ por sesión', 'Ideal dolor crónico', 'Válido 6 meses'] },
                            { name: 'Bono 3 Sesiones', price: '170€', desc: 'Recuperación intermedia.', highlights: ['Continuidad clínica', 'Ahorro vs individual'] }
                        ].map((plan, i) => (
                            <div key={i} className={`p-10 rounded-[32px] border ${plan.recommended ? 'bg-brand-dark text-white border-brand-dark premium-shadow-xl scale-105' : 'bg-white border-slate-100 premium-shadow'} flex flex-col justify-between`}>
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-xl font-black uppercase tracking-widest opacity-80">{plan.name}</h3>
                                        {plan.recommended && <Badge>Top Choice</Badge>}
                                    </div>
                                    <div className="text-5xl font-black mb-4">{plan.price}</div>
                                    <p className={`mb-10 font-medium ${plan.recommended ? 'text-slate-300' : 'text-slate-500'}`}>{plan.desc}</p>
                                    <ul className="space-y-4 mb-12">
                                        {plan.highlights.map((h, j) => (
                                            <li key={j} className="flex items-center gap-3 font-bold text-sm">
                                                <CheckCircle2 size={18} className={plan.recommended ? 'text-brand-light' : 'text-brand-dark'} /> {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <a href={WA_LINK} className={`w-full py-5 rounded-2xl font-black text-center transition-all ${plan.recommended ? 'bg-white text-brand-dark hover:bg-slate-100' : 'bg-brand-dark text-white hover:opacity-90'}`}>
                                    Seleccionar
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CHAT WIDGET v2.0 - Advanced Triaje */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
                <AnimatePresence>
                    {chatOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="bg-white w-[400px] max-w-[calc(100vw-2rem)] rounded-[32px] shadow-[0_30px_100px_-20px_rgba(1,59,81,0.4)] border border-slate-100 mb-6 overflow-hidden flex flex-col h-[600px]"
                        >
                            {/* Header Chat */}
                            <div className="bg-brand-dark p-6 flex items-center justify-between text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center font-black text-sm">DV</div>
                                    <div>
                                        <h4 className="font-bold text-lg leading-none mb-1">Fisiovanguardia</h4>
                                        <span className="text-[10px] uppercase font-black tracking-widest text-brand-light">Triaje Clínico v2.0</span>
                                    </div>
                                </div>
                                <button onClick={() => setChatOpen(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button>
                            </div>

                            {/* Mensajes Chat Area */}
                            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-6">

                                {/* Step 0: El Gancho */}
                                <div className="max-w-[85%] bg-white p-5 rounded-3xl rounded-tl-sm shadow-sm border border-slate-100">
                                    <p className="text-sm font-black text-brand-dark mb-2 tracking-tight">Hola, soy Darío 👋</p>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Para darte una respuesta clínica coherente, ¿qué necesitas hoy?</p>
                                </div>

                                {chatStep === 0 && (
                                    <div className="flex flex-col gap-3 items-end">
                                        {[
                                            { label: '🔥 Dolor Agudo (Nuevo)', val: 'agudo', next: 1 },
                                            { label: '🧘 Dolor Persistente (+3 meses)', val: 'cronico', next: 10 },
                                            { label: '🏆 Rendimiento / Deporte', val: 'deporte', next: 30 },
                                            { label: '💬 Tengo una duda rápida', val: 'duda', next: 100 }
                                        ].map(c => (
                                            <button key={c.val} onClick={() => handleChatSelection('camino', c.val, c.next)} className="bg-brand-dark text-white px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md">{c.label}</button>
                                        ))}
                                    </div>
                                )}

                                {/* --- RUTA DEPORTE (NUEVA v2.0) --- */}
                                {chatSelections.camino === 'deporte' && chatStep >= 30 && (
                                    <>
                                        <div className="flex justify-end"><div className="bg-brand-light text-white p-4 rounded-2xl rounded-tr-sm font-black text-xs uppercase tracking-widest">🏆 Rendimiento deportivo</div></div>
                                        <div className="max-w-[85%] bg-white p-5 rounded-3xl rounded-tl-sm shadow-sm border border-slate-100">
                                            <p className="text-sm text-slate-500 font-medium">¡Genial! Nos especializamos en biomecánica. ¿Cuál es tu deporte principal?</p>
                                        </div>
                                        {chatStep === 30 && (
                                            <div className="flex flex-wrap gap-2 justify-end">
                                                {['Pádel / Tenis', 'Running', 'Crossfit', 'Ciclismo', 'Otro'].map(d => (
                                                    <button key={d} onClick={() => handleChatSelection('deporte', d, 31)} className="bg-slate-200 text-brand-dark px-4 py-2.5 rounded-xl text-xs font-black">{d}</button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                                {chatSelections.camino === 'deporte' && chatStep >= 31 && (
                                    <>
                                        <div className="flex justify-end"><div className="bg-brand-light text-white p-4 rounded-2xl rounded-tr-sm font-black text-xs uppercase tracking-widest">{chatSelections.deporte}</div></div>
                                        <div className="max-w-[85%] bg-white p-5 rounded-3xl rounded-tl-sm shadow-sm border border-slate-100">
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed">¿Buscas recuperarte de una lesión o preparación para una competición/mejora?</p>
                                        </div>
                                        {chatStep === 31 && (
                                            <div className="flex flex-col gap-2 items-end">
                                                {['Recuperación de lesión', 'Mejora de rendimiento'].map(o => (
                                                    <button key={o} onClick={() => handleChatSelection('objetivo', o, 20)} className="bg-slate-800 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase">{o}</button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* --- REUTILIZAR ZONA & RED FLAGS (v1.1 optimizado) --- */}
                                {chatStep >= 20 && chatStep < 100 && (
                                    <>
                                        {chatStep === 20 && (
                                            <div className="max-w-[85%] bg-white p-5 rounded-3xl rounded-tl-sm shadow-sm border border-red-100 font-black text-xs text-red-600 uppercase tracking-widest italic animate-pulse">
                                                <Info size={14} className="inline mr-2" /> Seguridad Clínica: ¿Sientes debilidad repentina o hormigueo persistente?
                                            </div>
                                        )}
                                        {chatStep === 20 && (
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => handleChatSelection('redFlags', 'Ninguno', 21)} className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl text-xs font-black">NINGUNO</button>
                                                <button onClick={() => handleChatSelection('redFlags', 'Tengo dudas', 21)} className="bg-red-50 text-red-700 px-6 py-3 rounded-2xl text-xs font-black">TENGO DUDAS</button>
                                            </div>
                                        )}

                                        {chatStep >= 21 && (
                                            <div className="max-w-[85%] bg-white p-5 rounded-3xl rounded-tl-sm border border-slate-100 text-sm text-slate-500 font-medium">
                                                Confirmado. Último paso: ¿En qué zona de Madrid NE estás?
                                            </div>
                                        )}
                                        {chatStep === 21 && (
                                            <div className="flex flex-wrap gap-2 justify-end pb-8">
                                                {['Barajas', 'Torrejón', 'Paracuellos', 'Daganzo', 'Ajalvir', 'Otra'].map(z => (
                                                    <button key={z} onClick={() => handleChatSelection('zona', z, 22)} className="bg-brand-dark text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{z}</button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                                {chatStep === 22 && (
                                    <div className="p-5 rounded-3xl bg-brand-light text-white font-black text-sm text-center shadow-xl">
                                        {isZoneQualified()
                                            ? "✅ Ruta disponible. He generado tu resumen clínico. Pulsa abajo para enviárnoslo."
                                            : "📍 Estás fuera de zona habitual, pero envíanos el resumen y vemos si podemos encajarte."}
                                    </div>
                                )}

                                {isTyping && (
                                    <div className="flex gap-1.5 p-4 items-center">
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-225"></div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Chat CTA */}
                            <div className="p-6 bg-white border-t border-slate-100">
                                {chatStep === 22 ? (
                                    <a
                                        href={getWaLink(getChatWaMessage())}
                                        target="_blank" rel="noreferrer"
                                        className="w-full bg-whatsapp text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 premium-shadow-xl hover:scale-105 transition-all text-xs uppercase tracking-widest"
                                    >
                                        <Send size={18} /> Enviar informe clínico
                                    </a>
                                ) : (
                                    <div className="text-[10px] text-center text-slate-400 font-black uppercase tracking-widest">Darío & Vanesa • Madrid NE</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FAB Toggle v2.0 */}
                <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="w-20 h-20 bg-brand-dark text-white rounded-full premium-shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border-[6px] border-white"
                >
                    <MessageCircle size={32} />
                    {!hasInteractedWithChat && (
                        <span className="absolute -top-1 -right-1 flex h-6 w-6">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 text-white text-[10px] items-center justify-center font-black">1</span>
                        </span>
                    )}
                </button>
            </div>

            {/* FOOTER v2.0 - Ultra Minimal */}
            <footer className="py-20 bg-slate-50 px-6 border-t border-slate-100">
                <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 font-black text-brand-dark text-xl tracking-tighter mb-4">
                            <Activity size={24} /> Fisiovanguardia
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">© 2026 Madrid NE • Darío y Vanesa</p>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-brand-dark transition-colors">Aviso Legal</a>
                        <a href="#" className="font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-brand-dark transition-colors">Privacidad</a>
                        <a href="https://www.instagram.com/fisiovanguardia/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
