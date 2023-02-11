import { qnaList } from "./data.js";
import { infoList } from "./data.js";

const header = document.getElementById('header'); //header
const footer = document.getElementById('footer'); //footer
const qna = document.getElementById('qna'); //qna
const u_name = document.querySelector('input[type=text]'); //입력된 이름
const wrap = document.getElementById('wrap'); 
const tabletMQL = window.matchMedia("all and (min-width: 768px)");
const pcMQL = window.matchMedia("all and (min-width: 960px)");
const ENDPOINT = 10;
const select = [];

let qIdx = -1;

const calcScore = () =>{
  let point = 0;
  for(let i = 0; i < ENDPOINT; i++){
    point+=qnaList[i].a[select[i]].score;
  }
  console.log(point);
  return point;
}


const sortResult = (point) => {
  let num = 0;
  if (point <= 40) {
    num = 0;
  } else if (point <= 60) {
    num = 1;
  } else if (point <= 80) {
    num = 2;
  } else if (point <= 100) {
    num = 3;
  }
  console.log(num);
  return num;
}

function  display_image(src, width, height, alt) {
  const point = calcScore();
  const grade = sortResult(point);
  console.log(point);
  console.log(grade);
  const img = document.querySelector('.result_img');
  var a  = document.createElement("img");
    a.src = src;
    a.width = width;
    a.height = height;
    a.alt = alt;
    img.appendChild(a);
    img.onclick = function(event){
      var link='';
      if(grade == 0){
      link = "https://terms.naver.com/entry.naver?docId=1715548&cid=40942&categoryId=32622";
      }
      else if(grade == 1){
        link = "https://terms.naver.com/entry.naver?docId=1715546&cid=40942&categoryId=32622";
        }
      else if(grade == 2){
        link = "https://terms.naver.com/entry.naver?docId=1978855&cid=42885&categoryId=42885";
       }
      else if(grade == 3){
        link = "https://terms.naver.com/entry.naver?docId=1087985&cid=40942&categoryId=32622"; 
      }
      location.href = link;
      location.replace(link);
      window.open(link);
    }

}

const goResult = () => {
  if (pcMQL.matches) {
    console.log('PC');
    wrap.style.marginTop = '150px';
  } else if (tabletMQL.matches) {
    console.log('tablet');
    wrap.style.marginTop = '115px';
  }

  const result = document.getElementById('result_section');
  const point = calcScore();
  const grade = sortResult(point);
  const pTitle = document.querySelector('h1');
  const res_point = document.querySelector('.point');
  const sub_title = document.querySelector('.sub_tit');
  const sub = document.querySelector('.sub');

  pTitle.innerHTML = u_name.value + ' 님의 점수는?<br>';
  res_point.innerHTML =point+'점'

      if(grade == 0){
        display_image('/images/s_images/lionhead.png',200,200,'라이언헤드');
      }
      else if(grade == 1){
        display_image('/images/s_images/JerseyWooly.png',200,200,'저지울리');  }
      else if(grade == 2){
        display_image('/images/s_images/holland.png',200,200,'홀랜드 롭이어');  }
      else if(grade == 3){
        display_image('/images/s_images/Rex.png',200,200,'랙스');  }

  sub_title.innerHTML = infoList[grade].name;
  sub.innerHTML = infoList[grade].desc;

  setTimeout(() => {
    header.style.display = 'block';
    footer.style.display = 'block';
    result_section.style.display = 'block';
    header.style.animation =
      'fade-in 0.3s forwards';
    footer.style.animation =
      'fade-in 0.3s forwards';
    result_section.style.animation =
      'fade-in 0.5s forwards';
  }, 600);

}

const end = () => {
  qna.style.animation = '';
  const interval = setInterval(() => {
    qna.style.opacity -= 0.1;
    qna.style.transform = 'translateY(-1px)';
  }, 50);
  setTimeout(() => clearTimeout(interval), 300);
  const wrap = document.getElementById('wrap');
  wrap.style.height = '90vh';//0.5초 후에 interval 함수 호출
  setTimeout(() => qna.style.display = 'none', 500);
  
  setTimeout(() => {
    const calc = document.getElementById('calc');
    const wrap = document.getElementById('wrap');
    wrap.style.height = '170vh';
    calc.style.display = 'block';
    calc.style.animation =
      'fade-in 0.5s forwards';
  }, 1000);

  setTimeout(() => {
    calc.style.animation =
      'fade-out 0.4s forwards';
    setTimeout(() => {
      calc.style.display = 'none';
    }, 400);
    goResult();
  }, 9000);
}

const addAnswer = (answerTxt, idx) => { //선택지 버튼을 생성해주는 함수
  const answer = document.createElement('button');
  const a = document.querySelector('.answer');
  answer.className += 'a box'; //클래스 추가
  answer.innerHTML = answerTxt;//그 안에 html추가 

  answer.addEventListener('click', () => {
    const parent = answer.parentNode;
    const children = parent.childNodes;

    for (let i in children -1) {
      children[i].disabled = true;
    }
    parent.classList.add('fade-out-5-4');
    setTimeout(() => {
      select[qIdx] = idx;
      a.innerHTML = '';
      parent.classList.remove('fade-out-5-4');
      goNext();
    }, 800);
  });

  setTimeout(() => answer.style.animation =
    'going-down 0.2s forwards fade-in 0.2s forwards', 40);
  a.appendChild(answer);
}

const goNext = () => {
  if (qIdx++ === qnaList.length - 1) {
    end();
    return;
  }

const status = document.querySelector('.status');
  const qNum = qnaList[qIdx];
  const q = document.querySelector('.q');


  status.style.width = ((qIdx+1) * ENDPOINT) + '%';

  q.innerHTML = qNum.q;
  qna.style.animation = 
    'fade-in 0.4s ease-in-out 0s forwards, '+
    'going-down 0.4s ease-in-out 0.8s forwards';

  setTimeout(() => {
    const endIdx = qNum.a.length - 1;
    for (let i in qNum.a) {
      console.log(i);
      addAnswer(qNum.a[i].answer, i);
    }
    qna.style.opacity = 1;
  }, 700);
}

const begin=()=>{
  const welcome = document.getElementById('welcome');
  header.style.animation =
   'going-up 0.4s forwards, '+
   'fade-out 0.4s forwards';
   footer.style.animation = 
    'going-down 0.4s forwards, '+
    'fade-out 0.4s forwards';
    setTimeout(()=> welcome.style.animation = 
      'going-up 0.4s ease-in-out forwards,' + 
      'fade-out 0.4s ease-in-out forwards',500)
  setTimeout(() => {
    header.style.display = 'none';
    footer.style.display = 'none';
    welcome.style.display = 'none';
    qna.style.display = 'block';
    goNext();
  }, 2000);
}

const load= () => { //이름 버튼을 누르면 작동하는 함수
const msg = document.querySelector('.check-name');
const start_btn = document.querySelector('.start');
 
u_name.addEventListener('blur', () => { //입력창에서 커서가 벗어나면 실행하는 함수
  try {
    if (u_name.value.length < 1) {
      throw '이름을 입력하고 시작해 주세요.';
    }
    msg.innerHTML = '';
  } catch (err) {
    msg.innerHTML = err;
  }
});

start_btn.addEventListener('click',() => {
  try {
    if(u_name.value.length <1){
      throw '이름을 입력하고 시작해 주세요.';
    }
    msg.innerHTML='';
    start_btn.disabled = true;
    begin();
  } catch (error) {
    msg.innerHTML =err;
  }
});
}
window.onload = load();