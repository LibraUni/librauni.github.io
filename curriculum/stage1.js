// Final architecture. No route choice, enrolment or attainment is implied.
export const bridge={code:'LU-M100',title:'Mathematics & Python bridge',credits:30,outsideDegree:true,path:'/programme/bridge/lu-m100/',purpose:'Optional preparation when needed: mathematical fluency, relevant physics applications, a thorough scientific Python refresher and progressively controlled AI/agent-assisted programming.'};
export const stage1Modules=[
 {code:'LU-M101',title:'Mathematics for physics I',credits:30,semester:1,path:'/programme/stage-1/lu-m101/',purpose:'Develop calculus, vectors and introductory matrix methods; coordinate their introduction with P101 applications.'},
 {code:'LU-P101',title:'Physics, space & scientific thinking',credits:30,semester:1,path:'/programme/stage-1/lu-p101/',purpose:'Build physical intuition and quantitative reasoning through motion, energy, matter, waves, measurement and introductory scientific investigations.'},
 {code:'LU-M102',title:'Mathematics for physics II',credits:30,semester:2,path:'/programme/stage-1/lu-m102/',purpose:'Extend calculus and linear algebra; develop complex numbers, differential equations and mathematical methods for later physics.'},
 {code:'LU-A101',title:'Exploring astronomy through computation',credits:30,semester:2,path:'/programme/stage-1/lu-a101/',purpose:'Use astronomical observations and computation to investigate questions, test models and explain the limits of evidence, building on Semester 1.'},
];
export const semesters=[
 {number:1,title:'Mathematical foundations of physics and physical reasoning',codes:['LU-M101','LU-P101']},
 {number:2,title:'Further mathematical methods and astronomical investigation',codes:['LU-M102','LU-A101']},
];
