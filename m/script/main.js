// 1. 메인슬라이드 구현하기

//변수선언
const m_img = document.querySelectorAll('#visual_slide > div'); //슬라이드 이미지 변수
const l_btn = document.querySelector('#visual_slide .s_btn > li:first-child'); //슬라이드 좌측버튼 변수
const r_btn = document.querySelector('#visual_slide .s_btn > li:last-child'); //슬라이드 우측버튼 변수
const c_btn = document.querySelectorAll('#visual_slide .ctrl_btn li'); //콘트롤 버튼 변수
//탭콘텐츠 배경
const tab_backIMg = document.querySelector('.tcon');

let n = 0; //인덱스값 초기화 (콘트롤 버튼 클릭시 인덱스값이 0이 첫번째 목록이기 때문에... )

//3초 마다 반복 호출을 위한 움직이는 슬라이드 함수
function fadeInOut(){
  m_img.forEach(img=>{
    //img.style.display='none'; //보이는 이미지 숨기고
    img.style.opacity='0'; //보이는 이미지 숨기고
  });

  //콘트롤 버튼 서식 제거
  c_btn.forEach(btn=>{
    btn.classList.remove('on');
  });

  if(n===3){ //n값이 2라면 (마지막 슬라이드 이미지 라면)
    n=0; //0으로 초기화 하고(처음 슬라이드가 나오도록 함)
  }else{ //그렇지 않다면
    n++; //1씩 증가하여 다음 슬라이드가 나오도록 함.
  }
  //인덱스값(n)에 해당하는 콘트롤 버튼에 on서식을 적용하기
  c_btn[n].classList.add('on');
  //m_img[n].style.display='block'; //n번째에 해당하는 슬라이드 이미지 보이게 하기
  m_img[n].style.opacity='1'; //n번째에 해당하는 슬라이드 이미지 보이게 하기

  console.log(n);
};

// 이미지 슬라이드 (좌측버튼 클릭시 움직이는 함수)
function fadeInOut2(){
  //기존 보이는 이미지 숨기기
  m_img.forEach(img=>{
    // img.style.display='none';
    img.style.opacity='0';
  });

  //콘트롤 버튼 서식 모두 지우고
  c_btn.forEach(btn=>{
    btn.classList.remove('on');
  });

  if(n===0){ //만약에 n값이 0일 경우 (첫번째 이미지일 경우)
    n=3; //n값에 2를 대입하여 마지막 이미지가 나오도록
  }else{ //그렇지 않다면
    n--; //이전 이미지가 나오도록 한다.
  }

  //console.log(n);

  //인덱스값(n)에 해당하는 콘트롤 버튼에 on서식을 적용하기
  c_btn[n].classList.add('on');
  //m_img[n].style.display='block'; //n번째에 해당하는 슬라이드 이미지 보이게 하기
  m_img[n].style.opacity='1'; //n번째에 해당하는 슬라이드 이미지 보이게 하기
}

//매 3초마다 함수를 반복호출하여 실행합니다.
//setInterval객체(반복할 내용, 시간)
let Timer = setInterval(fadeInOut, 3000);

// 콘트롤 버튼에 마우스 오버시 시간을 제거
c_btn.forEach(btn=>{
  btn.addEventListener('mouseenter',function(){
    clearInterval(Timer);
  });
});

// 콘트롤 버튼에 마우스 아웃시 다시 시간을 생성
c_btn.forEach(btn=>{
  btn.addEventListener('mouseleave',function(){
    Timer = setInterval(fadeInOut, 3000);
  });
});

// 콘트롤 버튼을 클릭하면 해당 슬라이드 이미지가 나오도록 함.
c_btn.forEach((btn, idx)=>{
  btn.addEventListener('click', function(){
    n = idx;
    console.log(n); // 0, 1, 2, 3, 0, 1...

    //보이는 슬라이드 이미지 모두 숨기고
    m_img.forEach(img=>{
      img.style.opacity='0';
    });

    //콘트롤버튼 서식 모두 제거
    c_btn.forEach(b=>{
      b.classList.remove('on');
    });

    //해당 n번째 이미지 나오게 하기, 해당콘트롤 버튼 서식 적용하기
    m_img[n].style.opacity='1';
    c_btn[n].classList.add('on'); //콘트롤 버튼 서식 적용

  });
});

//좌측, 우측 버튼 클릭시 각각 해당 함수를 호출하여 슬라이드 움직이게 하기
//조건 : 버튼에 마우스 오버시 기존 '시간객체'를 제거해야

l_btn.addEventListener('click', function(){
  clearInterval(Timer); //시간제거
  fadeInOut2();//좌측으로 이미지 변경
});

r_btn.addEventListener('click', function(){
  clearInterval(Timer); //시간제거
  fadeInOut(); //우측으로 이미지 변경
})

//좌, 우측버튼에 마우스 빼면 Timer객 다시 살려서 자동으로 움직이게 한다.
const s_btn_area = document.querySelector('#visual_slide .s_btn');

s_btn_area.addEventListener('mouseleave', function(){
  clearInterval(Timer); //시간제거
  Timer = setInterval(fadeInOut, 3000);//다시 3초마다 반복호출실행
});

// 2. 탭콘텐츠 구현하기
//1. 변수선언
const tab_list = document.querySelectorAll('.tcon ul li a');
const tcon = document.querySelectorAll('.tcon ul li div');

//2. 초기값 : 첫번째 콘텐츠만 보이게 하고, 첫번째 a태그에 't_on' 클래스 추가
//지금은 현재 css로 적용했기 때문에 안해도 됨.

// tcon.forEach((el, index)=>{ //div태그에 각각 기능을 적용합니다.
//   if(index===0){
//     el.style.display='block'; //첫번째 div 보이게
//     tab_list[index].classList.add('tab_on');//첫번째 탭메뉴 a요소 서식 적용
//   }else{
//     el.style.display='none';
//   }
// });

// 사용자가 '탭메뉴'를 클릭하면 이벤트가 동작하면서 
// '모든 콘텐츠를 숨기고', 해당 탭메뉴의 콘텐츠만 보이게 합니다.
tab_list.forEach((tab, i)=>{
  tab.addEventListener('click', (e)=>{
    e.preventDefault(); //a태그의 기본 링크 이동 막기(새로고침 방지)

    //모든 콘텐츠 숨기고, 
    tcon.forEach((content)=>{
      content.style.display='none';
    });

    //모든 탭메뉴의 t_on클래스 서식을 제거
    tab_list.forEach((t)=>{
      t.classList.remove('t_on');
    });

    //선택한 메뉴에만 t_on서식을 적용하고, 바로뒤에 있는 콘텐츠 보이게함
    tcon[i].style.display='block';
    tab_list[i].classList.add('t_on');

    //3번 탭메뉴 클릭시 부모박스의 높이(900)가 변해야 함.
    if(i==2){
      tcon[i].parentElement.parentElement.parentElement.parentElement.style.height='800px';
      tcon[i].parentElement.parentElement.parentElement.style.height='800px';
      //배경 이미지 위치 변경하기
      tab_backIMg.style.backgroundPosition='bottom';
    }else{
      tcon[i].parentElement.parentElement.parentElement.parentElement.style.height='660px';
      tcon[i].parentElement.parentElement.parentElement.style.height='660px';
      //배경 이미지 위치 변경하기
      tab_backIMg.style.backgroundPosition='bottom';
    }
  });
});

// 3. 이벤트 슬라이드 구현하기
//1. 변수선언
const sw = document.querySelector('.s_wrap');
const e_lbtn = document.querySelector('#event i.fa-angle-left');
const e_rbtn = document.querySelector('#event i.fa-angle-right');
let cont = 0; //초기값
let sn = document.querySelectorAll('.s_wrap figure');

let s_total = sn.length; //슬라이드 개수
console.log(s_total); //3이 나오는지 확인

const fig = 100; //슬라이드 1장의 너비 100%;
sw.style.width = fig*s_total+'%'; //300
console.log(sw.style.width); //300나오는지 확인

//좌측 버튼 클릭시 시간제거하고, 슬라이드 왼쪽으로 이동하기
/*
  좌우 버튼의 mouseleave 이벤트에서 clearInterval(Timer2) 없이 새로운 setInterval을 바로 생성하고 있습니다. 사용자가 버튼에 마우스를 여러 번 올렸다 내리면 타이머가 여러 개 동시에 돌아가서 슬라이드가 미친 듯이 빨라지는 현상이 발생합니다. 실행 전 반드시 기존 타이머를 지워주어야 합니다.
*/
e_lbtn.addEventListener('click', ()=>{
  //alert('클릭 이벤트 확인');
  clearInterval(Timer2); 

  // if(cont>0){ //만약에 cont값이 0보다 크면
  //   mslide(cont-1);  //1씩 감소
  // }else{  //그렇지 않으면 
  //   mslide(s_total-1); //0으로 나오게 함.
  // }
  moveLeft();
});

//왼쪽으로 이동되는 슬라이드 함수
function moveLeft(){
  if(cont>0){ //만약에 cont값이 0보다 크면
    mslide(cont-1);  //1씩 감소
  }else{  //그렇지 않으면 
    mslide(s_total-1); //0으로 나오게 함.
  }
};


//우측 버튼 클릭시 시간제거하고, 슬라이드 오른쪽으로 이동하기
e_rbtn.addEventListener('click', ()=>{
  //alert('클릭 이벤트 확인');
  clearInterval(Timer2);

  // if(cont<s_total-1){ //만약에 cont값이 2보다 작으면
  //   mslide(cont+1); //1씩 증가하여 함수에 보내준다.
  // }else{            //그렇지 않으면
  //   mslide(0);  //0을 함수에 넘겨서 1번 슬라이드가 나오게 함.
  // }

  moveRight(); //오른쪽으로 이동하는 함수
});

function moveRight(){
  if(cont<s_total-1){ //만약에 cont값이 2보다 작으면
    mslide(cont+1); //1씩 증가하여 함수에 보내준다.
  }else{            //그렇지 않으면
    mslide(0);  //0을 함수에 넘겨서 1번 슬라이드가 나오게 함.
  }
}

// 좌, 우측 버튼에 마우스 아웃시 시간을 다시 재생
// 우측 버튼 마우스 아웃시 타이머 재시작 (중첩 방지를 위해 기존 타이머 클리어)
e_lbtn.addEventListener('mouseleave', ()=>{
    // Timer2 = setInterval(function(){
    //   if(cont>0){ //만약에 cont값이 0보다 크면
    //     mslide(cont-1);  //1씩 감소
    //   }else{  //그렇지 않으면 
    //     mslide(s_total-1); //0으로 나오게 함.
    //   }
    // }, 3000);
    clearInterval(Timer2);
    Timer2 = setInterval(moveLeft, 3000);
});

// 좌, 우측 버튼에 마우스 아웃시 시간을 다시 재생
// 수정:우측 버튼 마우스 아웃시 타이머 재시작 (중첩 방지를 위해 기존 타이머 클리어)
e_rbtn.addEventListener('mouseleave', ()=>{
  //   Timer2 = setInterval(function(){
  //   if(cont<s_total-1){ //만약에 cont가 2보다 작으면
  //     mslide(cont+1); //1을 더하여 mslide에 넘김
  //   }else{ //그렇지 않으면
  //     mslide(0); //0을 넣어서 1번이 나오도록 mslide에 넘김
  //   }
  // }, 3000);
  clearInterval(Timer2);
  Timer2 = setInterval(moveRight, 3000);
});

//3. 매 시간마다 반복 호출하여 자동으로 움직이게
function mslide(n){
  sw.style.left = fig*-n+'%';
  cont = n;
  console.log(sw.style.left); //검증하기 -0%, -200%, -300%
}

//3초마다 0, 1, 2값을 mslide에 넘기기
// let Timer2 = setInterval(function(){
//   if(cont<s_total-1){ //만약에 cont가 2보다 작으면
//     mslide(cont+1); //1을 더하여 mslide에 넘김
//   }else{ //그렇지 않으면
//     mslide(0); //0을 넣어서 1번이 나오도록 mslide에 넘김
//   }
// }, 3000);

let Timer2 = setInterval(moveRight, 3000);