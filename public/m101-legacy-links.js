// Old sample links to introductions now lead to their proper hierarchy pages.
const destinations={'#module-introduction':'/learn/physics/stage-1/m101/#module-introduction','#unit-introduction':'/learn/physics/stage-1/m101/b01/u01/#unit-introduction'};
function redirectIntroduction(){if(destinations[location.hash])location.replace(destinations[location.hash]);}
window.addEventListener('hashchange',redirectIntroduction);
redirectIntroduction();
