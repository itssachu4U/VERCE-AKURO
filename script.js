const CONFIG = {
  vid: "23c47d299b7690d3_1791484010",
  fallback: "https://t.me/+whEw6n0dq6llYmNl",
  pixelId: "2373740533365703"
};

const params = new URLSearchParams(location.search);
const fbclid = params.get("fbclid") || "";
const campaign = params.get("utm_campaign") || "";
const ad = params.get("utm_content") || "";
let inviteLink = null;

function serverEvent(type, eid) {
  const body = new URLSearchParams({type, vid:CONFIG.vid, eid, fbclid, campaign, ad});
  if (navigator.sendBeacon) navigator.sendBeacon("/api/event", body);
  else fetch("/api/event", {method:"POST", body, keepalive:true}).catch(()=>{});
}

try {
  fbq("track","ViewContent",{content_name:"landing"},{eventID:CONFIG.vid+"_vc"});
} catch (_) {}
serverEvent("ViewContent", CONFIG.vid+"_vc");

const btn = document.getElementById("joinBtn");
const statusText = document.getElementById("statusText");

async function getLink() {
  try {
    const r = await fetch("/api/get-link?vid="+encodeURIComponent(CONFIG.vid), {cache:"no-store"});
    const d = await r.json();
    if (d.link) inviteLink = d.link;
  } catch (_) {}
  if (!inviteLink) inviteLink = CONFIG.fallback;
  btn.href = inviteLink;
}

getLink();

btn.addEventListener("click", function(e) {
  const r = btn.getBoundingClientRect();
  const size = Math.max(r.width,r.height);
  const rip = document.createElement("span");
  rip.className = "ripple";
  rip.style.width = rip.style.height = size+"px";
  rip.style.left = (e.clientX-r.left-size/2)+"px";
  rip.style.top = (e.clientY-r.top-size/2)+"px";
  btn.appendChild(rip);
  setTimeout(()=>rip.remove(),650);

  e.preventDefault();
  btn.classList.add("busy");
  if(statusText) statusText.textContent = "Opening…";

  const eid = CONFIG.vid+"_click";
  const go = () => { location.href = inviteLink || CONFIG.fallback; };

  try { fbq("track","InitiateCheckout",{}, {eventID:eid}); } catch (_) {}
  serverEvent("Click", eid);

  if (inviteLink) setTimeout(go,180);
  else getLink().then(()=>setTimeout(go,180));
});

const sheet = document.getElementById("sheet");
const backdrop = document.getElementById("sheetBackdrop");
const closeBtn = document.getElementById("sheetClose");
const tabs = document.querySelectorAll(".sheet-tab");
const panels = document.querySelectorAll(".sheet-panel");
const openTriggers = document.querySelectorAll("[data-open]");

function replayAnim(panel) {
  panel.querySelectorAll("p,li").forEach(el=>{
    el.style.animation="none"; void el.offsetWidth; el.style.animation="";
  });
}
function setTab(name) {
  tabs.forEach(t=>t.classList.toggle("active",t.dataset.tab===name));
  panels.forEach(p=>{
    const active=p.dataset.panel===name;
    p.classList.toggle("active",active);
    if(active) replayAnim(p);
  });
}
function openSheet(name) {
  setTab(name); backdrop.classList.add("open"); sheet.classList.add("open");
  document.body.classList.add("sheet-lock");
}
function closeSheet() {
  backdrop.classList.remove("open"); sheet.classList.remove("open");
  document.body.classList.remove("sheet-lock");
}
openTriggers.forEach(b=>b.addEventListener("click",()=>openSheet(b.dataset.open)));
tabs.forEach(t=>t.addEventListener("click",()=>setTab(t.dataset.tab)));
closeBtn.addEventListener("click",closeSheet);
backdrop.addEventListener("click",closeSheet);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet()});

const card=document.getElementById("card");
if(window.matchMedia("(hover:hover) and (pointer:fine)").matches){
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width-.5;
    const py=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`rotateY(${px*4}deg) rotateX(${py*-4}deg)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
}
