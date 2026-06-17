// lintCopy.js — replica das regras do scripts/lint-voz.sh em JS puro.
// Roda 100% no browser (sem precisar bash). Mantém sincronismo via comentário.

export const RULES = [
  {case: 'i', sev: 'BLOQUEIA', name: 'brand:DOM.a digitada',           pattern: /DOM\.a/},
  {case: '',  sev: 'BLOQUEIA', name: 'brand:DOMA caixa-alta em prosa', pattern: /\bDOMA\b/},
  {case: 'i', sev: 'BLOQUEIA', name: "voz:julgador 'luxo de quem'",    pattern: /luxo de quem/i},
  {case: 'i', sev: 'BLOQUEIA', name: "voz:julgador 'preguiça'",        pattern: /\bpregui[çc]a\b/i},
  {case: 'i', sev: 'BLOQUEIA', name: "voz:julgador 'burrice/idiota'",  pattern: /\b(burrice|idiota)\b/i},
  {case: 'i', sev: 'AVISO',    name: 'voz:promessa-atalho',            pattern: /(10x em [0-9]+ dias|em 1 click resolve)/i},
  {case: 'i', sev: 'AVISO',    name: "voz:anglicismo 'performance'",   pattern: /\bperformance\b/i},
  {case: 'i', sev: 'AVISO',    name: "voz:anglicismo 'tracking'",      pattern: /\btracking\b/i},
  {case: 'i', sev: 'AVISO',    name: "voz:anglicismo 'deliver'",       pattern: /\bdeliver\b/i},
  {case: 'i', sev: 'AVISO',    name: "voz:anglicismo 'workflow'",      pattern: /\bworkflow\b/i},
  {case: 'i', sev: 'AVISO',    name: 'voz:ataque-concorrente',         pattern: /(diferente do sistema |no [A-Z][a-z]+ você não tem)/i},
];

// Skip se a linha é contra-exemplo documentado (mesmo do shell)
const SKIP_LINE = /(❌|NÃO usar|nunca|erro recorrente|errado:|anti-padrão|NÃO escrever|não "|não usar|trocar por)/i;
const QUOTED_TERM = /["'](DOMA|DOM\.a)["']/;

export function lintCopy(text) {
  const lines = text.split('\n');
  const findings = [];
  lines.forEach((row, i) => {
    if (SKIP_LINE.test(row)) return;
    if (QUOTED_TERM.test(row)) return;
    RULES.forEach(rule => {
      if (rule.pattern.test(row)) {
        findings.push({line: i + 1, sev: rule.sev, name: rule.name, text: row});
      }
    });
  });
  const bloqueia = findings.filter(f => f.sev === 'BLOQUEIA').length;
  const aviso = findings.filter(f => f.sev === 'AVISO').length;
  const verdict = bloqueia > 0 ? 'BLOQUEIA' : aviso > 0 ? 'AVISO' : 'OK';
  return {verdict, bloqueia, aviso, findings};
}

export const SUGGEST = {
  'luxo de quem': 'Reescrever sem julgar leitor. Ex: "O sentimento engana." OU "Sem X, decisão vira aposta."',
  'DOM.a': 'Trocar por "Doma" (prosa) OU usar asset PNG do logo.',
  'performance': 'Traduzir → "resultado" / "desempenho".',
  'tracking': 'Traduzir → "acompanhamento" / "rastreamento".',
  'deliver': 'Traduzir → "entregar".',
  'workflow': 'Traduzir → "fluxo".',
  'pregui[çc]a': 'Voz Doma não julga. Reescrever sem ataque.',
  'burrice': 'Voz Doma não julga.',
  'DOMA': 'Em prosa, escrever "Doma". Caixa-alta SÓ em lockup visual ("SEMANAÇO DOMA").',
};
