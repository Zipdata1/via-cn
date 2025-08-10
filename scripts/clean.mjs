import { rmSync } from 'fs';
const targets=['dist','.vite','.cache','tmp'];
for(const t of targets){try{rmSync(t,{recursive:true,force:true});}catch{}}
console.log('[clean] removed:', targets.join(', '));
