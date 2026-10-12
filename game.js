/* Bounce Tales web study: clean JavaScript code; personal resources loaded ONLY by the user.
   Reconstruction, not an emulator or a binary-accurate port of the Java MIDlet. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const canvas=$('game'),ctx=canvas.getContext('2d',{alpha:false});
const W=240,H=320,TAU=Math.PI*2;
ctx.imageSmoothingEnabled=false;
let pack=null,atlases={},scene=null,playable=[];
let mode='IMPORT',levelIndex=0,selectIndex=0,elapsed=0,lastTime=0,lastFrame=0,camX=0,camY=0,particles=[];
const keys={left:false,right:false,jump:false};
let player={x:0,y:0,vx:0,vy:0,r:15,ground:false,angle:0,face:1,life:3,jumpLatch:false};
let eggCount=0,totalEggs=0,progress=0,notice='',noticeEnds=0;
const sounds=(()=>{let ac=null;return (name)=>{try{ac??=new (window.AudioContext||window.webkitAudioContext)();ac.resume().catch(()=>{});const t=ac.currentTime+.005;const notes={click:[[660,.045]],jump:[[480,.065],[620,.075]],egg:[[790,.07],[990,.12]],hit:[[140,.2]],win:[[640,.15],[810,.15],[1040,.24]],bounce:[[300,.08],[490,.12]]}[name]||[];notes.forEach(([freq,dur],i)=>{let o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=freq;let st=t+i*.065;g.gain.setValueAtTime(.00001,st);g.gain.exponentialRampToValueAtTime(.07,st+.006);g.gain.exponentialRampToValueAtTime(.00001,st+dur);o.connect(g);g.connect(ac.destination);o.start(st);o.stop(st+dur+.02)})}catch{}}})();
function notify(s,seconds=1.7){notice=s;noticeEnds=performance.now()+seconds*1000}
function text(t,x,y,sz=12,color='#fff',align='center',border=true){ctx.font=`bold ${sz}px Verdana,Arial,sans-serif`;ctx.textAlign=align;ctx.textBaseline='middle';if(border){ctx.lineJoin='round';ctx.lineWidth=Math.max(2,sz/5);ctx.strokeStyle='#1e344d';ctx.strokeText(t,x,y)}ctx.fillStyle=color;ctx.fillText(t,x,y)}
function rrect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(x|0,y|0,w|0,h|0)}
function showImport(show,msg){$('overlay').classList.toggle('hidden',!show);if(msg)$('message').textContent=msg}
function setStatus(t){$('status').textContent=t}
function database(){return new Promise((res,rej)=>{if(!('indexedDB'in window))return rej(Error('IndexedDB no disponible'));let q=indexedDB.open('bounce-web-local-only',1);q.onupgradeneeded=()=>q.result.createObjectStore('private');q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
async function saveLocalPack(p){try{const db=await database();await new Promise((res,rej)=>{const tx=db.transaction('private','readwrite');tx.objectStore('private').put(p,'personal');tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error)});db.close()}catch(e){console.warn('No se pudo persistir el paquete',e);notify('Se cargó, pero quizás debas importarlo otra vez',3)}}
async function readLocalPack(){try{const db=await database();let ret=await new Promise((res,rej)=>{let tr=db.transaction('private','readonly');let rq=tr.objectStore('private').get('personal');rq.onsuccess=()=>res(rq.result||null);rq.onerror=()=>rej(rq.error)});db.close();return ret}catch{return null}}
function checkPack(p){if(!p||p.format!=='BounceTalesPersonalAssetPack'||p.formatVersion!==1||!p.maps||!p.sprites||!Array.isArray(p.levels)||!p.atlas)throw Error('No es un paquete personal válido. Elige el archivo .btpack entregado.');if(p.levels.length<15)throw Error('Paquete incompleto: menos de 15 niveles.');return p}
async function loadPack(p,save){showImport(true,'Cargando las imágenes del JAR...');checkPack(p);const files=Object.entries(p.atlas);const imgs={};await Promise.all(files.map(([name,base64])=>new Promise((ok,reject)=>{const i=new Image();i.onload=()=>{imgs[name]=i;ok()};i.onerror=()=>reject(Error('Imagen corrupta: '+name));i.src='data:image/png;base64,'+base64})));pack=p;atlases=imgs;playable=p.levels.filter(l=>l.spawn);mode='MENU';try{progress=Math.min(Number(localStorage.getItem('bouncepersonal-progress')||0),playable.length-1)||0}catch{progress=0}showImport(false);setStatus(`${playable.length} NIVELES · ${files.length} ATLAS · USO LOCAL`);if(save)await saveLocalPack(p);sounds('click')}
$('importPack').addEventListener('change',async(e)=>{let f=e.target.files?.[0];if(!f)return;try{let p=JSON.parse(await f.text());await loadPack(p,true)}catch(ex){console.error(ex);showImport(true,'Error: '+ex.message)}finally{e.target.value=''}});
$('changePack').addEventListener('click',()=>{$('overlay').classList.remove('hidden');showImport(true,'Elige un .btpack personal. No se sube a Internet.')});
$('resetSave').addEventListener('click',()=>{try{localStorage.removeItem('bouncepersonal-progress')}catch{}progress=0;notify('Progreso restablecido');sounds('click')});
$('info').addEventListener('click',()=>{alert('LABORATORIO BOUNCE TALES. Motor nuevo en JavaScript con escenas y sprites del JAR que importas localmente. Teclas 4/6 o flechas para moverte, 2/↑ para saltar, 5/Enter para aceptar, 0/Escape para regresar. La música original no existe en el JAR aportado. No subas tu .btpack a GitHub.')});
function screen(x,y){return [(x-camX)*.66+78,(camY-y)*.66+187]}
function imgSprite(spriteID,x,y,scale=.66,time=0,depth=0){
 if(depth>9)return;const a=pack.maps[String(spriteID)]||pack.sprites[String(spriteID)];if(!a)return;
 if(a.t==='img'||a.t==='ext'){const image=atlases[a.file];if(!image)return;const [sx,sy]=screen(x,y);const w=a.w*scale,h=a.h*scale;try{ctx.drawImage(image,a.sx,a.sy,a.w,a.h,Math.round(sx-a.ox*scale),Math.round(sy-(a.h-a.oy)*scale),Math.ceil(w),Math.ceil(h))}catch(e){}return}
 if(a.t==='compound')for(const [dx,dy,id]of a.parts)imgSprite(id,x+dx,y+dy,scale,time,depth+1);
 else if(a.t==='anim'&&a.frames?.length)imgSprite(a.frames[Math.floor(time*7)%a.frames.length],x,y,scale,time,depth+1)
}
function drawAtlasFull(name,x,y,w,h){const img=atlases[name];if(img)ctx.drawImage(img,x,y,w||img.width,h||img.height)}
function menu(){
 rrect(0,0,W,H,'#f7fbfc');rrect(0,240,W,80,'#4dc027');
 for(let i=0;i<12;i++){let y=262+(i%3)*8;ctx.fillStyle='#116a2d';ctx.beginPath();ctx.ellipse(i*25,y,16,8,0,0,TAU);ctx.fill()}
 drawAtlasFull('j.png',17,24,206,148);
 text('RECONSTRUCCIÓN PERSONAL',120,181,10,'#225263', 'center',false);
 let a=['JUGAR','SELECCIONAR NIVEL','INFORMACIÓN'];a.forEach((v,i)=>{rrect(22,208+i*30,196,26,i===selectIndex?'#087d98':'#296568');text((i===selectIndex?'▶ ':'')+v,120,221+i*30,12,'#fff')});
}
function selectLevel(){rrect(0,0,W,H,'#007fe0');text('ESCOGER NIVEL',120,29,17,'#fff');let start=Math.max(0,Math.min(playable.length-7,selectIndex-3));for(let i=0;i<7;i++){let id=start+i,locked=id>progress;if(!playable[id])continue;rrect(19,49+i*34,202,30,id===selectIndex?'#f5cf59':'#f1f9ff');text(`${id===selectIndex?'▶ ':' '} ${String(id+1).padStart(2,'0')} · ${locked?'BLOQUEADO':'EXPLORAR'}`,28,64+i*34,11,locked?'#9ba6af':'#114875','left',false)}text('4/6 CAMBIAR · ACEPTAR',120,303,10,'#fff')}
function computeEdges(level){
 const edges=[];
 for(const shape of level.objects.filter(o=>o.t==='geo'&&!(o.flags&32))){let f=shape.f,v=shape.v;let counts=new Map();for(let j=0;j+2<f.length;j+=3){const i=[f[j],f[j+1],f[j+2]];for(let k=0;k<3;k++){let a=i[k],b=i[(k+1)%3];if(!v[a]||!v[b])continue;let key=Math.min(a,b)+'/'+Math.max(a,b);let cur=counts.get(key);if(cur)cur.n++;else counts.set(key,{a,b,n:1})}}
  for(const edge of counts.values()){if(edge.n!==1)continue;const [ax,ay]=v[edge.a],[bx,by]=v[edge.b];const dx=bx-ax,dy=by-ay;if(dx*dx+dy*dy<.001)continue;edges.push([ax,ay,bx,by,Math.min(ax,bx)-20,Math.max(ax,bx)+20,Math.min(ay,by)-20,Math.max(ay,by)+20])}
 }
 return edges;
}
function beginLevel(id){levelIndex=Math.min(playable.length-1,Math.max(0,id));scene=JSON.parse(JSON.stringify(playable[levelIndex]));scene.edges=computeEdges(scene);let p=scene.spawn;player={x:p[0],y:p[1],vx:0,vy:0,r:15,ground:false,angle:0,face:1,life:3,jumpLatch:false};camX=player.x;camY=player.y;elapsed=0;eggCount=0;totalEggs=scene.objects.filter(o=>o.t==='egg').length;particles=[];mode='PLAY';notify('NIVEL '+(levelIndex+1)+' · EXPLORACIÓN',1.6);sounds('click');}
function startMenu(){mode='MENU';selectIndex=0;sounds('click')}
function back(){if(mode==='PLAY')mode='PAUSE';else if(mode==='PAUSE')startMenu();else if(mode==='SELECT')startMenu();else if(mode==='FINISH')startMenu();else if(mode==='MENU'){showImport(true,'Tu paquete sigue guardado localmente. Si quieres, puedes sustituirlo.')}}
function ok(){sounds('click');if(!pack){showImport(true,'Importa tu .btpack primero.');return}if(mode==='MENU'){if(selectIndex===0)beginLevel(progress);else if(selectIndex===1){selectIndex=Math.min(progress,playable.length-1);mode='SELECT'}else alert('Reconstrucción experimental JavaScript. Usa imágenes y escenas auténticas extraídas localmente del JAR aportado. Música original ausente en ese JAR. Eventos complejos pendientes.')}else if(mode==='SELECT'){if(selectIndex<=progress)beginLevel(selectIndex);else notify('Completa niveles anteriores')}else if(mode==='PAUSE')mode='PLAY';else if(mode==='FINISH'){let id=(levelIndex+1)%playable.length;beginLevel(id)}}
function pause(){if(mode==='PLAY')mode='PAUSE';else if(mode==='PAUSE')mode='PLAY';else back()}
function input(name,isDown){if(!pack)return;if(name==='left'||name==='right'||name==='jump'){keys[name]=isDown;if(isDown&&mode!=='PLAY'){if(name==='left')navigate(-1);else if(name==='right')navigate(1);else ok()}else if(name==='jump'&&!isDown)player.jumpLatch=false;}else if(isDown){if(name==='ok')ok();else if(name==='back')back();else if(name==='pause')pause()}}
function navigate(n){if(mode==='MENU')selectIndex=(selectIndex+n+3)%3;else if(mode==='SELECT')selectIndex=(selectIndex+n+playable.length)%playable.length;sounds('click')}
const holds=new Set();document.querySelectorAll('[data-hold]').forEach(b=>{const name=b.dataset.hold;b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);b.classList.add('pressed');input(name,true)});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,e=>{e.preventDefault();b.classList.remove('pressed');input(name,false)})});document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>input(b.dataset.action,true)));
const mapKey={ArrowLeft:'left',KeyA:'left',Digit4:'left',ArrowRight:'right',KeyD:'right',Digit6:'right',ArrowUp:'jump',Space:'jump',Digit2:'jump',KeyW:'jump',Enter:'ok',Digit5:'ok',Escape:'back',Digit0:'back',KeyP:'pause'};const down=new Set();window.addEventListener('keydown',e=>{const action=mapKey[e.code];if(!action)return;e.preventDefault();if(down.has(e.code))return;down.add(e.code);input(action,true)});window.addEventListener('keyup',e=>{const action=mapKey[e.code];if(action){down.delete(e.code);input(action,false)}});
function collect(x,y){for(let i=0;i<5;i++){particles.push({x,y,vx:(Math.random()-.5)*80,vy:30+Math.random()*100,life:.55+Math.random()*.5})}}
function collision(){if(!scene)return;for(let iter=0;iter<3;iter++){
 for(const s of scene.edges){if(player.x<s[4]||player.x>s[5]||player.y<s[6]||player.y>s[7])continue;let [ax,ay,bx,by]=s,dx=bx-ax,dy=by-ay;let t=Math.max(0,Math.min(1,((player.x-ax)*dx+(player.y-ay)*dy)/(dx*dx+dy*dy)));let px=ax+t*dx,py=ay+t*dy;let nx=player.x-px,ny=player.y-py,d2=nx*nx+ny*ny;let rr=player.r*player.r;if(d2<rr&&d2>1e-7){let d=Math.sqrt(d2);nx/=d;ny/=d;let delta=player.r-d+.05;player.x+=nx*delta;player.y+=ny*delta;let speed=player.vx*nx+player.vy*ny;if(speed<0){player.vx-=nx*speed*1.08;player.vy-=ny*speed*1.08}if(ny>.38){player.ground=true;if(player.vy<0)player.vy=0}}}}
}
function update(dt){if(mode!=='PLAY'||!scene)return;elapsed+=dt;const p=player,gravity=-1150,accel=650,drag=p.ground?720:320;let axis=(keys.right?1:0)-(keys.left?1:0);if(axis){p.vx=Math.max(-245,Math.min(245,p.vx+axis*accel*dt));p.face=axis}else{p.vx=Math.abs(p.vx)<drag*dt?0:p.vx-Math.sign(p.vx)*drag*dt}
 if(keys.jump&&p.ground&&!p.jumpLatch){p.vy=435;p.ground=false;p.jumpLatch=true;sounds('jump')}
 p.vy=Math.max(-720,p.vy+gravity*dt);p.x+=p.vx*dt;p.y+=p.vy*dt;p.ground=false;collision();p.angle+=p.vx*dt/(p.r*1.1);
 for(const o of scene.objects){if(o.t==='egg'&&!o.taken&&Math.hypot(p.x-o.x,p.y-o.y)<p.r+16){o.taken=true;eggCount++;collect(o.x,o.y);sounds('egg')}
  if(o.t==='trampoline'&&Math.abs(p.x-o.x)<32&&Math.abs(p.y-o.y)<25&&p.vy<0){p.vy=590;collect(o.x,o.y);sounds('bounce')}
  if(o.t==='enemy'&&Math.hypot(p.x-o.x,p.y-o.y)<27&&p.life>0){p.life--;p.vx=-p.face*140;p.vy=230;sounds('hit');if(p.life===0){notify('REINTENTANDO...');p.x=scene.spawn[0];p.y=scene.spawn[1];p.vx=p.vy=0;p.life=3}}
 }
 for(const d of particles){d.x+=d.vx*dt;d.y+=d.vy*dt;d.vy-=390*dt;d.life-=dt}particles=particles.filter(p=>p.life>0);
 let targetX=p.x+Math.sign(p.vx)*25,targetY=p.y;camX+=(targetX-camX)*Math.min(1,dt*5);camY+=(targetY-camY)*Math.min(1,dt*4);
 if(p.y<scene.bbox[1]-250||Math.abs(p.x)>30000){p.x=scene.spawn[0];p.y=scene.spawn[1];p.vx=p.vy=0;camX=p.x;camY=p.y;notify('INTÉNTALO DE NUEVO');sounds('hit')}
 // Provisional end trigger, not claiming to reproduce original event scripts.
 const rightEdge=scene.bbox[2];if(p.x>rightEdge-110){mode='FINISH';if(levelIndex<playable.length-1){progress=Math.max(progress,levelIndex+1);try{localStorage.setItem('bouncepersonal-progress',String(progress))}catch{}}sounds('win')}
}
function drawSky(){const palette=levelIndex<4?['#038ee8','#39aff0']:levelIndex<8?['#75d4ed','#b4ebf0']:levelIndex<12?['#7593ae','#cdd2bd']:['#349acc','#e6c6c3'];let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,palette[0]);g.addColorStop(1,palette[1]);rrect(0,0,W,H,g);
 // Simple decorative parallax, not an exact replacement of original background scripts.
 ctx.save();ctx.globalAlpha=.22;if(levelIndex<4&&atlases['ae.png']){for(let i=0;i<3;i++){const x=((i*162-camX*.06)%500+500)%500-100;ctx.drawImage(atlases['ae.png'],x,58+i*34,145,99)}}else if(levelIndex>=12&&atlases['l.png']){ctx.drawImage(atlases['l.png'],-26,84,260,39)}ctx.restore();
}
function drawGeo(){for(const ob of scene.objects){if(ob.t!=='geo')continue;const v=ob.v,f=ob.f;
  ctx.fillStyle=ob.c;ctx.beginPath();for(let i=0;i+2<f.length;i+=3){if(!v[f[i]]||!v[f[i+1]]||!v[f[i+2]])continue;const a=screen(...v[f[i]]),b=screen(...v[f[i+1]]),c=screen(...v[f[i+2]]);if((a[0]<-50&&b[0]<-50&&c[0]<-50)||(a[0]>W+50&&b[0]>W+50&&c[0]>W+50))continue;ctx.moveTo(Math.round(a[0]),Math.round(a[1]));ctx.lineTo(Math.round(b[0]),Math.round(b[1]));ctx.lineTo(Math.round(c[0]),Math.round(c[1]));ctx.closePath()}ctx.fill()}}
function drawProps(){for(const ob of scene.objects){if(ob.t==='sprite'){for(const [id,dx,dy]of ob.parts){if(Math.abs(ob.x+dx-camX)>550)continue;imgSprite(id,ob.x+dx,ob.y+dy,.66,elapsed)}}else if(ob.t==='egg'&&!ob.taken){if(Math.abs(ob.x-camX)<500)imgSprite(92,ob.x,ob.y,.66,elapsed)}else if(ob.t==='trampoline'){if(Math.abs(ob.x-camX)<500)imgSprite(levelIndex<4?53:levelIndex<9?162:80,ob.x,ob.y,.66,elapsed)}else if(ob.t==='enemy'){if(Math.abs(ob.x-camX)<400)imgSprite(97,ob.x,ob.y,.53,elapsed)}else if(ob.t==='cannon'){imgSprite(46,ob.x,ob.y,.66,elapsed)}}}
function drawBall(){const p=player,[x,y]=screen(p.x,p.y),m=pack.maps['30'];if(m){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(p.angle);const image=atlases[m.file];if(image)ctx.drawImage(image,m.sx,m.sy,m.w,m.h,Math.round(-m.ox*.66),Math.round(-(m.h-m.oy)*.66),Math.ceil(m.w*.66),Math.ceil(m.h*.66));ctx.restore()}else{ctx.fillStyle='#f22';ctx.beginPath();ctx.arc(x,y,10,0,TAU);ctx.fill()}}
function drawHUD(){rrect(0,0,W,24,'#045baa');ctx.fillStyle='#ffe8b9';ctx.font='bold 12px monospace';ctx.textAlign='left';ctx.fillText(''+String(eggCount).padStart(2,'0')+'/'+String(totalEggs).padStart(2,'0'),25,16);if(atlases['x.png'])ctx.drawImage(atlases['x.png'],25,0,23,23,3,2,18,18);ctx.textAlign='right';ctx.fillText(String(Math.floor(elapsed/60)).padStart(2,'0')+':'+String(Math.floor(elapsed%60)).padStart(2,'0'),W-7,16);text(`NIVEL ${String(levelIndex+1).padStart(2,'0')}`,120,31,9,'#fff')}
function drawWorld(){drawSky();drawGeo();drawProps();drawBall();for(const p of particles){const [x,y]=screen(p.x,p.y);ctx.fillStyle='#fff6a0';ctx.fillRect(x,y,2,2)}drawHUD();if(performance.now()<noticeEnds){rrect(16,278,208,24,'#183f5fcc');text(notice,120,290,10,'#fff')} }
function overlay(title,lines){rrect(0,0,W,H,'#0008');rrect(21,98,198,123,'#f4e5aa');rrect(25,102,190,115,'#dd8845');text(title,120,125,19,'#fff');lines.forEach((t,i)=>text(t,120,159+i*25,11,'#fff'))}
function render(){ctx.imageSmoothingEnabled=false;if(!pack){rrect(0,0,W,H,'#093b6b');return}if(mode==='MENU')menu();else if(mode==='SELECT')selectLevel();else if(['PLAY','PAUSE','FINISH'].includes(mode)){drawWorld();if(mode==='PAUSE')overlay('EN PAUSA',['ACEPTAR: CONTINUAR','VOLVER: MENÚ']);if(mode==='FINISH')overlay('FIN DEL RECORRIDO',[`HUEVOS ${eggCount}/${totalEggs}`,'ACEPTAR: SIGUIENTE'])}}
function loop(time){if(!lastFrame)lastFrame=time;let dt=Math.min(.06,(time-lastFrame)/1000);lastFrame=time;if(mode==='PLAY'){dt=Math.min(.04,dt);let steps=Math.max(1,Math.ceil(dt/(1/80)));for(let i=0;i<steps;i++)update(dt/steps)}render();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
readLocalPack().then(p=>{if(p)loadPack(p,false).catch(e=>showImport(true,'Paquete guardado inválido. Importa de nuevo: '+e.message))});
})();
