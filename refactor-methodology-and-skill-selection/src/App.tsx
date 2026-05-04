import { useState, useCallback, useRef } from 'react';
import { METHODOLOGIES, SKILLS, TOOLS, DESIGNS, CHIPS } from './data';
import { buildPrompt, FormState } from './buildPrompt';

// ── tiny helpers ──────────────────────────────
const V: Record<string, string> = {
  '--red': '#E03A1E', '--red-bg': '#FFF1EE', '--ink': '#1C1510',
  '--ink-mid': '#5C4A42', '--ink-soft': '#A8958C', '--bg': '#F4F0EC',
  '--white': '#FFFFFF', '--line': '#E4DDD7',
};
const cv = (k: string) => V[k];

const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// ── Language options ──────────────────────────
const LANGS = [
  { code: 'English',  flag: '🇬🇧' },
  { code: 'French',   flag: '🇫🇷' },
  { code: 'German',   flag: '🇩🇪' },
  { code: 'Spanish',  flag: '🇪🇸' },
  { code: 'Italian',  flag: '🇮🇹' },
  { code: '__other__',flag: '✏️', label: 'Другой' },
];

// ── Design swatches ───────────────────────────
function DesignSwatch({ id }: { id: string }) {
  if (id === 'cambridge') return (
    <div style={{ background: '#eef2ff', height: 28, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
      <div style={{ width: '58%', height: 5, background: '#2d5be3', borderRadius: 2 }} />
    </div>
  );
  if (id === 'natgeo') return (
    <div style={{ background: '#111', height: 28, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
      <div style={{ width: '40%', height: 8, background: '#FFD100', borderRadius: 1 }} />
    </div>
  );
  if (id === 'nordic') return (
    <div style={{ background: '#fafafa', border: '1px solid #eee', height: 28, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
      <div style={{ width: '50%', height: 3, background: '#222', borderRadius: 1 }} />
    </div>
  );
  if (id === 'kids') return (
    <div style={{ background: '#fff9c4', height: 28, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 6 }}>
      <div style={{ width: 15, height: 15, background: '#ff5c3d', borderRadius: '50%' }} />
      <div style={{ width: 15, height: 15, background: '#4dc9e6', borderRadius: '50%' }} />
      <div style={{ width: 15, height: 15, background: '#7dc95e', borderRadius: '50%' }} />
    </div>
  );
  if (id === 'corporate') return (
    <div style={{ background: '#f8f8f8', height: 28, borderRadius: 5, overflow: 'hidden', display: 'flex', marginBottom: 6 }}>
      <div style={{ width: '26%', height: '100%', background: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '55%', height: 3, background: '#6ee7b7', borderRadius: 1 }} />
      </div>
    </div>
  );
  // custom
  return (
    <div style={{ background: cv('--bg'), border: `1.5px dashed ${cv('--line')}`, height: 28, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
      <span style={{ fontSize: 17 }}>✏️</span>
    </div>
  );
}

// ── Block wrapper ─────────────────────────────
function Block({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div style={{
      background: cv('--white'), border: `1px solid ${cv('--line')}`,
      borderRadius: 14, padding: 20, marginBottom: 12,
    }}>
      {title && (
        <div style={{
          fontSize: 10.5, fontWeight: 600, letterSpacing: '0.13em',
          textTransform: 'uppercase', color: cv('--ink-soft'), marginBottom: 14,
        }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'block', fontSize: 11.5, fontWeight: 600, color: cv('--ink-mid'), marginBottom: 6, letterSpacing: '0.04em' }}>
      {children}
    </span>
  );
}

function StyledSelect({ id, value, onChange, children }: {
  id?: string; value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', fontFamily: "'Outfit', sans-serif", fontSize: 14.5,
        color: cv('--ink'), background: cv('--white'), border: `1.5px solid ${cv('--line')}`,
        borderRadius: 10, padding: '10px 34px 10px 13px', outline: 'none',
        appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23A8958C'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
      }}
    >
      {children}
    </select>
  );
}

function StyledInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', fontFamily: "'Outfit', sans-serif", fontSize: 14.5,
        color: cv('--ink'), background: cv('--white'), border: `1.5px solid ${cv('--line')}`,
        borderRadius: 10, padding: '10px 13px', outline: 'none',
      }}
    />
  );
}

function StyledTextarea({ value, onChange, placeholder, minHeight = 76 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; minHeight?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      style={{
        width: '100%', fontFamily: "'Outfit', sans-serif", fontSize: 14.5,
        color: cv('--ink'), background: cv('--white'), border: `1.5px solid ${cv('--line')}`,
        borderRadius: 10, padding: '10px 13px', outline: 'none',
        resize: 'vertical', minHeight, lineHeight: 1.6,
      }}
    />
  );
}

// ── Main App ──────────────────────────────────
export default function App() {
  // state
  const [lang, setLang] = useState('English');
  const [langCustom, setLangCustom] = useState('');
  const [methodId, setMethodId] = useState('ppp');
  const [activeSkills, setActiveSkills] = useState<Set<string>>(new Set(['grammar']));
  const [selectedTools, setSelectedTools] = useState<Map<string, Set<string>>>(new Map());
  const [level, setLevel] = useState('B1');
  const [duration, setDuration] = useState('60');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Communicative');
  const [audience, setAudience] = useState('');
  const [designId, setDesignId] = useState('cambridge');
  const [designCustom, setDesignCustom] = useState('');
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set());
  const [extra, setExtra] = useState('');
  const [result, setResult] = useState<{ tags: string[]; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // expanded skill panel (which skill's tools are currently visible)
  const [expandedSkill, setExpandedSkill] = useState<string>('grammar');

  const cefrIdx = CEFR_ORDER.indexOf(level);

  const toggleSkill = useCallback((skillId: string) => {
    setActiveSkills(prev => {
      const next = new Set(prev);
      if (next.has(skillId)) {
        if (next.size === 1) return prev; // keep at least 1
        next.delete(skillId);
        if (expandedSkill === skillId) {
          const remaining = [...next][0];
          setExpandedSkill(remaining);
        }
      } else {
        next.add(skillId);
        setExpandedSkill(skillId);
      }
      return next;
    });
  }, [expandedSkill]);

  const toggleTool = useCallback((skillId: string, toolId: string) => {
    setSelectedTools(prev => {
      const next = new Map(prev);
      const set = new Set(next.get(skillId) || []);
      if (set.has(toolId)) set.delete(toolId); else set.add(toolId);
      next.set(skillId, set);
      return next;
    });
  }, []);

  const toggleChip = useCallback((chipId: string) => {
    setActiveChips(prev => {
      const next = new Set(prev);
      if (next.has(chipId)) next.delete(chipId); else next.add(chipId);
      return next;
    });
  }, []);

  const generate = () => {
    const state: FormState = {
      lang, langCustom, methodId, skills: activeSkills,
      selectedTools, level, duration, topic, tone, audience,
      designId, designCustom, chips: activeChips, extra,
    };
    const out = buildPrompt(state);
    setResult(out);
    setCopied(false);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const doCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // total selected tools count
  const totalTools = [...selectedTools.values()].reduce((a, s) => a + s.size, 0);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: cv('--bg'), color: cv('--ink'), minHeight: '100vh' }}>
      {/* ── Header ── */}
      <header style={{
        background: cv('--ink'), height: 54,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', position: 'sticky', top: 0, zIndex: 99,
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#fff' }}>
          fresh<i style={{ color: '#FF6B4A' }}>teacher</i>
        </div>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: cv('--ink-soft') }}>
          Prompt Architect
        </div>
      </header>

      <div style={{ maxWidth: 660, margin: '0 auto', padding: '36px 16px 140px' }}>

        {/* ── Hero ── */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 30,
            lineHeight: 1.18, letterSpacing: -0.4, marginBottom: 8,
          }}>
            Создай <i style={{ color: cv('--red') }}>экспертный</i><br />методический промпт
          </h1>
          <p style={{ fontSize: 14, color: cv('--ink-mid'), lineHeight: 1.6 }}>
            Настрой параметры — получи готовый промпт для любого AI.
          </p>
        </div>

        {/* ── Result ── */}
        {result && (
          <div ref={resultRef} style={{
            background: cv('--white'), border: `1px solid ${cv('--line')}`,
            borderRadius: 14, overflow: 'hidden', marginBottom: 12,
          }}>
            <div style={{
              padding: '14px 18px', borderBottom: `1px solid ${cv('--line')}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 10, flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {result.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 11, fontWeight: 600, padding: '3px 10px',
                    borderRadius: 20, background: cv('--red-bg'), color: cv('--red'),
                  }}>{t}</span>
                ))}
              </div>
              <button
                onClick={doCopy}
                style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 12.5, fontWeight: 600,
                  padding: '7px 18px', borderRadius: 8, cursor: 'pointer',
                  border: `1.5px solid ${copied ? '#1a9e72' : cv('--red')}`,
                  background: copied ? '#1a9e72' : cv('--white'),
                  color: copied ? '#fff' : cv('--red'),
                  transition: 'all .15s', whiteSpace: 'nowrap', flexShrink: 0,
                }}
              >
                {copied ? '✓ Скопировано' : 'Копировать'}
              </button>
            </div>
            <div style={{
              padding: 20, fontSize: 13, lineHeight: 1.9, color: cv('--ink'),
              whiteSpace: 'pre-wrap', fontFamily: "'Outfit', sans-serif",
              maxHeight: 420, overflowY: 'auto',
            }}>
              {result.text}
            </div>
          </div>
        )}

        {/* ══ 1 · Methodology ══ */}
        <Block title="Методика преподавания">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {METHODOLOGIES.map(m => {
              const on = methodId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMethodId(m.id)}
                  title={m.desc}
                  style={{
                    border: `1.5px solid ${on ? cv('--red') : cv('--line')}`,
                    background: on ? cv('--red-bg') : cv('--white'),
                    borderRadius: 10, padding: '10px 6px 9px',
                    fontFamily: "'Outfit', sans-serif", cursor: 'pointer',
                    textAlign: 'center', transition: 'all .15s', position: 'relative',
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 3 }}>{m.icon}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: on ? cv('--red') : cv('--ink'), lineHeight: 1.2 }}>{m.name}</div>
                  {on && (
                    <div style={{ position: 'absolute', top: 5, right: 7, fontSize: 9, fontWeight: 700, color: cv('--red') }}>✓</div>
                  )}
                </button>
              );
            })}
          </div>
          {/* method description */}
          <div style={{
            marginTop: 12, padding: '10px 13px',
            background: cv('--bg'), borderRadius: 8, border: `1px solid ${cv('--line')}`,
            fontSize: 12.5, color: cv('--ink-mid'), lineHeight: 1.6,
          }}>
            <strong style={{ color: cv('--ink') }}>{METHODOLOGIES.find(m => m.id === methodId)?.short}</strong>
            <br />
            {METHODOLOGIES.find(m => m.id === methodId)?.desc}
          </div>
        </Block>

        {/* ══ 2 · Language ══ */}
        <Block title="Язык обучения">
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {LANGS.map(l => {
              const on = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  style={{
                    flex: '1 1 calc(16.6% - 7px)', minWidth: 56,
                    border: `1.5px solid ${on ? cv('--red') : cv('--line')}`,
                    background: on ? cv('--red') : cv('--white'),
                    borderRadius: 10, padding: '9px 4px 8px',
                    fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: on ? 600 : 500,
                    color: on ? '#fff' : cv('--ink-mid'), cursor: 'pointer',
                    textAlign: 'center', lineHeight: 1.4, transition: 'all .15s',
                  }}
                >
                  {l.flag}<br />{l.label || l.code}
                </button>
              );
            })}
          </div>
          {lang === '__other__' && (
            <div style={{ marginTop: 10 }}>
              <StyledInput value={langCustom} onChange={setLangCustom} placeholder="Введите язык..." />
            </div>
          )}
        </Block>

        {/* ══ 3 · Level + Duration ══ */}
        <Block title="Уровень и формат">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <Label>CEFR уровень</Label>
              <StyledSelect value={level} onChange={setLevel}>
                <option value="A1">A1 — Beginner</option>
                <option value="A2">A2 — Elementary</option>
                <option value="B1">B1 — Intermediate</option>
                <option value="B2">B2 — Upper-Intermediate</option>
                <option value="C1">C1 — Advanced</option>
                <option value="C2">C2 — Proficiency</option>
              </StyledSelect>
              {/* cefr dots */}
              <div style={{ display: 'flex', gap: 4, marginTop: 7 }}>
                {CEFR_ORDER.map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 4, borderRadius: 2,
                    background: i <= cefrIdx ? cv('--red') : cv('--line'),
                    transition: 'background .22s',
                  }} />
                ))}
              </div>
            </div>
            <div>
              <Label>Длительность</Label>
              <StyledSelect value={duration} onChange={setDuration}>
                <option value="45">45 минут</option>
                <option value="60">60 минут</option>
                <option value="90">90 минут</option>
                <option value="120">120 минут</option>
              </StyledSelect>
            </div>
          </div>
        </Block>

        {/* ══ 4 · Skills ══ */}
        <Block title="Целевые навыки (можно несколько)">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
            {SKILLS.map(sk => {
              const on = activeSkills.has(sk.id);
              return (
                <button
                  key={sk.id}
                  onClick={() => toggleSkill(sk.id)}
                  style={{
                    border: `1.5px solid ${on ? cv('--red') : cv('--line')}`,
                    background: on ? cv('--red-bg') : cv('--white'),
                    borderRadius: 10, padding: '12px 6px 10px',
                    fontFamily: "'Outfit', sans-serif", fontSize: 12.5, fontWeight: on ? 600 : 500,
                    color: on ? cv('--red') : cv('--ink-mid'), cursor: 'pointer',
                    textAlign: 'center', transition: 'all .15s', position: 'relative',
                  }}
                >
                  <span style={{ display: 'block', fontSize: 20, marginBottom: 4 }}>{sk.icon}</span>
                  {sk.label}
                  {on && (
                    <span style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, fontWeight: 700, color: cv('--red') }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
          {/* skill count hint */}
          {activeSkills.size > 1 && (
            <div style={{
              fontSize: 12, color: cv('--ink-mid'), padding: '8px 12px',
              background: cv('--bg'), borderRadius: 8, border: `1px solid ${cv('--line')}`,
            }}>
              Выбрано навыков: <strong style={{ color: cv('--red') }}>{activeSkills.size}</strong>
              {' · '} промпт объединит все навыки в единый урок
            </div>
          )}
        </Block>

        {/* ══ 5 · Exercises per skill ══ */}
        {[...activeSkills].map(skillId => {
          const skill = SKILLS.find(s => s.id === skillId)!;
          const tools = TOOLS[skillId] || [];
          const toolSet = selectedTools.get(skillId) || new Set<string>();
          const isOpen = expandedSkill === skillId;
          const count = toolSet.size;

          return (
            <div key={skillId} style={{
              background: cv('--white'), border: `1px solid ${isOpen ? cv('--red') : cv('--line')}`,
              borderRadius: 14, marginBottom: 8, overflow: 'hidden',
              transition: 'border-color .18s',
            }}>
              {/* accordion header */}
              <button
                onClick={() => setExpandedSkill(isOpen ? '' : skillId)}
                style={{
                  width: '100%', padding: '15px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{skill.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: cv('--ink') }}>
                      Упражнения: {skill.label}
                    </div>
                    <div style={{ fontSize: 11.5, color: cv('--ink-soft'), marginTop: 1 }}>
                      {skill.approach}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {count > 0 && (
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '2px 9px',
                      borderRadius: 20, background: cv('--red'), color: '#fff',
                    }}>
                      {count}
                    </span>
                  )}
                  <span style={{
                    fontSize: 14, color: cv('--ink-soft'), transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform .2s', display: 'block',
                  }}>▾</span>
                </div>
              </button>

              {/* accordion body */}
              {isOpen && (
                <div style={{ padding: '0 20px 20px' }}>
                  <p style={{ fontSize: 12, color: cv('--ink-mid'), marginBottom: 14, lineHeight: 1.5 }}>
                    Нажми на нужные упражнения — они будут включены в промпт.{' '}
                    <strong style={{ color: cv('--red') }}>Можно выбрать несколько.</strong>
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {tools.map(tool => {
                      const on = toolSet.has(tool.id);
                      return (
                        <button
                          key={tool.id}
                          onClick={() => toggleTool(skillId, tool.id)}
                          style={{
                            border: `1.5px solid ${on ? cv('--red') : cv('--line')}`,
                            background: on ? cv('--red-bg') : cv('--white'),
                            borderRadius: 12, padding: '12px 13px',
                            cursor: 'pointer', transition: 'all .15s',
                            position: 'relative', display: 'flex',
                            alignItems: 'flex-start', gap: 10, textAlign: 'left',
                            fontFamily: "'Outfit', sans-serif",
                          }}
                        >
                          {on && (
                            <span style={{
                              position: 'absolute', top: 7, right: 9,
                              fontSize: 11, fontWeight: 700, color: cv('--red'),
                            }}>✓</span>
                          )}
                          <div style={{
                            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 17, background: tool.bg,
                          }}>
                            {tool.icon}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: 12.5, fontWeight: 600, color: cv('--ink'),
                              lineHeight: 1.3, marginBottom: 3, paddingRight: 14,
                            }}>
                              {tool.name}
                            </div>
                            <div style={{
                              fontSize: 11, color: cv('--ink-soft'), lineHeight: 1.4,
                              display: '-webkit-box', WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical', overflow: 'hidden',
                            } as React.CSSProperties}>
                              {tool.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {count > 0 && (
                    <div style={{
                      marginTop: 12, padding: '9px 12px',
                      background: cv('--bg'), border: `1px solid ${cv('--line')}`,
                      borderRadius: 8, fontSize: 12, color: cv('--ink-mid'), lineHeight: 1.7,
                    }}>
                      Выбрано: {[...toolSet].map(id => tools.find(t => t.id === id)?.name || id).join(' · ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* ══ 6 · Topic + Audience ══ */}
        <Block title="Тема и аудитория">
          <div style={{ marginBottom: 12 }}>
            <Label>Тема урока</Label>
            <StyledInput value={topic} onChange={setTopic} placeholder="Travel, Present Perfect, Job Interview..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <Label>Тональность урока</Label>
              <StyledSelect value={tone} onChange={setTone}>
                {['Communicative', 'Academic', 'Business', 'Gamified', 'Creative'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </StyledSelect>
            </div>
          </div>
          <Label>Аудитория и интересы</Label>
          <StyledTextarea
            value={audience}
            onChange={setAudience}
            placeholder="Напр: Взрослые 25–40 лет, офисные работники. Интересуются карьерой и путешествиями. 2 раза в неделю, цель — разговорный уровень..."
          />
        </Block>

        {/* ══ 7 · Design ══ */}
        <Block title="Дизайн воркбука">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
            {DESIGNS.map(d => {
              const on = designId === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setDesignId(d.id)}
                  style={{
                    border: `1.5px solid ${on ? cv('--red') : cv('--line')}`,
                    borderRadius: 10, padding: '10px 8px',
                    cursor: 'pointer', textAlign: 'center',
                    transition: 'all .15s', position: 'relative',
                    background: on ? cv('--red-bg') : cv('--white'),
                  }}
                >
                  {on && (
                    <span style={{ position: 'absolute', top: 5, right: 7, fontSize: 10, color: cv('--red'), fontWeight: 700 }}>✓</span>
                  )}
                  <DesignSwatch id={d.id} />
                  <span style={{ display: 'block', fontSize: 11.5, fontWeight: 600, color: cv('--ink') }}>{d.name}</span>
                  <span style={{ fontSize: 10, color: cv('--ink-soft') }}>{d.short}</span>
                </div>
              );
            })}
          </div>
          {designId === 'custom' && (
            <StyledTextarea
              value={designCustom}
              onChange={setDesignCustom}
              placeholder="Цвета, шрифты, расположение блоков, визуальные элементы..."
              minHeight={60}
            />
          )}
        </Block>

        {/* ══ 8 · Special requirements ══ */}
        <Block title="Особые требования">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {CHIPS.map(chip => {
              const on = activeChips.has(chip.id);
              return (
                <button
                  key={chip.id}
                  onClick={() => toggleChip(chip.id)}
                  style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 12.5, fontWeight: 500,
                    padding: '6px 13px', borderRadius: 20,
                    border: `1.5px solid ${on ? cv('--red') : cv('--line')}`,
                    background: on ? cv('--red') : cv('--bg'),
                    color: on ? '#fff' : cv('--ink-mid'),
                    cursor: 'pointer', transition: 'all .13s', userSelect: 'none',
                  }}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
          {activeChips.size > 0 && (
            <div style={{
              marginTop: 10, padding: '9px 12px', background: cv('--bg'),
              border: `1px solid ${cv('--line')}`, borderRadius: 8,
              fontSize: 12.5, color: cv('--ink-mid'), lineHeight: 1.7,
            }}>
              {[...activeChips].map(id => CHIPS.find(c => c.id === id)?.label || id).join(' · ')}
            </div>
          )}
          {activeChips.size === 0 && (
            <div style={{
              marginTop: 10, padding: '9px 12px', background: cv('--bg'),
              border: `1px solid ${cv('--line')}`, borderRadius: 8,
              fontSize: 12.5, color: cv('--ink-soft'), lineHeight: 1.7,
            }}>
              <em>Нажми на кнопки выше, чтобы добавить</em>
            </div>
          )}
          <div style={{ borderTop: `1px solid ${cv('--line')}`, margin: '16px 0' }} />
          <Label>Своё требование</Label>
          <StyledTextarea
            value={extra}
            onChange={setExtra}
            placeholder="Любое дополнительное пожелание..."
            minHeight={60}
          />
        </Block>

        {/* ══ Summary bar ══ */}
        <div style={{
          background: cv('--white'), border: `1px solid ${cv('--line')}`,
          borderRadius: 14, padding: '14px 18px', marginBottom: 12,
          display: 'flex', flexWrap: 'wrap', gap: '6px 16px', alignItems: 'center',
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: cv('--ink-soft') }}>Сводка:</span>
          {[
            `${lang === '__other__' ? (langCustom || '?') : lang}`,
            `${level}`,
            `${[...activeSkills].map(id => SKILLS.find(s => s.id === id)?.label).join(' + ')}`,
            `${METHODOLOGIES.find(m => m.id === methodId)?.name}`,
            `${duration} мин`,
            `${DESIGNS.find(d => d.id === designId)?.name}`,
            totalTools > 0 ? `${totalTools} упражн.` : null,
            activeChips.size > 0 ? `${activeChips.size} треб.` : null,
          ].filter(Boolean).map((t, i) => (
            <span key={i} style={{
              fontSize: 12, fontWeight: 600, padding: '3px 10px',
              borderRadius: 20, background: cv('--red-bg'), color: cv('--red'),
            }}>{t}</span>
          ))}
        </div>

      </div>

      {/* ── Sticky generate button ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 20px',
        background: 'linear-gradient(to top, #F4F0EC 65%, transparent)',
        display: 'flex', justifyContent: 'center', zIndex: 50,
      }}>
        <button
          onClick={generate}
          style={{
            maxWidth: 660, width: '100%',
            background: cv('--red'), color: '#fff', border: 'none',
            borderRadius: 13, padding: '16px 24px',
            fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600,
            cursor: 'pointer', letterSpacing: '0.01em',
            boxShadow: '0 4px 18px rgba(224,58,30,.3)',
            transition: 'all .18s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.background = '#bf3018';
            (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.background = cv('--red');
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
        >
          Создать методический промпт →
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; }
        button { cursor: pointer; }
        input, select, textarea { font-family: 'Outfit', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F4F0EC; }
        ::-webkit-scrollbar-thumb { background: #E4DDD7; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #A8958C; }
        @media (max-width: 420px) {
          h1 { font-size: 25px !important; }
        }
      `}</style>
    </div>
  );
}
