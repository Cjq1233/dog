/*
 * 初始化应用：绑定事件、渲染默认内容
 */
function initApp(){
  // 绑定随机趣闻按钮
  var factBtn=document.getElementById('factBtn');
  if(factBtn){
    factBtn.addEventListener('click',pickRandomFact);
  }

  // 绑定体型筛选
  var sizeSelect=document.getElementById('sizeSelect');
  if(sizeSelect){
    sizeSelect.addEventListener('change',function(){
      filterDogsBySize(sizeSelect.value);
    });
  }

  // 渲染默认推荐列表
  filterDogsBySize('all');

  // 平滑滚动到锚点
  enableSmoothNav();

  // 初始化主题与年份
  syncThemeFromStorage();
  updateYear();
}

/*
 * 随机展示一条狗狗趣闻
 */
function pickRandomFact(){
  var facts=[
    '狗能听到人类听不到的高频声音',
    '嗅觉可达人类的数万倍，适合搜救与缉毒',
    '摇尾巴并不总是表示友好，要结合肢体语言',
    '鼻纹和指纹一样具有唯一性',
    '成年犬平均睡眠 12–14 小时/天'
  ];
  var idx=Math.floor(Math.random()*facts.length);
  var el=document.getElementById('factText');
  if(el){el.textContent=facts[idx];}
}

/*
 * 根据体型筛选推荐的品种
 * @param {string} size - 体型：all|small|medium|large
 */
function filterDogsBySize(size){
  var data=[
    {name:'比熊', size:'small', desc:'性格亲人、掉毛相对少，适合公寓'},
    {name:'柯基', size:'small', desc:'短腿小达人，活泼，需要控制体重'},
    {name:'柴犬', size:'medium', desc:'独立且干净，需耐心训练'},
    {name:'边牧', size:'medium', desc:'智力高，需要脑力与体力双重消耗'},
    {name:'拉布拉多', size:'large', desc:'温顺友好，适合家庭陪伴'},
    {name:'德牧', size:'large', desc:'服从性高，适合工作与守护'}
  ];
  var list=document.getElementById('recommendList');
  if(!list) return;
  var filtered=data.filter(function(d){return size==='all'||d.size===size;});
  list.innerHTML=filtered.map(function(d){
    return '<div class="rec-item"><strong>'+d.name+'</strong><div>'+d.desc+'</div></div>';
  }).join('');
}

/*
 * 启用导航平滑滚动
 */
function enableSmoothNav(){
  var links=document.querySelectorAll('a[href^="#"]');
  links.forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href');
      if(id && id.length>1){
        var el=document.querySelector(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });
}

/*
 * 更新页脚年份
 */
function updateYear(){
  var y=document.getElementById('year');
  if(y){y.textContent=String(new Date().getFullYear());}
}

/*
 * 主题切换并持久化到 localStorage
 */
function toggleTheme(){
  var isLight=document.documentElement.classList.toggle('light');
  try{localStorage.setItem('dog-theme', isLight?'light':'dark');}catch(e){}
}

/*
 * 从 localStorage 同步主题
 */
function syncThemeFromStorage(){
  try{
    var v=localStorage.getItem('dog-theme');
    if(v==='light'){document.documentElement.classList.add('light');}
  }catch(e){}
}

// 绑定主题按钮、启动应用
(function(){
  var btn=document.getElementById('themeToggle');
  if(btn){btn.addEventListener('click',toggleTheme);} 
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initApp);
  }else{initApp();}
})();
