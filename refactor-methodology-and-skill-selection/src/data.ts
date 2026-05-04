// ─────────────────────────────────────────────
//  METHODOLOGIES
// ─────────────────────────────────────────────
export interface Methodology {
  id: string;
  name: string;
  short: string;
  icon: string;
  desc: string;
  promptLine: string;
}

export const METHODOLOGIES: Methodology[] = [
  {
    id: 'ppp',
    name: 'PPP',
    short: 'Presentation → Practice → Production',
    icon: '📐',
    desc: 'Классическая трёхэтапная модель. Идеально для грамматики и лексики.',
    promptLine: 'Use the PPP framework (Presentation → Practice → Production): first present the target language in context with concept-check questions; then move through controlled and semi-controlled practice; finally set a freer production task.',
  },
  {
    id: 'tbl',
    name: 'TBL',
    short: 'Task-Based Learning',
    icon: '🎯',
    desc: 'Задача в центре. Студенты сначала выполняют задание, потом анализируют язык.',
    promptLine: 'Use the Task-Based Learning framework (Willis, 1996): Pre-task activation → Task → Planning → Report → Language Focus → Practice. Language analysis emerges from authentic task performance.',
  },
  {
    id: 'lexical',
    name: 'Lexical',
    short: 'Lexical Approach',
    icon: '🧩',
    desc: 'Язык — это чанки и коллокации. Акцент на готовых выражениях.',
    promptLine: "Use the Lexical Approach (Lewis, 1993): treat language as chunks and collocations, not grammar rules. Focus on multi-word units, fixed expressions, and collocation patterns. Vocabulary is never taught in isolation — always in authentic context.",
  },
  {
    id: 'clt',
    name: 'CLT',
    short: 'Communicative Language Teaching',
    icon: '💬',
    desc: 'Коммуникация как цель и средство обучения. Fluency over accuracy.',
    promptLine: 'Use Communicative Language Teaching principles: authenticity, information gaps, negotiation of meaning. Prioritise fluency alongside accuracy. Every task must have a genuine communicative purpose.',
  },
  {
    id: 'tblt',
    name: 'TBLT',
    short: 'Task-Based Language Teaching',
    icon: '🔧',
    desc: 'Системный вариант TBL с чётким языковым анализом после задачи.',
    promptLine: 'Use Task-Based Language Teaching (Ellis, 2003): design around a pedagogic task with clear outcome. Include pre-task, during-task, and post-task phases. Language focus follows task completion and is drawn from learner output.',
  },
  {
    id: 'ddi',
    name: 'DDI',
    short: 'Data-Driven / Inductive',
    icon: '🔍',
    desc: 'Студенты сами открывают правила через данные и примеры.',
    promptLine: 'Use a Data-Driven / Inductive approach: present authentic language examples first; guide students to notice patterns and hypothesise rules; only confirm or refine the rule after learner discovery. Minimise explicit grammar presentation.',
  },
  {
    id: 'flipped',
    name: 'Flipped',
    short: 'Flipped Classroom',
    icon: '🔄',
    desc: 'Теория — дома, практика — на уроке. Максимум живого взаимодействия.',
    promptLine: 'Use a Flipped Classroom model: assume students have studied core input at home. The lesson focuses entirely on application, discussion, and production. Include a brief 5-min recap check at the start, then move immediately to communicative tasks.',
  },
  {
    id: 'eclectic',
    name: 'Eclectic',
    short: 'Best-of-All Approach',
    icon: '⚡',
    desc: 'Гибкий микс лучших методик под конкретный класс.',
    promptLine: 'Use an Eclectic approach: combine the most effective elements from PPP, CLT, and Lexical Approach based on what the target language and learner profile require. Justify each methodological choice briefly in the Teacher Notes.',
  },
];

// ─────────────────────────────────────────────
//  SKILLS
// ─────────────────────────────────────────────
export interface Skill {
  id: string;
  label: string;
  icon: string;
  approach: string;
  steps: string[];
  std: string;
}

export const SKILLS: Skill[] = [
  {
    id: 'grammar',
    label: 'Grammar',
    icon: '📐',
    approach: 'PPP — Presentation → Practice → Production',
    steps: [
      'Guided Discovery — students notice the target form in context before the rule is stated',
      'Concept Check Questions (CCQs) — 2–3 yes/no questions verifying understanding of form, meaning, and use',
      'Controlled Practice — gap-fill or transformation with a single correct answer',
      'Semi-controlled Practice — guided dialogue or sentence completion; form constrained, meaning open',
      'Freer Production — open situational task requiring natural deployment of the target structure',
    ],
    std: 'Teach Form–Meaning–Use triad. Address the most frequent learner errors. Include a grammar reference box before controlled practice.',
  },
  {
    id: 'vocabulary',
    label: 'Vocabulary',
    icon: '📚',
    approach: "Lexical Approach + Nation's 4 Strands",
    steps: [
      'Lexical Mapping — semantic cluster or word-web activating prior knowledge',
      'Meaning in Context — students deduce meaning from a connected reading passage',
      'Controlled Matching — word-to-definition or word-to-collocation pairing',
      'Odd One Out — identify the misfit word and justify the choice in writing',
      "Personalised Production — 3–5 sentences about the student's own life using target vocabulary",
    ],
    std: 'Teach words in natural collocations, never in isolation. Cover register and connotation.',
  },
  {
    id: 'reading',
    label: 'Reading',
    icon: '👁',
    approach: 'Top-down + Bottom-up Integration',
    steps: [
      'Pre-reading Schema Activation — predict content from title, subheading, or 3 key words',
      'Skimming for Gist — one-sentence summary or paragraph-heading matching in 90 seconds',
      'Scanning for Specific Information — locate 5–6 facts, names, or figures',
      'True / False / Not Given — critical reading requiring students to cite line numbers as evidence',
      'Vocabulary from Context — infer the meaning of 4 highlighted words using surrounding context',
    ],
    std: 'Use authentic or semi-authentic texts. All tasks answerable from the text alone. Include one post-reading personalised opinion question.',
  },
  {
    id: 'listening',
    label: 'Listening',
    icon: '🎧',
    approach: 'Pre / While / Post Listening Framework',
    steps: [
      'Schema Activation — students predict 3 things they will hear; elicit topic vocabulary',
      'Listening for Gist — one global question answered after a single complete listen',
      'Listening for Detail — gap-fill or multiple choice on a second careful listen',
      'Inference Task — what emotion or attitude is communicated but not stated directly?',
      "Post-listening Response — personalised discussion question linking the audio to students' own experience",
    ],
    std: 'Specify audio type. Include tapescript for self-study. Each sub-task must have a distinct cognitive demand.',
  },
  {
    id: 'writing',
    label: 'Writing',
    icon: '✍️',
    approach: 'Process Writing Approach (Hedge, 2005)',
    steps: [
      'Model Text Analysis — identify structure, register, and key language features',
      'Brainstorming — mind-map or note frame to generate and organise ideas',
      'Language Scaffold Box — curated phrases, starters, and discourse markers at this CEFR level',
      'Guided Draft — writing task with paragraph-by-paragraph structural prompt',
      'Peer Editing Checklist — 5-criterion checklist for structured partner feedback',
    ],
    std: 'Specify the exact text type. Model text must match the CEFR level. Scaffold intensity decreases as exercises progress.',
  },
  {
    id: 'speaking',
    label: 'Speaking',
    icon: '🗣',
    approach: 'Task-Based Language Teaching — Willis Framework (1996)',
    steps: [
      'Lead-in Discussion — 2–3 engaging questions to activate topic and lower the affective filter',
      'Language Input — key expressions, discourse markers, and communication strategies',
      'Controlled Speaking — structured information gap or guided dialogue',
      'Communicative Task — open role play, debate, or collaborative decision-making',
      'Reflection — self-assessment: fluency, vocabulary range, communication success (1–5 + improvement goal)',
    ],
    std: 'Specify interaction patterns. Include a speaking rubric with 3–4 criteria. Language box must be available during the communicative task.',
  },
];

// ─────────────────────────────────────────────
//  TOOLS PER SKILL
// ─────────────────────────────────────────────
export interface Tool {
  id: string;
  name: string;
  icon: string;
  bg: string;
  desc: string;
}

export const TOOLS: Record<string, Tool[]> = {
  grammar: [
    { id: 'fitg',      name: 'Fill in the Gap',          icon: '✏️', bg: '#F3F0FF', desc: 'Gaps with a word list — students restore missing words' },
    { id: 'brackets',  name: 'Gaps with Brackets',       icon: '[ ]', bg: '#F3F0FF', desc: 'Students write the correct form from the word in brackets' },
    { id: 'abcd',      name: 'Gaps with ABCD',           icon: '🔤', bg: '#F3F0FF', desc: 'Multiple-choice cloze — students pick A, B, C, or D' },
    { id: 'slash',     name: 'Two Options / Slash',      icon: '⚡', bg: '#F3F0FF', desc: 'Students choose the correct word from two options shown' },
    { id: 'rewrite',   name: 'Rewrite the Sentence',     icon: '🔁', bg: '#F3F0FF', desc: 'Students rewrite full sentences using a target structure' },
    { id: 'errorcorr', name: 'Error Correction',         icon: '🚨', bg: '#F3F0FF', desc: 'Sentences with mistakes — students identify and fix them' },
    { id: 'fillopt',   name: 'Fill Gaps from Options',   icon: '📋', bg: '#F3F0FF', desc: 'Gap-fill with a provided word bank to choose from' },
    { id: 'rules',     name: 'Grammar Rules Box',        icon: '📖', bg: '#F3F0FF', desc: 'Customised grammar rules and explanations for the topic' },
    { id: 'typeany',   name: 'Open Gap',                 icon: '💬', bg: '#F3F0FF', desc: 'Open-ended gaps — any grammatically valid word accepted' },
    { id: 'matchhalf', name: 'Matching Halves',          icon: '🧩', bg: '#F3F0FF', desc: 'Students match sentence halves to form complete sentences' },
  ],
  vocabulary: [
    { id: 'wordimg',   name: 'Word–Image Matching',      icon: '🖼', bg: '#FFF0F8', desc: 'Students match each word to the correct picture' },
    { id: 'worddef',   name: 'Word–Definition Match',    icon: '🔗', bg: '#FFF0F8', desc: 'Automatically creates word-to-definition matching exercise' },
    { id: 'oddone',    name: 'Odd One Out',              icon: '❌', bg: '#FFF0F8', desc: "Students choose which word doesn't belong and explain why" },
    { id: 'wordtrans', name: 'Word–Translation Match',   icon: '🔄', bg: '#FFF0F8', desc: 'Translates a word list and creates a matching exercise' },
    { id: 'essential', name: 'Essential Vocabulary',     icon: '⭐', bg: '#FFF0F8', desc: 'Suggests the key vocabulary items for the chosen topic' },
    { id: 'rephrase',  name: 'Rephrase the Sentence',    icon: '✍️', bg: '#FFF0F8', desc: 'Students rewrite sentences using a given target word' },
    { id: 'extract',   name: 'Extract Vocabulary',       icon: '🔍', bg: '#FFF0F8', desc: 'Extracts key words and phrases from any text' },
    { id: 'wordsorter',name: 'Word Sorter',              icon: '📊', bg: '#FFF0F8', desc: 'Students group words logically, reinforcing vocabulary' },
    { id: 'senttrans', name: 'Sentence Translation',     icon: '🌐', bg: '#FFF0F8', desc: 'Students translate target sentences with new vocabulary' },
    { id: 'vocabfitg', name: 'Vocabulary Gap-Fill',      icon: '✏️', bg: '#FFF0F8', desc: 'Gap-fill using lesson vocabulary in context' },
  ],
  reading: [
    { id: 'textany',  name: 'Create a Text',            icon: '📄', bg: '#F0F8FF', desc: 'Generates a reading text integrating your vocabulary list' },
    { id: 'truefals', name: 'True / False',             icon: '✅', bg: '#F0F8FF', desc: 'Creates T/F reading comprehension exercise from any text' },
    { id: 'dialogue', name: 'Create a Dialogue',        icon: '💬', bg: '#F0F8FF', desc: 'Dialogue on any topic or text for students to read aloud' },
    { id: 'simplify', name: 'Simplify or Upgrade',      icon: '⚖️', bg: '#F0F8FF', desc: 'Adapts the text level up or down to match CEFR' },
    { id: 'readbits', name: 'Reading Bits & Pieces',    icon: '📰', bg: '#F0F8FF', desc: 'Creates all kinds of small reading texts for the lesson' },
    { id: '3titles',  name: 'Three Titles',             icon: '3️⃣', bg: '#F0F8FF', desc: 'Two wrong titles and one correct — students identify the right one' },
    { id: 'leadin',   name: 'Lead-in Activities',       icon: '🚀', bg: '#F0F8FF', desc: '3 engaging warm-up activities before reading the text' },
  ],
  listening: [
    { id: 'warmuplis',  name: 'Warm-Up Before Listening', icon: '🔊', bg: '#F0FFF8', desc: 'Discussion questions to activate schema before audio task' },
    { id: 'listdial',   name: 'Create a Dialogue',        icon: '💬', bg: '#F0FFF8', desc: 'Dialogue to be used as an audio script for the lesson' },
    { id: 'listleadin', name: 'Lead-in Activities',       icon: '🚀', bg: '#F0FFF8', desc: '3 ideas for engaging students before the listening task' },
    { id: 'listfacts',  name: 'Interesting Facts',        icon: '💡', bg: '#F0FFF8', desc: '10 facts on the topic for prediction or pre-teaching' },
    { id: 'listtext',   name: 'Create a Text',            icon: '📄', bg: '#F0FFF8', desc: 'Text that can be read aloud or turned into a script' },
    { id: 'listtruef',  name: 'True / False',             icon: '✅', bg: '#F0FFF8', desc: 'T/F comprehension exercise based on audio content' },
  ],
  writing: [
    { id: '4opinions', name: 'Four Opinions',            icon: '💭', bg: '#FFFAF0', desc: '4 opinions by different people — sparks discussion and writing' },
    { id: 'quotes',    name: 'Quotes by Famous People',  icon: '🗣', bg: '#FFFAF0', desc: 'Quotes on the topic — perfect for essay writing warm-ups' },
    { id: 'linkwords', name: 'Link Words to Sentences',  icon: '🔗', bg: '#FFFAF0', desc: 'Students create unique sentences using given link words' },
    { id: 'writtrans', name: 'Sentence Translation',     icon: '🌐', bg: '#FFFAF0', desc: 'Translation exercise developing writing accuracy' },
    { id: 'writtext',  name: 'Model Text',               icon: '📄', bg: '#FFFAF0', desc: 'Model text for students to analyse before writing their own' },
    { id: 'writpros',  name: 'Pros & Cons List',         icon: '⚖️', bg: '#FFFAF0', desc: 'Pros and cons list for discussion or essay planning' },
  ],
  speaking: [
    { id: 'warmupspk', name: 'Warm-Up Questions',        icon: '💬', bg: '#FFFBF0', desc: 'Engaging discussion questions before the speaking task' },
    { id: 'speakdial', name: 'Model Dialogue',           icon: '🎭', bg: '#FFFBF0', desc: 'Dialogue as a model or role-play script for students' },
    { id: 'speaklead', name: 'Lead-in Activities',       icon: '🚀', bg: '#FFFBF0', desc: '3 creative ideas to activate the speaking topic' },
    { id: 'facts',     name: 'Interesting Facts',        icon: '💡', bg: '#FFFBF0', desc: '10 surprising facts — great for icebreakers or debates' },
    { id: 'proscons',  name: 'Pros & Cons',              icon: '⚖️', bg: '#FFFBF0', desc: 'Use for discussions, debates, or opinion-sharing tasks' },
    { id: 'speakquo',  name: 'Quotes by Famous People',  icon: '🗣', bg: '#FFFBF0', desc: 'Quotes to spark conversation and critical thinking' },
    { id: 'speaklink', name: 'Link Words Practice',      icon: '🔗', bg: '#FFFBF0', desc: 'Students build sentences using discourse markers' },
  ],
};

// ─────────────────────────────────────────────
//  TOOL PROMPTS
// ─────────────────────────────────────────────
export const TOOL_PROMPTS: Record<string, string> = {
  fitg:      'Include a Fill-in-the-Gap exercise: select 8–10 key words from the lesson, remove them from a connected paragraph, and provide the word list below the text for students to restore.',
  brackets:  'Include a Gaps with Brackets exercise: provide sentences with the infinitive form of the verb in brackets; students write the correct form in the gap.',
  abcd:      'Include a multiple-choice cloze exercise (Gaps with ABCD): for each gap provide options A, B, C, D — only one grammatically or lexically correct.',
  slash:     'Include a Two Options with a Slash exercise: pairs of options separated by a slash in each sentence; students circle or underline the correct one.',
  rewrite:   'Include a Rewrite the Sentence exercise: 6 sentences that students must rewrite using the target grammar structure, keeping the original meaning.',
  errorcorr: 'Include an Error Correction exercise: 8 sentences each containing exactly one typical learner error for this level; students identify and correct it.',
  fillopt:   'Include a Fill Gaps from a List of Options exercise: gap-fill paragraph with a provided box of words — more words than gaps to make it challenging.',
  rules:     'Include a Grammar Rules reference box: concise, student-friendly explanation of the target structure with clear examples at this CEFR level.',
  typeany:   'Include a Type Anything into a Gap task: open-ended gaps where any grammatically valid and contextually appropriate word is accepted; 3–5 possible answers per gap in the answer key.',
  matchhalf: 'Include a Matching Halves exercise: 8 sentence beginnings in column A and 8 endings in column B; students match them to form correct, meaningful sentences.',
  wordimg:   'Include a Word–Image Matching exercise: 8 target words, each to be matched to a described image (provide [IMAGE: description] placeholders for the visuals).',
  worddef:   'Include a Word–Definition Matching exercise: target vocabulary items in one column, definitions in randomised order in another.',
  oddone:    "Include an Odd One Out exercise: 6 groups of 4 words; students identify the word that does not belong and write one sentence explaining why.",
  wordtrans: 'Include a Word–Translation Matching exercise: target words in the target language matched to their translations; focus on words with tricky false-friend potential.',
  essential: 'Include an Essential Vocabulary section: a curated list of the 10–12 most important words and phrases for this topic at this CEFR level, with a brief usage note for each.',
  rephrase:  'Include a Rephrase Using the Word Given exercise: 6 sentences to be rewritten using the word given in brackets without changing the original meaning.',
  extract:   'Include a vocabulary extraction task: students read the main lesson text and extract 6–8 key words, note part of speech, and write an example sentence.',
  wordsorter:'Include a Word Sorter exercise: 16 words in a jumbled list; students group them into 4 logical categories with a label they create themselves.',
  senttrans: "Include a Sentence Translation exercise: 6 sentences in the student's L1 that they translate into the target language using the lesson vocabulary.",
  vocabfitg: 'Include a vocabulary gap-fill exercise: a connected paragraph with 8 gaps; students choose from the lesson word list to fill each gap correctly in context.',
  textany:   'Create a bespoke reading text for the lesson topic (150–200 words for A1–A2, 250–350 for B1–B2, 400–500 for C1–C2) that naturally incorporates the target vocabulary and grammar.',
  truefals:  'Include a True / False / Not Given exercise: 8 statements about the reading text; students circle the correct answer and write the line number as evidence.',
  dialogue:  'Include a short scripted dialogue (10–14 exchanges) on the lesson topic for students to read, analyse for language, then adapt in their own version.',
  simplify:  'Provide two versions of the main reading text: the original, and a simplified version adapted down one CEFR level — useful for differentiation.',
  readbits:  "Include a 'Reading Bits and Pieces' section: 3 short authentic-style mini-texts (tweet, headline, short review) all related to the lesson topic, each with one comprehension question.",
  '3titles': 'Include a Three Titles task: write one accurate title and two plausible but incorrect titles for the reading text; students identify and justify the correct one.',
  leadin:    'Include 3 varied lead-in activities for the reading text: a prediction task, a vocabulary activation task, and a personal experience question.',
  warmuplis: 'Include a Warm-Up Before Listening activity: 4 discussion questions that activate schema and key vocabulary before students hear the audio.',
  listdial:  'Provide a full listening script: a natural dialogue (12–16 exchanges) between two speakers on the lesson topic, with stage directions and an audio note.',
  listleadin:'Include 3 lead-in activities for the listening task: a prediction activity, a vocabulary pre-teaching task, and an image or title response question.',
  listfacts: 'Include a 10 Interesting Facts warm-up: 10 surprising facts about the lesson topic that students use for a prediction or true/false quiz before listening.',
  listtext:  'Create a reading text that mirrors the audio content so students can check their listening comprehension by reading after completing the tasks.',
  listtruef: 'Include a True / False listening task: 8 statements; students listen and mark each true or false, then justify their answers on a second listen.',
  '4opinions':"Include a Four Opinions activity: 4 short statements by fictional characters expressing different views on the topic; students discuss, then write their own opinion paragraph.",
  quotes:    'Include 5 quotes by famous people relevant to the topic; students choose one they agree or disagree with and write a short paragraph response.',
  linkwords: 'Include a Link Words into Sentences task: 8 discourse markers or linkers; students write an original sentence for each that relates to the lesson topic.',
  writtrans: 'Include a Sentence Translation writing task: 6 sentences in L1 with deliberate complexity; students translate them using lesson vocabulary and structures.',
  writtext:  'Include a model text for analysis before the writing task: annotated with margin notes pointing out structural choices, useful phrases, and register features.',
  writpros:  'Include a Pros and Cons planning task: students complete a structured table of arguments before writing an essay or discussion paragraph.',
  warmupspk: 'Include 5 Warm-Up Discussion Questions to open the speaking lesson; each question should build from personal experience toward the main communicative task.',
  speakdial: 'Include a model dialogue (10–12 exchanges) as a speaking scaffold; students study its structure and language, then perform an adapted version.',
  speaklead: 'Include 3 Lead-in Activities for the speaking task: a visual stimulus discussion, a quick ranking activity, and a personalised question.',
  facts:     'Include 10 Interesting Facts about the lesson topic as a speaking warm-up; students react to each fact and share their own knowledge.',
  proscons:  'Include a Pros and Cons discussion activity: structured table + speaking prompts to help students argue both sides before expressing their final view.',
  speakquo:  'Include 4 Quotes by Famous People on the lesson topic; students discuss each quote in pairs before the main speaking task.',
  speaklink: 'Include a Link Words activity: 8 discourse markers for spoken English; students practise using each in a spontaneous sentence about the lesson topic.',
};

// ─────────────────────────────────────────────
//  DESIGN STYLES
// ─────────────────────────────────────────────
export interface DesignStyle {
  id: string;
  name: string;
  short: string;
  swatch: string; // JSX string or CSS
  prompt: string;
}

export const DESIGNS: DesignStyle[] = [
  {
    id: 'cambridge',
    name: 'Cambridge',
    short: 'Академический',
    swatch: 'cambridge',
    prompt: 'Classic academic ELT workbook (Cambridge University Press): white page, navy headers (#1a3a6e, bold 14pt), thin ruled writing lines (0.5pt grey, 8mm spacing), 1pt navy border boxes, Times New Roman 11pt body, numbered exercise labels, page number in footer.',
  },
  {
    id: 'natgeo',
    name: 'Nat Geo',
    short: 'Визуальный',
    swatch: 'natgeo',
    prompt: 'Bold editorial (National Geographic Learning): black header band with yellow stripe (#FFD100), full-width image placeholder zones, Helvetica-style sans-serif, large pull-quote boxes with yellow rule, 25mm margins, section numbers in yellow circles.',
  },
  {
    id: 'nordic',
    name: 'Nordic',
    short: 'Минималист',
    swatch: 'nordic',
    prompt: 'Scandinavian minimalist: white background (#fafafa), single dark accent (#111), 0.25pt hairline borders, 30mm left annotation margin, no decoration, small caps labels, monospaced exercise numbers, maximum whitespace.',
  },
  {
    id: 'kids',
    name: 'Kids',
    short: 'Игровой',
    swatch: 'kids',
    prompt: 'Bright children\'s workbook: pastel yellow background (#FFF9C4), coral (#FF5C3D) headings, sky blue (#4DC9E6) boxes, lime (#7DC95E) feedback, 12pt rounded corners, speech-bubble instructions, star self-assessment, 18pt minimum student text.',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    short: 'Деловой',
    swatch: 'corporate',
    prompt: 'Business English: 20mm dark sidebar (#1F2937) with mint rule (#6EE7B7), white content area, Montserrat headings, card-style exercise boxes (light grey fill, 8pt radius), vocabulary tracker box top-right, professional footer.',
  },
  {
    id: 'custom',
    name: 'Свой стиль',
    short: 'Описать',
    swatch: 'custom',
    prompt: '',
  },
];

// ─────────────────────────────────────────────
//  CHIPS (special requirements)
// ─────────────────────────────────────────────
export interface Chip {
  id: string;
  label: string;
  prompt: string;
}

export const CHIPS: Chip[] = [
  { id: 'translate',  label: '🔄 Перевод',           prompt: 'Include a translation exercise (L1↔L2) using full contextual sentences.' },
  { id: 'pairs',      label: '👥 Парная работа',      prompt: 'Design all productive tasks for pair work with Role A / Role B cards.' },
  { id: 'groups',     label: '👨‍👩‍👧 Группы',            prompt: 'Include one collaborative group task (3–4 students) with a defined shared outcome.' },
  { id: 'roleplay',   label: '🎭 Ролевая игра',       prompt: 'Include a fully developed role play with a situation card and role cards.' },
  { id: 'mindmap',    label: '🧠 Mind Map',           prompt: 'Include a guided mind-mapping activity (central concept + 3–4 branch prompts).' },
  { id: 'debate',     label: '⚡ Дебаты',             prompt: "Include a mini-debate with 3 argument prompts per side and a 'Useful Language' box." },
  { id: 'story',      label: '📖 Сторителлинг',      prompt: 'Include a storytelling task using at least 6 lesson vocabulary items.' },
  { id: 'game',       label: '🎮 Игровой элемент',   prompt: 'Add a competitive game element (quiz race, bingo, or points challenge) with clear rules.' },
  { id: 'authentic',  label: '📰 Аутентичный текст', prompt: 'Use an authentic real-world source as main input (news, social post, advert, or email).' },
  { id: 'culture',    label: '🌍 Культурный аспект', prompt: 'Include an intercultural awareness task inviting comparison across cultures.' },
  { id: 'selfcheck',  label: '📊 Самооценка',        prompt: "End with student self-assessment: 3 'I can…' statements, rated not yet / almost / yes!" },
  { id: 'hw',         label: '🏠 Домашнее задание',  prompt: 'Add a HOMEWORK task (10–15 min) extending the lesson independently.' },
  { id: 'notl1',      label: '🚫 Без перевода',       prompt: 'All instructions and support must be entirely in the target language.' },
  { id: 'critical',   label: '🔍 Критическое мышление', prompt: "Include at least two higher-order tasks (Bloom's: analyse, evaluate, or create)." },
  { id: 'audio',      label: '🎵 Аудио / скрипт',    prompt: 'Design for audio track use. Include full tapescript. Specify speakers and duration.' },
  { id: 'digital',    label: '💻 Цифровой формат',   prompt: 'Format for digital use: fillable fields, interactive placeholders, QR code zones.' },
  { id: 'errors',     label: '✏️ Работа с ошибками', prompt: 'Include error correction with 8 sentences containing typical learner errors.' },
  { id: 'review',     label: '🔁 Повторение',        prompt: 'Open with a 5-min warm-up reviewing vocabulary or grammar from the previous lesson.' },
];
