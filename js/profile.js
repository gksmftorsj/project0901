const img = document.querySelector(".profile_img");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const follow = document.querySelector(".follow");
const follower = document.querySelector(".follower");

const profile_img = localStorage.getItem(`${ savedUsername }'s profile_img`);

if (profile_img === null) {
  img.setAttribute("src", `../img/profile-img/user.png`);
} else {
  img.setAttribute("src", profile_img);
}
email.setAttribute("value", savedEmail);
username.setAttribute("value", savedUsername);

const follower_cnt = JSON.parse(localStorage.getItem(`${ savedUsername }'s follower_cnt`))

if (follower_cnt === null || follower_cnt.length === 0) {
  follower.innerText = `팔로워: 0`;
} else {
  follower.innerText = `팔로워: ${ follower_cnt.length }`;
}

const follow_cnt = JSON.parse(localStorage.getItem(`${ savedUsername }'s follow_cnt`))

if (follow_cnt === null || follow_cnt.length === 0) {
  follow.innerText = `팔로우: 0`;
} else {
  follow.innerText = `팔로우: ${ follow_cnt.length }`;
}





const modify_profile_btn = document.querySelector(".modify_profile_btn");

function createPwPopup() {
  let width = "500";
  let height = "500";
  let left = Math.ceil((window.screen.width - width) / 2); // ceil=올림
  let top = Math.ceil((window.screen.height - height) / 2);
  window.open(
    "../html/create-pw.html",
    "비밀번호설정 팝업",
    `width=${ width }, height=${ height }, left=${ left }, top=${ top }`
  ); // 팝업창 가운데 정렬
}

modify_profile_btn.addEventListener("click", () => {
  if (localStorage.getItem("anotherLogin") !== null) {
    if (
      confirm(
        "프로필 수정을 위해서는 비밀번호가 필요합니다.                           비밀번호를 등록하시겠습니까?"
      )
    ) {
      createPwPopup();
    }
  } else {
    const val_pw = prompt("비밀번호를 입력하세요");
    if (val_pw === localStorage.getItem("pw_inUse")) {
      window.location.href = "../html/modify-profile.html";
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  }
});
