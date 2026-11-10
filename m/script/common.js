// 상단 헤더 토글버튼 기능 만들기

// 1. 변수선언
const toggleBtn = document.querySelector('.toggle'); //토글버튼 
const spans = document.querySelectorAll('.toggle span'); //라인
const nav = document.querySelector('.gnb'); //메인메뉴
let mnu = document.querySelectorAll('.gnb > ul > li > a'); //메인메뉴
let i = 0;

// 2. 클릭이벤트 (토글버튼)
toggleBtn.addEventListener('click', function(){
  //토글버튼 자체에 클래스를 토글
  this.classList.toggle('active');
    
  if(this.classList.contains('active')){ 
    spans[0].classList.add('act_rotate01');
    spans[1].classList.add('act_none');
    spans[2].classList.add('act_rotate02');
  } else {
    spans[0].classList.remove('act_rotate01');
    spans[1].classList.remove('act_none');
    spans[2].classList.remove('act_rotate02');
  }

  // 메인메뉴 나오고 / 숨기기 (클래스 토글 방식)
  nav.classList.toggle('active');
});

// 3. 메인메뉴 클릭시 해당 서브만 나오게 하기
// 방법1. 메인메뉴마다 각각 기능을 구현해야함
// (foreach, event)
// 방법2. 이벤트 안에서 .sub클래스가 존재하면 새로고침 방지
// 방법3. 현재 메뉴의 서브가 아니라면 숨기기(아이콘 회전)
// 방법4. 해당 서브가 보이게하기(아이콘 회전)

mnu.forEach(function(item){
  item.addEventListener('click', function(event){
    const sub = item.nextElementSibling; // 서브메뉴 변수

    // 서브메뉴가 존재할 경우에만 기본 링크 이동 방지
    if(sub && sub.classList.contains('sub')){
      event.preventDefault(); 
    } else {
      return; // 서브메뉴가 없으면 아래 로직을 탈 필요가 없음
    }

    // 다른 서브메뉴가 보인다면 모두 숨기기
    mnu.forEach(function(otherItem){
      if(otherItem !== item){
        const otherSub = otherItem.nextElementSibling;

        // 다른 서브메뉴 숨기기
        if(otherSub && otherSub.classList.contains('sub')){
          otherSub.classList.remove('act');
        }
        const otherIcon = otherItem.querySelector('.fa-angle-down');

        // 다른 아이콘 방향 원래대로 돌리기
        if(otherIcon){ otherIcon.classList.remove('rotate'); }
      }
    });

    // 클릭한 서브메뉴 열고/닫기 (안전하게 sub가 존재할 때만 실행)
    if(sub) {sub.classList.toggle('act');}

    // 현재 클릭한 메뉴의 화살표 아이콘 회전하기
    const icon = item.querySelector('.fa-angle-down');
    if(icon){
      icon.classList.toggle('rotate');
    }
  });
});