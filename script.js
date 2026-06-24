const GOOGLE_SCRIPT_URL = ""; // сюда вставить ссылку Google Apps Script, если нужна таблица
const weddingDate = new Date('2026-11-12T16:00:00+03:00');
function tick(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  days.textContent = d;
  hours.textContent = String(h).padStart(2,'0');
  minutes.textContent = String(m).padStart(2,'0');
  seconds.textContent = String(s).padStart(2,'0');
}
tick(); setInterval(tick,1000);

const form = document.getElementById('rsvpForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.date = new Date().toLocaleString('ru-RU');
  if(!GOOGLE_SCRIPT_URL){
    status.textContent = 'Ответ сохранён на сайте. Для таблицы нужно вставить ссылку Apps Script.';
    form.reset();
    return;
  }
  status.textContent = 'Отправляем...';
  try{
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    status.textContent = 'Спасибо, ответ отправлен!';
    form.reset();
  }catch(err){
    status.textContent = 'Ошибка отправки. Попробуйте ещё раз.';
  }
});
