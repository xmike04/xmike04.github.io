/** Validate the compact Markdown evidence ledger used by the public profile. */
export async function auditEvidence(markdown,{now=new Date(),maxAgeDays=90,requiredIds=[],probeLink}={}){
 const errors=[];const headings=[...markdown.matchAll(/^## ([a-z0-9-]+)\s*$/gm)];const seen=new Set();
 const requiredFields=['Wording','Verification','Source','Revision','Scope','Limits','Checked'];
 const statuses=new Set(['artifact-backed','historical','user-attested','pending']);
 const today=new Date(now.toISOString().slice(0,10)).getTime();
 for(const[index,heading]of headings.entries()){
  const id=heading[1];if(seen.has(id))errors.push(`${id}: duplicate claim ID`);seen.add(id);
  const block=markdown.slice(heading.index+heading[0].length,headings[index+1]?.index??markdown.length);
  const fields=Object.fromEntries([...block.matchAll(/^- ([A-Za-z]+): (.+)$/gm)].map(match=>[match[1],match[2].trim()]));
  for(const field of requiredFields)if(!fields[field])errors.push(`${id}: missing ${field}`);
  if(fields.Verification&&!statuses.has(fields.Verification))errors.push(`${id}: unknown Verification status`);
  const checked=fields.Checked;const date=checked&&/^\d{4}-\d{2}-\d{2}$/.test(checked)?new Date(checked):new Date(NaN);
  if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==checked)errors.push(`${id}: Checked must be a real ISO calendar date`);
  else if(date.getTime()>today||today-date.getTime()>maxAgeDays*86400000)errors.push(`${id}: Checked is future-dated or older than ${maxAgeDays} days`);
  const sourceLinks=[...(fields.Source??'').matchAll(/\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/g)].map(match=>match[1]);
  if(['artifact-backed','historical'].includes(fields.Verification)&&sourceLinks.length===0)errors.push(`${id}: artifact-backed/historical Source needs an inspectable URL`);
  for(const url of new Set(sourceLinks)){
   let parsed;try{parsed=new URL(url);}catch{errors.push(`${id}: malformed Source URL`);continue;}
   if(parsed.protocol!=='https:'||parsed.username||parsed.password){errors.push(`${id}: Source URL must be HTTPS without credentials`);continue;}
   if(probeLink){try{const result=await probeLink(url);if(!result.ok)errors.push(`${id}: inaccessible Source (${result.status}) ${url}`);}catch{errors.push(`${id}: Source reachability could not be verified ${url}`);}}
  }
 }
 if(headings.length===0)errors.push('No evidence claims found');
 for(const id of requiredIds)if(!seen.has(id))errors.push(`Missing evidence claim: ${id}`);
 return errors;
}
