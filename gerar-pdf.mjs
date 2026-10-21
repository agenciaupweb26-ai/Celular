// Gera folder-ists.pdf (A4 paisagem, 2 páginas) a partir de folder-ists.html.
// Uso: node gerar-pdf.mjs
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execSync } from 'node:child_process';

// Usa o playwright do projeto ou, se não houver, o instalado globalmente.
const { chromium } = await import('playwright').catch(() =>
  import(path.join(execSync('npm root -g').toString().trim(), 'playwright', 'index.mjs'))
);

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + path.join(dir, 'folder-ists.html'), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// Avisa se algum painel tiver conteúdo cortado.
const cortes = await page.$$eval('.painel', (els) =>
  els.map((el, i) => ({ i, sobra: el.scrollHeight - el.clientHeight })).filter((p) => p.sobra > 1)
);
if (cortes.length) console.warn('Painéis com conteúdo cortado:', cortes);

await page.pdf({
  path: path.join(dir, 'folder-ists.pdf'),
  format: 'A4',
  landscape: true,
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();
console.log('folder-ists.pdf gerado');
