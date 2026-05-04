import { SKILLS, TOOL_PROMPTS, DESIGNS, CHIPS, METHODOLOGIES } from './data';

export interface FormState {
  lang: string;
  langCustom: string;
  methodId: string;
  skills: Set<string>;
  selectedTools: Map<string, Set<string>>; // skillId -> Set<toolId>
  level: string;
  duration: string;
  topic: string;
  tone: string;
  audience: string;
  designId: string;
  designCustom: string;
  chips: Set<string>;
  extra: string;
}

export interface PromptMeta {
  tags: string[];
  text: string;
}

export function buildPrompt(s: FormState): PromptMeta {
  const L = s.lang === '__other__' ? (s.langCustom.trim() || '[язык]') : s.lang;
  const level = s.level;
  const duration = s.duration;
  const topic = s.topic.trim() || '[тема не указана]';
  const tone = s.tone;
  const audience = s.audience.trim() || '[аудитория не указана]';
  const extra = s.extra.trim();

  const method = METHODOLOGIES.find(m => m.id === s.methodId) || METHODOLOGIES[0];

  const skillList = SKILLS.filter(sk => s.skills.has(sk.id));
  const designObj = DESIGNS.find(d => d.id === s.designId) || DESIGNS[0];
  const designSpec = s.designId === 'custom'
    ? (s.designCustom.trim() || '[стиль не описан]')
    : designObj.prompt;

  // Build per-skill tool lines
  const allToolLines: string[] = [];
  skillList.forEach(skill => {
    const toolSet = s.selectedTools.get(skill.id) || new Set<string>();
    if (toolSet.size === 0) return;
    allToolLines.push(`\n  [${skill.label.toUpperCase()} EXERCISES]`);
    [...toolSet].forEach(id => {
      const prompt = TOOL_PROMPTS[id];
      if (prompt) allToolLines.push(`  • ${prompt}`);
    });
  });

  const chipsLines = [...s.chips].map(id => {
    const chip = CHIPS.find(c => c.id === id);
    return chip ? `• ${chip.prompt}` : '';
  }).filter(Boolean);
  if (extra) chipsLines.push(`• ${extra}`);

  // Multi-skill sequences
  const skillSequences = skillList.map((sk, i) => {
    const steps = sk.steps.map((step, j) => `   ${j + 1}. ${step}`).join('\n');
    return `  ── SKILL ${i + 1}: ${sk.label.toUpperCase()} (${sk.approach}) ──\n${steps}\n  Standard: ${sk.std}`;
  }).join('\n\n');

  const skillLabels = skillList.map(sk => sk.label).join(' + ');

  const tags = [
    L,
    level,
    skillLabels || 'No skill',
    `${duration}min`,
    tone,
    method.name,
    designObj.name,
  ];

  const text = `You are a senior ELT materials developer and certified Cambridge CELTA/DELTA trainer with 20+ years of experience creating award-winning workbooks for Cambridge University Press, Pearson, and Macmillan Education.

YOUR TASK:
Create a complete, print-ready workbook page for a ${duration}-minute ${L} lesson.

══════════════════════════════════════
LESSON SPECIFICATION
══════════════════════════════════════
Language:     ${L}
CEFR Level:   ${level} — adhere strictly to official CEFR vocabulary and grammar inventories. Do not use structures or lexis from a higher band without explicit scaffolding.
Skill(s):     ${skillLabels}
Methodology:  ${method.name} — ${method.short}
Topic:        ${topic}
Duration:     ${duration} minutes
Tone:         ${tone}

Target Audience:
${audience}

══════════════════════════════════════
METHODOLOGICAL FRAMEWORK
══════════════════════════════════════
${method.promptLine}

══════════════════════════════════════
EXERCISE SEQUENCE PER SKILL
══════════════════════════════════════
${skillSequences || 'Follow the methodology framework above for all exercises.'}
${allToolLines.length ? `\n══════════════════════════════════════\nSPECIFIC EXERCISE TYPES TO INCLUDE\n══════════════════════════════════════\nIntegrate the following naturally into the exercise sequence:${allToolLines.join('\n')}` : ''}
${chipsLines.length ? `\n══════════════════════════════════════\nSPECIAL REQUIREMENTS\n══════════════════════════════════════\n${chipsLines.join('\n')}` : ''}

══════════════════════════════════════
WORKBOOK DESIGN
══════════════════════════════════════
Style: ${s.designId === 'custom' ? 'Custom' : designObj.name}
${designSpec}

Describe all visual formatting with enough detail for a DTP operator to reproduce the layout without interpretation.

══════════════════════════════════════
CONTENT STANDARDS
══════════════════════════════════════
1. CEFR — All vocabulary and grammar within ${level} range. Annotate borderline items [${level}+] with rationale.
2. CONTEXT — All exercises share one coherent thematic thread ("${topic}"). No isolated filler sentences.
3. SCAFFOLDING — Recognition → manipulation → production. Each exercise enables the next.
4. BLOOM'S — Early tasks: Remember/Understand. Later: Apply/Analyse/Evaluate/Create. At least one task requires students to justify a choice or produce original language.
5. LANGUAGE — All texts and examples must sound like real ${L} a native speaker would actually use.
6. INSTRUCTIONS — All student-facing text in clear, level-appropriate ${L}. Students must work independently.
7. INCLUSIVITY — Culturally neutral, diverse names and contexts, no stereotypes.

══════════════════════════════════════
OUTPUT STRUCTURE
══════════════════════════════════════
🎯 LEARNING OBJECTIVES
   2–3 student-facing "By the end of this lesson I will be able to…" statements, each mapped to a Bloom's level.

📘 EXERCISES
   For each: bold type label · instruction in ${L} (max 2 sentences) · support note if needed · full exercise content · [⏱ X min]

💡 LANGUAGE SUPPORT BOX
   Compact reference (grammar rule / vocabulary / useful phrases). Placed before the exercise that requires it.

✅ ANSWER KEY
   Full answers for closed tasks. For productive tasks: model answer + 2–3 sentence annotation on effectiveness at ${level}.

📝 TEACHER NOTES (max 5 bullets)
   Timing · common errors to anticipate · fast-finisher extension · differentiation tip · materials needed

══════════════════════════════════════
VERIFY BEFORE OUTPUTTING:
══════════════════════════════════════
□ All language within ${level} CEFR range
□ All instructions in ${L} and unambiguous
□ Logical scaffolding throughout
□ At least one higher-order thinking task
□ Complete and accurate answer key
□ Exercises fill ${duration} minutes
□ Content relevant to "${topic}"
□ Design described with DTP precision

Output the workbook directly — no preamble or meta-commentary.`;

  return { tags, text };
}
