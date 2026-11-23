const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const me = {id:"me",name:"Marina Costa",handle:"@marinacosta",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",bio:"Entre cafés, viagens e boas ideias. Registrando um pouco do que vejo por aí. ☀️",following:128,followers:842};
const people = [
 {id:"p1",name:"Lucas Mendes",handle:"@lucasmendes",avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",bio:"Design, música e café."},
 {id:"p2",name:"Ana Ribeiro",handle:"@anaribeiro",avatar:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=faces",bio:"Fotografia e viagens."},
 {id:"p3",name:"Pedro Alves",handle:"@pedroalves",avatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",bio:"Tecnologia sem complicação."},
 {id:"p4",name:"Julia Martins",handle:"@juliamartins",avatar:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces",bio:"Colecionando lugares bonitos."},
 {id:"p5",name:"Rafael Costa",handle:"@rafaelcosta",avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces",bio:"Criando coisas na internet."}
];
const seedPosts = [
 {id:1,user:people[1],text:"Tem lugares que fazem a gente desacelerar sem nem perceber. Um fim de tarde desses vale por uma semana inteira. 🌿",image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&auto=format&fit=crop",likes:128,comments:[{user:people[0],text:"Que lugar lindo! Preciso conhecer."},{user:people[3],text:"A luz dessa foto está perfeita ✨"}],time:"há 18 min",category:"Viagem"},
 {id:2,user:people[0],text:"Pequenos detalhes fazem toda a diferença. Hoje foi dia de explorar referências, testar ideias e lembrar que criar também é saber observar.",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop",likes:86,comments:[{user:people[2],text:"Muito bom! Curti a composição."}],time:"há 1 h",category:"Design"},
 {id:3,user:people[2],text:"Uma coisa que aprendi trabalhando com tecnologia: nem sempre a solução mais complexa é a melhor. Simplicidade também é engenharia.",image:null,likes:54,comments:[],time:"há 3 h",category:"Tecnologia"},
 {id:4,user:people[3],text:"Domingo de câmera na mão e nenhuma pressa para voltar. 📷",image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&auto=format&fit=crop",likes:203,comments:[{user:people[1],text:"Essa vista!!"}],time:"ontem",category:"Fotografia"}
];
let posts = load("vibes_posts", seedPosts);
let following = load("vibes_following", ["p2"]);
let saved = load("vibes_saved", []);
let liked = load("vibes_liked", []);
let notifications = load("vibes_notifications", [
 {user:people[0],text:"curtiu uma publicação que você compartilhou.",time:"há 12 min"},
 {user:people[3],text:"começou a seguir você.",time:"há 1 h"},
 {user:people[1],text:"comentou: \"Que registro bonito!\"",time:"ontem"}
]);
let stories = [
 {user:people[1],image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",caption:"Um respiro no meio da semana."},
 {user:people[0],image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",caption:"Dia de colocar as ideias no papel."},
 {user:people[2],image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",caption:"Um pouco dos bastidores."},
 {user:people[3],image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",caption:"A cidade vista de outro ângulo."},
 {user:people[4],image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",caption:"Construindo algo novo."}
];
let activeCommentPost = null, activeStory = 0, selectedImage = null, currentCategory = "Todos";
function load(key,fallback){try{const v=JSON.parse(localStorage.getItem(key));return v??fallback}catch{return fallback}}
function save(){localStorage.setItem("vibes_posts",JSON.stringify(posts));localStorage.setItem("vibes_following",JSON.stringify(following));localStorage.setItem("vibes_saved",JSON.stringify(saved));localStorage.setItem("vibes_liked",JSON.stringify(liked));localStorage.setItem("vibes_notifications",JSON.stringify(notifications))}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2300)}
function postCard(post){const isLiked=liked.includes(post.id),isSaved=saved.includes(post.id);return `<article class="post-card" data-post="${post.id}"><div class="post-header"><img src="${post.user.avatar}" alt=""><div class="post-author"><strong>${esc(post.user.name)}</strong><small>${esc(post.user.handle)} · ${post.time}</small></div><button class="post-menu" data-action="menu" aria-label="Opções">···</button></div>${post.text?`<div class="post-text">${esc(post.text)}</div>`:""}${post.image?`<img class="post-image" src="${post.image}" alt="Imagem da publicação" loading="lazy">`:""}<div class="post-actions"><button class="action-button ${isLiked?"liked":""}" data-action="like" aria-label="Curtir">${isLiked?"♥":"♡"} <span>${post.likes}</span></button><button class="action-button" data-action="comment" aria-label="Comentar">◯ <span>${post.comments.length} comentários</span></button><button class="action-button ${isSaved?"saved":""}" data-action="save" aria-label="Salvar" style="margin-left:auto">${isSaved?"▣":"♧"}</button><button class="action-button" data-action="share" aria-label="Compartilhar">↗</button></div><div class="post-caption"><strong>${esc(post.user.name.split(" ")[0])}</strong> e outras pessoas curtiram</div></article>`}
function renderFeed(){const q=($("#globalSearch")?.value||"").trim().toLowerCase();let list=[...posts];if(q)list=list.filter(p=>(p.text+" "+p.user.name+" "+p.category).toLowerCase().includes(q));$("#feedList").innerHTML=list.length?list.map(postCard).join(""):`<div class="empty-state"><strong>Nada por aqui ainda</strong>Tente buscar por outro termo.</div>`}
function renderStories(){$("#storiesRow").innerHTML=`<button class="story-item add-story" id="addStory"><span class="story-ring"><img src="${me.avatar}" alt=""></span><span>Seu story</span></button>`+stories.map((s,i)=>`<button class="story-item" data-story="${i}"><span class="story-ring"><img src="${s.user.avatar}" alt=""></span><span>${esc(s.user.name.split(" ")[0])}</span></button>`).join("")}
function renderSuggestions(){$("#suggestionsList").innerHTML=people.filter(p=>!following.includes(p.id)).slice(0,3).map(p=>`<div class="suggestion"><img src="${p.avatar}" alt=""><div class="suggestion-info"><strong>${esc(p.name)}</strong><small>${esc(p.handle)}</small></div><button class="follow-button" data-follow="${p.id}">Seguir</button></div>`).join("")}
function renderExplore(){const q=($("#exploreSearch")?.value||"").toLowerCase();const list=posts.filter(p=>(currentCategory==="Todos"||p.category===currentCategory)&&(`${p.text} ${p.user.name} ${p.category}`).toLowerCase().includes(q));$("#exploreGrid").innerHTML=list.map(p=>`<article class="explore-card" data-open-post="${p.id}">${p.image?`<img src="${p.image}" alt="" loading="lazy">`:`<div class="explore-text-card">${esc(p.text.slice(0,100))}</div>`}<div class="explore-card-body"><p>${esc(p.text.slice(0,95))}${p.text.length>95?"…":""}</p><div class="explore-card-meta"><span>${esc(p.user.name)}</span><span>♡ ${p.likes}</span></div></div></article>`).join("")||`<div class="empty-state">Nenhuma publicação encontrada.</div>`;$("#peopleGrid").innerHTML=people.map(p=>`<div class="person-card"><img src="${p.avatar}" alt=""><div><strong>${esc(p.name)}</strong><small>${esc(p.handle)}</small></div><button class="follow-button ${following.includes(p.id)?"following":""}" data-follow="${p.id}">${following.includes(p.id)?"Seguindo":"Seguir"}</button></div>`).join("")}
function renderSaved(){const list=posts.filter(p=>saved.includes(p.id));$("#savedList").innerHTML=list.length?list.map(postCard).join(""):`<div class="empty-state"><strong>Suas publicações salvas aparecem aqui</strong>Toque no ícone de marcador em uma publicação para guardar.</div>`}
function renderNotifications(){$("#notificationsList").innerHTML=notifications.length?notifications.map(n=>`<div class="notification-item"><img src="${n.user.avatar}" alt=""><p><strong>${esc(n.user.name)}</strong> ${esc(n.text)}<small>${n.time}</small></p></div>`).join(""):`<div class="empty-state">Você está em dia com tudo.</div>`}
function renderProfile(){const mine=$("#profileContent");mine.innerHTML=`<div class="profile-cover"></div><div class="profile-main"><div class="profile-top"><img src="${me.avatar}" alt=""><div class="profile-name"><h2>${me.name}</h2><p>${me.handle}</p></div><button class="dark-button" id="editProfile">Editar perfil</button></div><p class="profile-bio">${me.bio}</p><div class="profile-stats"><div><strong>${posts.filter(p=>p.user.id==="me").length}</strong><span>publicações</span></div><div><strong>${me.followers}</strong><span>seguidores</span></div><div><strong>${me.following+following.length}</strong><span>seguindo</span></div></div><div class="profile-tabs"><button class="active">Publicações</button><button>Sobre</button></div><div class="feed-list">${posts.filter(p=>p.user.id==="me").map(postCard).join("")||`<div class="empty-state"><strong>Seu espaço começa aqui</strong>Faça sua primeira publicação e compartilhe algo com a comunidade.</div>`}</div></div>`;$("#editProfile").addEventListener("click",()=>toast("Edição de perfil: próxima etapa do projeto."))}
function switchView(name){$$(".view").forEach(v=>v.classList.toggle("active",v.id===name+"View"));$$("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===name));const titles={home:"Seu feed",explore:"Explorar",saved:"Salvos",notifications:"Notificações",profile:"Meu perfil"};$("#pageTitle").textContent=titles[name]||"Vibes";if(name==="explore")renderExplore();if(name==="saved")renderSaved();if(name==="notifications")renderNotifications();if(name==="profile")renderProfile();window.scrollTo({top:0,behavior:"smooth"})}
function openModal(id){const el=$("#"+id);el.classList.add("open");el.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(id){const el=$("#"+id);el.classList.remove("open");el.setAttribute("aria-hidden","true");document.body.style.overflow=""}
function resetComposer(){$("#postText").value="";$("#charCount").textContent="0/500";$("#publishPost").disabled=true;selectedImage=null;$("#imageInput").value="";$("#imagePreviewWrap").hidden=true}
function openComposer(){resetComposer();openModal("composerModal");setTimeout(()=>$("#postText").focus(),100)}
function renderComments(post){$("#commentsTitle").textContent=`Comentários (${post.comments.length})` ;$("#commentsList").innerHTML=post.comments.length?post.comments.map(c=>`<div class="comment-item"><img src="${c.user.avatar}" alt=""><div><strong>${esc(c.user.name)}</strong><p>${esc(c.text)}</p></div></div>`).join(""):`<div class="empty-state">Ainda não há comentários. Que tal começar a conversa?</div>`}
function showStory(i){activeStory=i;const s=stories[i];$("#storyContent").innerHTML=`<img src="${s.image}" alt=""><div class="story-user"><img src="${s.user.avatar}" alt=""><strong>${esc(s.user.name)}</strong></div><div class="story-caption">${esc(s.caption)}</div>`;openModal("storyModal")}
function refresh(){renderFeed();renderStories();renderSuggestions();save()}
document.addEventListener("click",e=>{
 const view=e.target.closest("[data-view]");if(view){switchView(view.dataset.view);return}
 const close=e.target.closest("[data-close]");if(close){closeModal(close.dataset.close);return}
 const follow=e.target.closest("[data-follow]");if(follow){const id=follow.dataset.follow;if(following.includes(id))following=following.filter(x=>x!==id);else following.push(id);renderSuggestions();renderExplore();save();toast(following.includes(id)?"Agora você está seguindo essa pessoa.":"Você deixou de seguir.");return}
 const story=e.target.closest("[data-story]");if(story){showStory(Number(story.dataset.story));return}
 if(e.target.id==="addStory"){toast("A criação de stories estará disponível em breve.");return}
 const action=e.target.closest("[data-action]");if(action){const card=action.closest("[data-post]");const post=posts.find(p=>p.id===Number(card.dataset.post));if(!post)return;
  if(action.dataset.action==="like"){if(liked.includes(post.id)){liked=liked.filter(x=>x!==post.id);post.likes=Math.max(0,post.likes-1)}else{liked.push(post.id);post.likes++;}refresh();if(liked.includes(post.id))toast("Você curtiu esta publicação.");}
  if(action.dataset.action==="save"){saved.includes(post.id)?saved=saved.filter(x=>x!==post.id):saved.push(post.id);refresh();toast(saved.includes(post.id)?"Publicação salva.":"Publicação removida dos salvos.");}
  if(action.dataset.action==="comment"){activeCommentPost=post.id;renderComments(post);openModal("commentsModal");}
  if(action.dataset.action==="share"){navigator.clipboard?.writeText(location.href+"#post-"+post.id).then(()=>toast("Link copiado!")).catch(()=>toast("Compartilhamento disponível pelo link da publicação."));}
  if(action.dataset.action==="menu"){if(post.user.id==="me"&&confirm("Deseja excluir esta publicação?")){posts=posts.filter(p=>p.id!==post.id);refresh();toast("Publicação excluída.")}else if(post.user.id!=="me")toast("Publicação de "+post.user.name);}
  return;
 }
 const openPost=e.target.closest("[data-open-post]");if(openPost){const p=posts.find(x=>x.id===Number(openPost.dataset.openPost));if(p){switchView("home");setTimeout(()=>document.querySelector(`[data-post="${p.id}"]`)?.scrollIntoView({behavior:"smooth",block:"center"}),100)}}
 if(e.target.id==="openComposer"||e.target.id==="openComposerPrompt"||e.target.id==="openComposerPhoto"||e.target.id==="mobileCreate"){openComposer();return}
 if(e.target.id==="openMyProfile"||e.target.id==="mobileProfile"){switchView("profile");return}
 if(e.target.id==="exploreFromCard"){switchView("explore");return}
 if(e.target.id==="viewAllStories"){showStory(0);return}
 if(e.target.id==="nextStory"){activeStory=(activeStory+1)%stories.length;showStory(activeStory);return}
 if(e.target.id==="focusSearch"){const s=$("#globalSearch");s.style.display="flex";s.focus();return}
 if(e.target.id==="feedFilter"){toast("Exibindo as publicações mais recentes.");return}
});
$("#postText").addEventListener("input",e=>{$("#charCount").textContent=e.target.value.length+"/500";$("#publishPost").disabled=!e.target.value.trim()&&!selectedImage});
$("#imageInput").addEventListener("change",e=>{const file=e.target.files[0];if(!file)return;if(!file.type.startsWith("image/")){toast("Selecione um arquivo de imagem.");return}if(file.size>3*1024*1024){toast("A imagem deve ter até 3 MB.");e.target.value="";return}const reader=new FileReader();reader.onload=()=>{selectedImage=reader.result;$("#imagePreview").src=selectedImage;$("#imagePreviewWrap").hidden=false;$("#publishPost").disabled=false};reader.readAsDataURL(file)});
$("#removeImage").addEventListener("click",()=>{selectedImage=null;$("#imagePreviewWrap").hidden=true;$("#imageInput").value="";$("#publishPost").disabled=!$("#postText").value.trim()});
$("#publishPost").addEventListener("click",()=>{const text=$("#postText").value.trim();if(!text&&!selectedImage)return;posts.unshift({id:Date.now(),user:me,text,image:selectedImage,likes:0,comments:[],time:"agora",category:"Comunidade"});refresh();closeModal("composerModal");resetComposer();switchView("home");toast("Sua publicação foi compartilhada!")});
$("#commentForm").addEventListener("submit",e=>{e.preventDefault();const text=$("#commentInput").value.trim();if(!text||activeCommentPost===null)return;const post=posts.find(p=>p.id===activeCommentPost);post.comments.push({user:me,text});$("#commentInput").value="";renderComments(post);refresh();});
$("#globalSearch").addEventListener("input",()=>{if(!$("#homeView").classList.contains("active"))switchView("home");renderFeed()});
$("#exploreSearch").addEventListener("input",renderExplore);
$$(".chip").forEach(chip=>chip.addEventListener("click",()=>{$$(".chip").forEach(c=>c.classList.remove("active"));chip.classList.add("active");currentCategory=chip.dataset.category;renderExplore()}));
$$("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
$$(".modal-backdrop").forEach(back=>back.addEventListener("click",e=>{if(e.target===back)closeModal(back.id)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")$$(".modal-backdrop.open").forEach(m=>closeModal(m.id))});
renderStories();renderFeed();renderSuggestions();renderExplore();
