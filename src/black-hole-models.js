// Schwarzschild model. SI internally; dimensionless radius x = r / rs.
export const G=6.67430e-11, C=299792458, SOLAR_MASS=1.98847e30;
const positive=v=>{if(!Number.isFinite(v)||v<=0)throw new RangeError('Expected a positive finite value');return v;};
export const horizonRadius=m=>2*G*positive(m)*SOLAR_MASS/C**2;
export const clockRate=x=>{positive(x);return x>1?Math.sqrt(1-1/x):null;};
export const tidalDifference=(m,x,length=2)=>2*G*positive(m)*SOLAR_MASS*positive(length)/(positive(x)*horizonRadius(m))**3;
// Ingoing Painleve–Gullstrand coordinates: T = c tPG / rs.
export function lightSlope(x,direction=1){positive(x);if(![1,-1].includes(direction))throw new RangeError('Direction must be +1 or -1');return direction-1/Math.sqrt(x);}
export function lightPath(x,direction,{step=.005,duration=5}={}){
 positive(x);positive(step);positive(duration);lightSlope(x,direction);
 const points=[[x,0]];let t=0;
 while(t<duration&&x>.035&&x<6){
  const dt=Math.min(step,duration-t,.02*x/Math.max(1,Math.abs(lightSlope(x,direction))));
  const f=v=>lightSlope(v,direction), a=f(x),b=f(x+dt*a/2),c=f(x+dt*b/2),d=f(x+dt*c);
  x+=dt*(a+2*b+2*c+d)/6;t+=dt;points.push([x,t]);
 }
 return points;
}
