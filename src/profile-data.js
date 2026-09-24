export const fields={name:120,pronouns:80,location:160,languages:300,about:3000,academic:6000,work:6000,experience:6000,interests:3000,goals:3000,study:3000};
export const emptyProfile=()=>({schemaVersion:1,...Object.fromEntries(Object.keys(fields).map(k=>[k,''])),photo:'',personalisation:true});
export function validateProfile(p){
 if(!p||p.schemaVersion!==1||Object.keys(p).some(k=>!['schemaVersion','photo','personalisation',...Object.keys(fields)].includes(k)))throw Error('Unrecognised profile format.');
 for(const [key,limit] of Object.entries(fields))if(typeof p[key]!=='string'||p[key].length>limit)throw Error(`Please shorten ${key} to ${limit} characters.`);
 if(typeof p.personalisation!=='boolean')throw Error('Choose a personalisation preference.');
 if(typeof p.photo!=='string'||p.photo.length>160000||(p.photo&&!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(p.photo)))throw Error('Please choose a supported profile photo.');
 if(JSON.stringify(p).length>250000)throw Error('Profile is too large.');
 return p;
}
export function tutorBrief(p){validateProfile(p);return `LibraUni — learner-provided profile\nPersonalisation: ${p.personalisation?'Use selectively when relevant; do not assume mastery or publish personal details.':'Do not use this profile for personalised examples or coaching.'}\n\n`+Object.keys(fields).filter(k=>p[k]).map(k=>`${({name:'Preferred name',pronouns:'Pronouns',location:'Location / time zone',languages:'Languages',about:'About me',academic:'Academic background',work:'Work experience',experience:'Other experience',interests:'Interests',goals:'Goals',study:'Study preferences'})[k]}\n${p[k]}`).join('\n\n');}
