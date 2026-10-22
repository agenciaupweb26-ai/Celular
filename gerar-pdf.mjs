// Gera um PDF (A4 paisagem) para cada HTML informado.
// Uso: node gerar-pdf.mjs folder-ists-zine.html folder-ists-caderneta.html
// Sem argumentos, gera todos os folder-*.html da pasta.
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

// Usa o playwright do projeto ou, se não houver, o instalado globalmente.
const { chromium } = await import('playwright').catch(() =>
  import(path.join(execSync('npm root -g').toString().trim(), 'playwright', 'index.mjs'))
);

const dir = path.dirname(fileURLToPath(import.meta.url));
const arquivos = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(dir).filter((f) => /^folder-.*\.html$/.test(f));

const browser = await chromium.launch();
for (const arquivo of arquivos) {
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(dir, arquivo), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Avisa se algum painel tiver conteúdo cortado.
  const cortes = await page.$$eval('.painel', (els) =>
    els.map((el, i) => ({ i, sobra: el.scrollHeight - el.clientHeight })).filter((p) => p.sobra > 1)
  );
  if (cortes.length) console.warn(`${arquivo}: painéis com conteúdo cortado`, cortes);

  const saida = path.resolve(dir, arquivo.replace(/\.html$/, '.pdf'));
  await page.pdf({
    path: saida,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await page.close();
  console.log(path.basename(saida), 'gerado');
}
await browser.close();
