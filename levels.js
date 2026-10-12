/* 15 diseños/progresiones originales. No son mapas ni diálogos de Bounce Tales. */
const CHAPTERS=[
 {name:'EL JARDÍN QUE ESCUCHA',short:'JARDÍN',sky:['#8bd9e3','#d6eed2'],far:'#78c5be',hill:'#57a69b',ground:'#5c9c69',soil:'#7d5a58',leaf:'#357e73'},
 {name:'BAJO LA TIERRA',short:'MECANISMOS',sky:['#475b83','#95789a'],far:'#595773',hill:'#423e63',ground:'#b38a62',soil:'#5f4753',leaf:'#a7b890'},
 {name:'EL CARNAVAL DORMIDO',short:'CARNAVAL',sky:['#7a669b','#f1ad99'],far:'#8f779e',hill:'#695c8f',ground:'#a17781',soil:'#55425d',leaf:'#d3a2a4'}
];
const LEVEL_DESIGNS=[
 ['Una mañana diminuta','El mundo despierta con un secreto: escucha antes de correr.','grove',0],
 ['Flores que hablan','Hay plantas que no quieren ser vistas, sino escuchadas.','grove',0],
 ['El puente de polen','Algunos caminos aparecen cuando aprendes a saltar.','grove',0],
 ['La rueda inquieta','Una gran rueda ha despertado entre los árboles.','danger',0],
 ['Fiesta en la copa','Las semillas flotan más alto durante las fiestas.','bonus',0],
 ['Bajo las raíces','Un zumbido antiguo llega desde el subsuelo.','mine',1],
 ['La galería azul','Las máquinas olvidadas aún reconocen a los viajeros.','mine',1],
 ['Corazones de cobre','Los engranajes guardan una canción muy pequeña.','mine',1],
 ['El reloj sin horas','El gran mecanismo cuenta algo que nadie recuerda.','danger',1],
 ['Luces bajo piedra','Hasta la oscuridad tiene motivos para celebrar.','bonus',1],
 ['La primera carpa','La música viene de un lugar que ya no aparece en los mapas.','carnival',2],
 ['Sombras de confeti','No todos los recuerdos están quietos.','carnival',2],
 ['El desfile perdido','Las luces parecen señalar una última función.','carnival',2],
 ['El corazón del circo','El viejo proyector necesita encontrar su luz.','danger',2],
 ['La última canción','Cada pequeño viaje deja una melodía que permanece.','bonus',2]
];
function rngSeed(seed){let n=seed|0;return ()=>{n=(Math.imul(n,1664525)+1013904223)|0;return (n>>>0)/4294967296}}
function createLevel(id){const info=LEVEL_DESIGNS[id], rand=rngSeed((id+1)*92817),act=info[3],kind=info[2];const width=1560+id*48;const floor=217;
  const gaps=[];if(id>0){gaps.push(620+((id%3)*65));if(id>4)gaps.push(1150+((id%2)*76));if(id>9)gaps.push(1480+((id%2)*53))}
  const ground=[];let start=0;for(const gap of gaps){if(gap>width-280)continue;ground.push({x:start,y:floor,w:gap-start,h:100});start=gap+(id>7?58:45)}ground.push({x:start,y:floor,w:width-start,h:100});
  const platforms=[],gems=[],enemies=[],spikes=[],springs=[],decor=[],checkpoints=[],crates=[],rings=[],hazards=[];
  // Ground traversal stays feasible without mastering transformations.
  const blocks=5+Math.floor(id/3);for(let j=0;j<blocks;j++){const x=240+j*((width-445)/(blocks));if(x>width-175)continue;
    const y=(j%3===0?160:j%3===1?175:146)-(kind==='bonus'?12:0);
    platforms.push({x,y,w:74+((j+id)%3)*15,h:9,phase:rand()*6.28,moving:(id>5&&j%4===2),originX:x});
    gems.push({x:x+26,y:y-19,grab:false,phase:rand()*7});if(j%2===0)gems.push({x:x+63,y:y-31,grab:false,phase:rand()*7});
    if(j%3===1) springs.push({x:x+110,y:floor-8,w:21,h:8});
    if(j%3===2 && kind!=='bonus') crates.push({x:x+100,y:floor-19,w:21,h:19,broken:false});
  }
  for(let x=178;x<width-120;x+=100+rand()*60){const y=floor+(rand()-.5)*2;decor.push({x,y,kind:Math.floor(rand()*6),phase:rand()*7,size:.7+rand()*.9});}
  for(let x=210;x<width-150;x+=235){gems.push({x,y:floor-24,grab:false,phase:rand()*7})}
  if(kind!=='bonus')for(let x=390;x<width-220;x+=365){if(gaps.some(g=>Math.abs(g-x)<110))continue;enemies.push({x:x,y:floor-12,r:10,originX:x,phase:rand()*7,dead:false})}
  if(id>0 && kind!=='bonus')for(let x=530;x<width-180;x+=430){if(gaps.some(g=>Math.abs(g-x)<110))continue;spikes.push({x,y:floor-10,w:37,h:11})}
  if(id>2)checkpoints.push({x:Math.floor(width*.5),y:floor-28,active:false});
  if(id>6)checkpoints.push({x:Math.floor(width*.78),y:floor-28,active:false});
  if(kind==='bonus')for(let x=145;x<width-80;x+=85){gems.push({x,y:floor-45-(x%3)*7,grab:false,phase:rand()*7})}
  if(kind==='danger'){rings.push({x:width-370,y:floor-57,r:23,phase:rand()*7});rings.push({x:width-730,y:floor-59,r:20,phase:1.4});}
  const maxScore=gems.length;return {id,title:info[0],quote:info[1],act,kind,width,floor,ground,platforms,gems,enemies,spikes,springs,decor,checkpoints,crates,rings,maxScore,door:{x:width-83,y:floor-37,w:27,h:38},spawn:{x:48,y:floor-35},startTime:0};
}
