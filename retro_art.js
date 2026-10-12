/*
 * LUMO / estética de portátil 2008, v2.
 * Dibujos y siluetas originales. Investigación visual inspirada en el modo de
 * representar escenas de los juegos Java ME: geometría, sprites, fotogramas
 * y capas de paralaje. No contiene imágenes, código ni sonidos de Bounce Tales.
 */
class RetroArt {
  constructor(ctx, width, height) {
    this.c=ctx; this.W=width; this.H=height; this.PI=Math.PI;
    this.palettes=[
      {skyTop:'#4fa3e5',skyBot:'#67c7f2',far:'#2c8d9a',mist:'#54aac4',soil:'#063b1b',soilShade:'#08271b',grass:'#40ed22',grass2:'#0a8c27',trunk:'#2d8730',foliage:'#41bf22'},
      {skyTop:'#4d63ac',skyBot:'#9b80ba',far:'#3c4c91',mist:'#695ba3',soil:'#2a2452',soilShade:'#151734',grass:'#a6ed48',grass2:'#58752b',trunk:'#3c456c',foliage:'#93a53f'},
      {skyTop:'#8052bd',skyBot:'#d183b2',far:'#653a91',mist:'#9367a9',soil:'#2e214e',soilShade:'#18132c',grass:'#ecd047',grass2:'#a97434',trunk:'#583667',foliage:'#ac5b9b'}
    ];
    this.bgCaches=new Map();
  }
  fill(color){this.c.fillStyle=color;}
  rect(x,y,w,h,color){this.fill(color);this.c.fillRect(x,y,w,h)}
  ellipse(x,y,rx,ry,color,rot=0){this.c.beginPath();this.c.ellipse(x,y,rx,ry,rot,0,Math.PI*2);this.fill(color);this.c.fill()}
  circle(x,y,r,color){this.c.beginPath();this.c.arc(x,y,r,0,Math.PI*2);this.fill(color);this.c.fill()}
  line(points,color,width=2){const c=this.c;c.beginPath();c.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)c.lineTo(points[i][0],points[i][1]);c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke()}
  path(fn,color,stroke=null,sw=1){const c=this.c;c.beginPath();fn(c);if(color){c.fillStyle=color;c.fill()}if(stroke){c.lineWidth=sw;c.strokeStyle=stroke;c.lineJoin='round';c.lineCap='round';c.stroke()}}
  blob(x,y,w,h,color,outline='#0d4d1b',phase=0){
    this.path(c=>{c.moveTo(x,y+h*.73);c.bezierCurveTo(x-w*.12,y+h*.29,x+w*.02,y+h*.14,x+w*.20,y+h*.34);c.bezierCurveTo(x+w*.22,y-h*.18,x+w*.56,y-h*.08,x+w*.59,y+h*.27);c.bezierCurveTo(x+w*.75,y+h*.05,x+w*.96,y+h*.23,x+w,y+h*.70);c.quadraticCurveTo(x+w*.7,y+h*.97,x,y+h*.73)},color,outline,2);
    this.path(c=>{c.moveTo(x+2,y+h*.67);c.quadraticCurveTo(x+w*.49,y+h*.54,x+w-2,y+h*.66)},null,'#77fc32',1.5);
  }
  bush(x,y,s=1,act=0){const c=this.c,p=this.palettes[act];c.save();c.translate(x,y);c.scale(s,s);
    this.path(c=>{c.moveTo(-22,0);c.bezierCurveTo(-24,-8,-21,-13,-15,-13);c.bezierCurveTo(-18,-26,1,-31,8,-17);c.bezierCurveTo(16,-23,25,-13,22,-4);c.lineTo(23,1);c.closePath()},p.foliage,'#155820',2.1);
    this.line([[-15,-9],[-11,-15],[-7,-12]],'#8cfc3c',2);this.line([[2,-21],[9,-16]],'#a8fa53',2);c.restore()}
  cloud(x,y,s=1,act=0){const c=this.c;c.save();c.translate(x,y);c.scale(s,s);
    this.ellipse(0,0,28,9,'#d3f5ffbb');this.ellipse(-12,-5,13,10,'#e9fbffe6');this.ellipse(6,-8,18,13,'#eafaffea');this.ellipse(19,-2,13,9,'#eafaffd0');c.restore()}
  flower(x,y,s=1,t=0,act=0){const c=this.c;c.save();c.translate(x,y);c.scale(s,s);const sway=Math.sin(t*1.27+x*.017)*1.5;
    this.path(c=>{c.moveTo(0,0);c.bezierCurveTo(-2,-17,-5,-23,1+sway,-38);c.bezierCurveTo(10+sway,-52,6+sway,-58,3+sway,-67)},null,'#094d19',7);
    this.path(c=>{c.moveTo(0,0);c.bezierCurveTo(-2,-17,-5,-23,1+sway,-38);c.bezierCurveTo(10+sway,-52,6+sway,-58,3+sway,-67)},null,'#41d91c',4.1);
    this.path(c=>{c.moveTo(-4,-27);c.bezierCurveTo(-30,-38,-31,-21,-17,-20);c.quadraticCurveTo(-10,-21,-4,-27)},'#36bc22','#0a6421',1.8);
    this.path(c=>{c.moveTo(4,-43);c.bezierCurveTo(26,-55,29,-43,17,-39);c.quadraticCurveTo(9,-37,4,-43)},'#4bdb23','#0b6323',1.7);
    c.translate(4+sway,-68);c.rotate(Math.sin(t*.65+x)*.05);
    for(let i=0;i<5;i++){const a=i*Math.PI*2/5-Math.PI/2;c.save();c.rotate(a+Math.PI/2);
      this.path(c=>{c.moveTo(-3,-2);c.bezierCurveTo(-17,-10,-18,-30,0,-33);c.bezierCurveTo(18,-30,17,-10,3,-2);c.closePath()},'#f5fcff','#accbd5',.8);
      this.line([[0,-5],[0,-23]],'#e0f2f8',.7);c.restore();}
    this.ellipse(0,0,4.5,6,'#f4b62a');this.ellipse(-1,-1,1.5,3,'#fff5ab');c.restore()}
  toadstool(x,y,s=1){const c=this.c;c.save();c.translate(x,y);c.scale(s,s);
    this.path(c=>{c.moveTo(-4,0);c.quadraticCurveTo(-2,-10,-3,-12);c.lineTo(5,-12);c.quadraticCurveTo(4,-7,5,0);c.closePath()},'#e5dda9','#235226',1.2);
    this.path(c=>{c.moveTo(-10,-10);c.bezierCurveTo(-10,-20,-4,-26,2,-26);c.bezierCurveTo(11,-26,15,-19,14,-10);c.closePath()},'#ff9745','#3d3823',1.6);
    this.circle(-2,-18,2,'#fff4c1');this.circle(7,-16,2.2,'#fff4c1');c.restore()}
  terrainY(seg,x){ // La misma curva sirve para render y colisiones (evita suelo invisible).
    const d=Math.max(0,Math.min(seg.w,x-seg.x));const pad=Math.min(14,seg.w*.09);
    const ease=Math.min(1,d/pad,(seg.w-d)/pad);const interior=Math.max(0,ease);
    return seg.y+(Math.sin(x*.0145)+Math.sin(x*.006+1.1)*.7)*3.4*interior;
  }
  landHeight(l,x){for(const g of l.ground)if(x>=g.x&&x<=g.x+g.w)return this.terrainY(g,x);return null}
  drawBackground(act,time=0,cam=0){const c=this.c,W=this.W,H=this.H,p=this.palettes[act];const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,p.skyTop);g.addColorStop(1,p.skyBot);this.rect(0,0,W,H,g);
    // Fondo panorámico con siluetas repetidas en baja frecuencia.
    c.save();c.globalAlpha=act===0?.37:.5;
    for(let k=-2;k<10;k++){
      const x=k*105-((cam*.13)%105)+27;const y=178+(k%3)*15;
      this.path(z=>{z.moveTo(x+6,H+15);z.lineTo(x+5,y-66);z.quadraticCurveTo(x+4,y-75,x+11,y-80);z.lineTo(x+12,y-77);z.lineTo(x+13,H+15)},p.far);
      this.path(z=>{z.moveTo(x+7,y-32);z.quadraticCurveTo(x-16,y-48,x-13,y-59)},null,p.far,5);
      this.path(z=>{z.moveTo(x+9,y-49);z.quadraticCurveTo(x+28,y-72,x+34,y-70)},null,p.far,4);
      if(k%3===0)this.bush(x+8,y-72,.8,act);
      else if(k%3===1)this.blob(x-9,y-23,40,9,p.mist,p.far);
    }c.restore();
    for(let k=-2;k<7;k++){const x=k*156-((cam*.05+time*.8)%156)+26;this.cloud(x,43+(k%3)*26,.42+(k%2)*.17,act)}
    if(act===1){for(let i=-1;i<8;i++){const x=i*100-((cam*.25)%100);this.rect(x+5,124,7,80,'#26335b77');this.rect(x,125,18,3,'#93a1af55');this.circle(x+7,147,5,'#a4bbba66')}}
    if(act===2){for(let i=-1;i<7;i++){const x=i*115-((cam*.18)%115);this.path(q=>{q.moveTo(x,211);q.lineTo(x+50,118);q.lineTo(x+100,211);q.closePath()},'#49316c77');}}
  }
  drawGround(l,cam,act){const c=this.c,p=this.palettes[act],W=this.W,H=this.H;
    for(const seg of l.ground){if(seg.x-cam>W+30||seg.x+seg.w-cam<-30)continue;
      const start=Math.max(seg.x,cam-22),end=Math.min(seg.x+seg.w,cam+W+22);if(start>end)continue;
      const n=Math.max(3,Math.ceil((end-start)/7));
      c.beginPath();c.moveTo(start-cam,this.terrainY(seg,start));
      for(let i=1;i<=n;i++){const xx=start+(end-start)*i/n;c.lineTo(xx-cam,this.terrainY(seg,xx))}
      c.lineTo(end-cam,H+35);c.lineTo(start-cam,H+35);c.closePath();this.fill(p.soil);c.fill();
      // Triángulos apagados en la profundidad, guiño a la geometría triangulada original.
      c.save();c.clip();for(let x=Math.floor(start/42)*42;x<end+50;x+=42){const y=this.terrainY(seg,x);
        this.path(q=>{q.moveTo(x-cam,y+14);q.lineTo(x+25-cam,y+37);q.lineTo(x-5-cam,y+65);q.closePath()},x%3===0?'#082e1a65':'#0b431e55');
        this.circle(x+14-cam,y+30,2.2,'#001b1838');
        if((x/42|0)%3===0){this.circle(x+4-cam,y+20,5,'#081f1644');this.circle(x+3-cam,y+19,2.7,'#143f2550')}
      }c.restore();
      c.beginPath();for(let i=0;i<=n;i++){const xx=start+(end-start)*i/n,yy=this.terrainY(seg,xx);if(i===0)c.moveTo(xx-cam,yy);else c.lineTo(xx-cam,yy)}
      c.strokeStyle='#062d15';c.lineWidth=8;c.lineJoin='round';c.stroke();c.strokeStyle=p.grass2;c.lineWidth=5;c.stroke();c.strokeStyle=p.grass;c.lineWidth=3.6;c.stroke();
      // Remates de hierba y pequeños tallos, pocos trazos sin efecto borroso.
      for(let x=Math.ceil(start/16)*16;x<end;x+=16){const y=this.terrainY(seg,x);if(((x/16)|0)%3===0)this.line([[x-cam,y-1],[x+2-cam,y-4]],p.grass,1.1);if(((x/16)|0)%7===0)this.circle(x+5-cam,y+4,2,p.grass2)}
    }
  }
  drawProps(l,cam,t){const c=this.c,act=l.act;
    // Plantas grandes deterministas, dibujadas sobre el suelo.
    for(const d of l.decor){const x=d.x-cam,y=d.y;if(x<-85||x>this.W+85)continue;
      switch(d.kind){case 0:this.bush(x,y,.76+(d.size||1)*.32,act);break;
        case 1:this.flower(x,y,.77+(d.size||1)*.46,t,act);break;
        case 2:this.toadstool(x,y,.55+(d.size||1)*.2);break;
        case 3:this.bush(x-3,y,.72,act);this.flower(x+8,y,.60,t,act);break;
        case 4:this.path(q=>{q.moveTo(x,y);q.quadraticCurveTo(x-8,y-15,x+4,y-29)},null,'#237d29',2);
          this.ellipse(x+3,y-30,3.3,3.3,'#a8fd69');break;
        default:this.bush(x,y,.43,act);break;
      }
    }
    for(let i=0;i<12;i++){const x=((i*121+48-cam*.23+t*.7)%(this.W+130)+(this.W+130))%(this.W+130)-52;const y=64+(i*57)%135;
      this.circle(x,y+Math.sin(t*1.7+i)*3,i%4===0?1.9:1.2,act===0?'#e7fff3bd':'#fff2b99c')}
  }
  drawPlatform(pl,cam,act){const x=pl.x-cam,y=pl.y,w=pl.w;if(x>this.W+30||x+w<-30)return;const p=this.palettes[act];
    this.path(c=>{c.moveTo(x-2,y+1);c.bezierCurveTo(x+5,y-4,x+16,y+1,x+29,y);c.lineTo(x+w-10,y-1);c.quadraticCurveTo(x+w+9,y,x+w+2,y+9);c.quadraticCurveTo(x+w*.58,y+20,x+w*.23,y+12);c.quadraticCurveTo(x-6,y+13,x-2,y+1)},p.soil,'#063016',2);
    this.path(c=>{c.moveTo(x,y);c.bezierCurveTo(x+10,y-3,x+24,y+1,x+w*.47,y);c.quadraticCurveTo(x+w*.85,y-3,x+w,y-1)},null,p.grass,4.2);
    this.circle(x+w*.38,y+8,2,'#082f1999');
  }
  drawEgg(x,y,t=0,s=1){const c=this.c;c.save();c.translate(x,y+Math.sin(t*2)*1.6);c.scale(s,s);
    this.ellipse(0,1,8,9,'#a45d22');this.ellipse(-1,-1,7.1,8.5,'#f4c56c');this.ellipse(-3,-3,4.5,5.1,'#ffe2a5');this.ellipse(-3,-5,2.8,3.2,'#ffffffcb');this.ellipse(3,5,2.8,1.6,'#e69a3d');c.restore()}
  drawGems(gems,cam,t){for(const g of gems){if(g.grab)continue;const x=g.x-cam;if(x<-18||x>this.W+18)continue;this.drawEgg(x,g.y,t+g.phase,.82)}}
  drawActor(p,cam,t){if(p.inv>0&&Math.floor(t*15)%4===0)return;const c=this.c,x=p.x-cam,y=p.y,r=p.r*1.16;
    c.save();c.translate(x,y);const squash=p.squash?1.1:1;c.scale(squash,1-(squash-1)*.7);
    this.ellipse(0,r+2,r*.82,2,'#071c1538');
    if(p.form===1){this.circle(0,0,r,'#eaf9ff');this.circle(0,0,r-1,'#70bfe6');this.path(q=>{q.moveTo(-r+2,-2);q.quadraticCurveTo(-1,-r*.6,r*.8,-6)},null,'#fdf7c8',3);this.path(q=>{q.moveTo(-r+4,5);q.quadraticCurveTo(1,9,r-3,4)},null,'#e3efff',2.6)}
    else if(p.form===2){this.path(q=>{for(let i=0;i<11;i++){const a=i*Math.PI*2/11;const rr=r*(i%3===0?1.02:.94);if(!i)q.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);else q.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}q.closePath()},'#8b8280','#2d312c',2);this.ellipse(-4,-5,4,3,'#c4ae9b');this.line([[-8,5],[-3,1],[0,5]],'#5a554c',1.2)}
    else {const g=c.createRadialGradient(-r*.38,-r*.5,1,0,0,r*1.3);g.addColorStop(0,'#ff9e7e');g.addColorStop(.23,'#fd4c31');g.addColorStop(.65,'#ef1d15');g.addColorStop(1,'#990c18');this.circle(0,0,r,g);c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.strokeStyle='#301e19';c.lineWidth=1.8;c.stroke();this.ellipse(-r*.25,-r*.51,r*.37,r*.20,'#fff4e9df',-.4)}
    // Expresividad mediante pupilas y cejas (no es una hoja de sprites del original).
    const eyex=p.facing*.8;
    for(const side of [-1,1]){const ex=side*r*.32+eyex;
      this.ellipse(ex,-.1,r*.26,r*.32,'#261b18');this.ellipse(ex,-.65,r*.215,r*.26,'#fffdf6');
      this.circle(ex+Math.max(-1.5,Math.min(1.5,p.facing*1.3)),.3,Math.max(1.1,r*.105),'#1d1b1a');
      this.line([[ex-r*.22,-r*.45],[ex+r*.18,-r*.51]],'#4d1614',1.15)}
    this.path(q=>{q.moveTo(-2,r*.46);q.quadraticCurveTo(1,r*.58,4,r*.42)},null,'#4d1818',1.15);
    c.restore()}
  drawEnemies(list,cam,t){for(const e of list){if(e.dead)continue;const x=e.x-cam,y=e.y;if(x<-30||x>this.W+30)continue;const c=this.c;c.save();c.translate(x,y+Math.sin(t*2+e.phase)*1.5);
    this.ellipse(0,10,12,2,'#10251b44');this.path(z=>{z.moveTo(-10,8);z.lineTo(-11,-2);z.quadraticCurveTo(-7,-13,0,-10);z.quadraticCurveTo(8,-14,12,-2);z.lineTo(10,9);z.closePath()},'#d49b2f','#262018',2.4);
    this.ellipse(-3,-2,3,3,'#f3f6f2');this.ellipse(4,-2,3,3,'#f3f6f2');this.circle(-2,-1,1.3,'#141810');this.circle(3,-1,1.3,'#141810');
    for(const dx of [-7,6])this.line([[dx,8],[dx-3,11]],'#32251b',2);c.restore()}}
  drawDoor(door,cam,t,act){const x=door.x-cam,y=door.y;if(x<-50||x>this.W+50)return;const c=this.c;
    this.ellipse(x+14,y+38,25,5,'#03271577');
    if(act===0){this.path(q=>{q.moveTo(x-7,y+38);q.bezierCurveTo(x-12,y-4,x+4,y-13,x+21,y-12);q.bezierCurveTo(x+47,y-4,x+45,y+25,x+41,y+38);q.closePath()},'#f69237','#3c2c21',3);
      for(let i=-1;i<=2;i++)this.path(q=>{q.moveTo(x+13+i*10,y-8);q.quadraticCurveTo(x+7+i*11,y+18,x+9+i*10,y+38)},null,'#bd5a1f',2);
      this.path(q=>{q.moveTo(x+5,y+38);q.quadraticCurveTo(x+5,y+7,x+19,y+7);q.quadraticCurveTo(x+33,y+8,x+32,y+38);q.closePath()},'#051f16','#1f1b14',2);
      this.ellipse(x+6,y-14,12,5,'#51ba28',-.55);this.ellipse(x+25,y-15,11,5,'#7dda27',.65)}
    else {this.path(q=>{q.moveTo(x-4,y+37);q.lineTo(x-4,y+7);q.quadraticCurveTo(x+14,y-18,x+32,y+8);q.lineTo(x+32,y+37);q.closePath()},'#967175','#3b263c',3);this.path(q=>{q.moveTo(x+4,y+38);q.lineTo(x+4,y+12);q.quadraticCurveTo(x+13,y, x+24,y+12);q.lineTo(x+24,y+38);q.closePath()},'#221b37','#130f24',2);this.circle(x+25,y+22,2,'#e7c567')}
    const glow=.15+.15*(1+Math.sin(t*2));this.circle(x+15,y+25,3.5,`rgba(255,248,151,${glow})`);
  }
  drawHazards(l,cam,t){for(const s of l.spikes){const x=s.x-cam;if(x>this.W+15||x+s.w<-15)continue;for(let j=0;j<s.w;j+=12){this.path(q=>{q.moveTo(x+j,s.y+9);q.lineTo(x+j+6,s.y-8);q.lineTo(x+j+12,s.y+9);q.closePath()},'#b5bfc2','#273a38',1.6)}}
    for(const sp of l.springs){const x=sp.x-cam;if(x<-30||x>this.W+30)continue;this.rect(x,sp.y+1,sp.w,6,'#293f34');this.path(q=>{q.moveTo(x-3,sp.y+1);q.lineTo(x+sp.w/2,sp.y-5);q.lineTo(x+sp.w+3,sp.y+1)},'#e89a24','#3e3326',1.8);this.line([[x+4,sp.y+7],[x+8,sp.y+1],[x+12,sp.y+7],[x+16,sp.y+1]],'#dfc86f',1.4)}
    for(const b of l.crates){if(b.broken)continue;const x=b.x-cam;if(x<-30||x>this.W+30)continue;this.rect(x,b.y,b.w,b.h,'#f2a042');this.path(q=>{q.rect(x,b.y,b.w,b.h)},null,'#44291b',2);this.line([[x+3,b.y+3],[x+b.w-3,b.y+b.h-3]],'#aa5e24',2);this.line([[x+b.w-3,b.y+3],[x+3,b.y+b.h-3]],'#aa5e24',1.5)}
    for(const ring of l.rings){const x=ring.x-cam,y=ring.y+Math.sin(t*2+ring.phase)*21;if(x<-55||x>this.W+55)continue;this.c.save();this.c.translate(x,y);this.c.rotate(t*.8);this.c.beginPath();this.c.arc(0,0,ring.r,0,Math.PI*2);this.c.strokeStyle='#392b57';this.c.lineWidth=8;this.c.stroke();this.c.strokeStyle='#ebc36b';this.c.lineWidth=3;this.c.stroke();for(let k=0;k<6;k++){const a=k*Math.PI/3;this.circle(Math.cos(a)*ring.r,Math.sin(a)*ring.r,3,'#f0df7c')}this.c.restore()}
  }
  drawCheckpoints(list,cam,t){for(const cp of list){const x=cp.x-cam;if(x<-25||x>this.W+25)continue;this.rect(x,cp.y,3,29,'#22492d');this.path(q=>{q.moveTo(x+3,cp.y);q.quadraticCurveTo(x+13,cp.y+4+Math.sin(t*4)*1.5,x+22,cp.y);q.lineTo(x+22,cp.y+15);q.quadraticCurveTo(x+13,cp.y+12,x+3,cp.y+16);q.closePath()},cp.active?'#ffe589':'#f4e7d0','#385428',1.4);if(cp.active)this.circle(x+12,cp.y+7,2,'#ef9234')}}
  clock(s){const m=Math.floor(s/60),sec=Math.floor(s%60);return m+':'+String(sec).padStart(2,'0')}
  label(value,x,y,size=15,align='left',color='#fff'){const c=this.c;c.font=`bold ${size}px Trebuchet MS,Arial,sans-serif`;c.textAlign=align;c.textBaseline='middle';c.lineJoin='round';c.lineWidth=2.5;c.strokeStyle='#2b31406e';c.strokeText(value,x,y);c.fillStyle=color;c.fillText(value,x,y)}
  drawHUD(l,p,game){
    this.drawEgg(18,16,0,.68);this.label(`${p.score}/${l.maxScore}`,31,15,15,'left','#fff');
    this.circle(this.W-20,16,12,'#f5f7f5');this.c.beginPath();this.c.arc(this.W-20,16,12,0,Math.PI*2);this.c.strokeStyle='#6a7882';this.c.lineWidth=2;this.c.stroke();
    this.line([[this.W-20,16],[this.W-20,9]],'#6a7882',1.6);this.line([[this.W-20,16],[this.W-15,18]],'#6a7882',1.6);
    const secs=(game.worldTime||0);this.label(this.clock(secs),this.W-37,15,14,'right','#fff');
    if(p.health<3){for(let i=0;i<p.health;i++)this.label('♥',13+i*19,39,15,'left','#ef3933')}
  }
  drawSign(x,y){this.path(q=>{q.moveTo(x+13,y+14);q.lineTo(x+13,y+34)},null,'#594631',3);this.path(q=>{q.rect(x,y,33,20)},'#c4843c','#5c391b',2);
    this.path(q=>{q.moveTo(x+8,y+8);q.lineTo(x+19,y+8);q.lineTo(x+19,y+5);q.lineTo(x+27,y+10);q.lineTo(x+19,y+16);q.lineTo(x+19,y+12);q.lineTo(x+8,y+12);q.closePath()},'#fce441','#ab7635',.7)}
  drawMenu(game,save){const c=this.c,W=this.W,H=this.H;this.drawBackground(0,game.time,game.time*3);
    this.path(q=>{q.moveTo(0,224);q.bezierCurveTo(85,228,100,211,173,230);q.bezierCurveTo(261,247,307,206,W,219);q.lineTo(W,H);q.lineTo(0,H);q.closePath()},'#113b18','#092b14',2);
    this.path(q=>{q.moveTo(0,223);q.bezierCurveTo(85,227,100,210,173,229);q.bezierCurveTo(261,246,307,205,W,218)},null,'#51f12c',5);
    this.flower(40,226,.8,game.time,0);this.flower(335,227,.63,game.time,0);
    c.save();c.textAlign='center';c.lineJoin='round';c.font='900 52px Trebuchet MS,Arial Rounded MT Bold,Arial,sans-serif';
    c.lineWidth=10;c.strokeStyle='#b41617';c.strokeText('LUMO',W/2,76);c.lineWidth=4;c.strokeStyle='#670d15';c.strokeText('LUMO',W/2,76);c.fillStyle='#fff9e8';c.fillText('LUMO',W/2,76);c.restore();
    this.label('UNA AVENTURA DE BOLSILLO',W/2,101,9,'center','#fbf8df');
    const opts=['CONTINUAR','NIVELES','CÓMO JUGAR','AJUSTES'];
    for(let i=0;i<4;i++){const y=113+i*27,selected=game.selection===i;
      this.path(q=>{q.moveTo(100,y);q.lineTo(291,y);q.quadraticCurveTo(299,y,299,y+8);q.lineTo(299,y+23);q.lineTo(94,y+23);q.lineTo(94,y+8);q.quadraticCurveTo(94,y,100,y)},selected?'#fff9dc':'#e8f1dfe0',selected?'#9f231e':'#438345',selected?2.8:1.4);
      this.label((selected?'▶ ':'')+opts[i],W/2,y+11,13,'center',selected?'#b7291d':'#3b553c')
    }
    this.drawActor({x:W/2+117,y:52,r:12,form:0,facing:1,inv:0,squash:0},0,game.time);
  }
  panel(x,y,w,h){this.path(q=>{q.moveTo(x+8,y);q.lineTo(x+w-8,y);q.quadraticCurveTo(x+w,y,x+w,y+8);q.lineTo(x+w,y+h-8);q.quadraticCurveTo(x+w,y+h,x+w-8,y+h);q.lineTo(x+8,y+h);q.quadraticCurveTo(x,y+h,x,y+h-8);q.lineTo(x,y+8);q.quadraticCurveTo(x,y,x+8,y)},'#fbf7e1','#315544',2.5);this.rect(x+4,y+5,w-8,3,'#b1d9b68a')}
}
