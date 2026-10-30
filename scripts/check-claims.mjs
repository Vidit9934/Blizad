// Lists every unconfirmed claim in src/content so nothing ships unverified by accident.
// Warns by default; `--strict` exits 1 (use in the launch pipeline once real details are in).
import { readdir, readFile } from 'node:fs/promises'

const dir = 'src/content'
const found = []
for (const file of await readdir(dir)) {
  const lines = (await readFile(`${dir}/${file}`, 'utf8')).split('\n')
  lines.forEach((line, index) => {
    const isComment = /^\s*(\*|\/\/)/.test(line)
    if (!isComment && /confirmed:\s*false/.test(line)) found.push(`${dir}/${file}:${index + 1}  ${line.trim().slice(0, 110)}`)
    if (/portrait:\s*null/.test(line)) found.push(`${dir}/${file}:${index + 1}  founder portrait missing`)
  })
}
found.push('src/components/BoltMark.tsx  bolt mark redrawn from the brand board; replace with the official vector')

console.log(`\nUnconfirmed before launch (${found.length}):`)
for (const item of found) console.log(`  - ${item}`)
if (process.argv.includes('--strict') && found.length) process.exit(1)
