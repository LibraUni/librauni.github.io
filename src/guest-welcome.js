const key='librauni:guest-welcome';
// Welcome once per tab/session so guests can still browse public lessons afterwards.
export function guestWelcomeTarget(user,owner,pathname,storage){
 if(!user||owner){try{storage.removeItem(key);}catch{}return null;}
 const onGuide=/^\/enjoy(?:\/|\/index\.html)?$/.test(pathname);
 try{
  const seen=storage.getItem(key)===user.uid;
  storage.setItem(key,user.uid);
  return !onGuide&&!seen?'/enjoy/':null;
 }catch{
  // Do not trap public readers in a redirect loop when storage is unavailable.
  return null;
 }
}
