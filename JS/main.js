import { qnaList } from "./data.js";

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


const goResult = () => {
  if (pcMQL.matches) {
    console.log('PC');
    wrap.style.marginTop = '150px';
  } else if (tabletMQL.matches) {
    console.log('tablet');
    wrap.style.marginTop = '115px';
  }

  const result = document.getElementById('result');
  const point = calcScore();
  const grade = sortResult(point);
  const pTitle = document.querySelector('h1');
  const res_point = document.querySelector('.point');

  pTitle.innerHTML = u_name.value + ' 님의 점수는...'+ point+'입니다.';
  
  setTimeout(() => {
    header.style.display = 'block';
    footer.style.display = 'block';
    result_section.style.display = 'block';
    header.style.animation =
      'fade-in 0.3s forwards';
    footer.style.animation =
      'fade-in 0.3s forwards';
    result_section.style.animation =
      'going-up 0.5s, ' +
      'fade-in 0.5s forwards';
  }, 600);

}

const end = () => {
  qna.style.animation = '';
  const interval = setInterval(() => {
    qna.style.opacity -= 0.1;
    qna.style.transform = 'translateY(-1px)';
  }, 50);
  setTimeout(() => clearTimeout(interval), 500);
  setTimeout(() => qna.style.display = 'none', 500);
  setTimeout(() => {
    const calc = document.getElementById('calc');
    calc.style.display = 'block';
    calc.style.animation =
      'going-up 0.5s forwards, ' +
      'fade-in 0.5s forwards';
  }, 700);
  setTimeout(() => {
    calc.style.animation = '';
    calc.style.animation =
      'going-left 0.4s forwards, ' +
      'fade-out 0.4s forwards';
    setTimeout(() => {
      calc.style.display = 'none';
      goResult();
     
    }, 400);
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
    if (pcMQL.matches) {
      console.log('PC');
      wrap.style.marginTop = '50px';
    } else if (tabletMQL.matches) {
      console.log('tablet');
      wrap.style.marginTop = '30px';
    }
    console.log(u_name.value);
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