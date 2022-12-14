{
  // 삭제버튼
  let cancel_share_trips = [];
  let cancel_val_share = [];


  function cancelShareTrip() {

    const detail_id = localStorage.getItem("detail_id");
    const parsedLikedUsername = JSON.parse(localStorage.getItem(`${ detail_id }'s like_cnt`));
    const parsedShareTrips = JSON.parse(localStorage.getItem("share_trips"));
    const parsedValShare = JSON.parse(localStorage.getItem("val_share"));
    const parsedUserShareTrips = JSON.parse(localStorage.getItem(`${ username }'s share_trips`));
    const parsedUserShareCnt = JSON.parse(localStorage.getItem(`${ username }'s share_cnt`));

    let like_list = [];

    let user_share_trips = [];

    if (parsedLikedUsername !== null) {
      for (let i = 0; i < parsedLikedUsername.length; i++) {
        const like_trips = JSON.parse(localStorage.getItem(`${ parsedLikedUsername[i] }'s like_trips`));
        like_list = like_trips.filter((like_trip) => like_trip.id !== detail_id);
        console.log(like_list);
        localStorage.setItem(`${ parsedLikedUsername[i] }'s like_trips`, JSON.stringify(like_list));
      }
    }


    if (parsedShareTrips !== null) {
      for (let i = 0; i < parsedShareTrips.length; i++) {
        const parsedId = parsedShareTrips[i].id;
        console.log(parsedId);
        if (detail_id === parsedId) {
          cancel_share_trips = parsedShareTrips.filter((trip) => trip.id !== detail_id);
          console.log(cancel_share_trips);
          cancel_val_share = parsedValShare.filter((val_share) => val_share !== detail_id);
          localStorage.setItem("share_trips", JSON.stringify(cancel_share_trips));
          localStorage.setItem("val_share", JSON.stringify(cancel_val_share));
          localStorage.removeItem(`${ detail_id }'s like_cnt`);
          localStorage.removeItem(`${ detail_id }'s reviews`);
        }
      }
    }

    // 사용자's like_trips에서 삭제

    if (parsedUserShareTrips !== null) {
      for (let i = 0; i < parsedUserShareTrips.length; i++) {
        const parsedId = parsedUserShareTrips[i].id;
        if (detail_id === parsedId) {
          user_share_trips = parsedUserShareTrips.filter((trip) => trip.id !== detail_id);
          localStorage.setItem(`${ username }'s share_trips`, JSON.stringify(user_share_trips));
        }
      }
    }

    if (parsedUserShareCnt !== null) {
      for (let i = 0; i < parsedUserShareCnt.length; i++) {
        const parsedId = parsedUserShareCnt[i];
        if (detail_id === parsedId) {
          user_share_trips = parsedUserShareCnt.filter((trip) => trip !== detail_id);
          localStorage.setItem(`${ username }'s share_cnt`, JSON.stringify(user_share_trips));
        }
      }
    }

  }

  // 삭제 버튼
  let delete_trips = [];
  let delete_saved_id = [];

  const parsedTrips = JSON.parse(localStorage.getItem(`${ username }'s trips`));
  const parsedIdList = JSON.parse(
    localStorage.getItem(`${ username }'s id_list`)
  );

  const delete_btn = document.querySelector(".delete_btn");

  function deleteToDo() {
    for (let i = 0; i < parsedTrips.length; i++) {
      const delete_id = localStorage.getItem("detail_id");
      const parsedId = parsedTrips[i].id;
      console.log(delete_id);
      console.log(typeof parsedId);
      if (delete_id === String(parsedId)) {
        delete_trips = parsedTrips.filter(
          (trip) => trip.id !== parseInt(delete_id)
        );
        localStorage.removeItem(`${ username }'s ${ delete_id }'s trip`);
        localStorage.removeItem(`${ username }'s ${ delete_id }'s expenditure`);
        localStorage.setItem(
          `${ username }'s trips`,
          JSON.stringify(delete_trips)
        );
        delete_saved_id = parsedIdList.filter((trip) => trip !== delete_id);
        localStorage.setItem(
          `${ username }'s id_list`,
          JSON.stringify(delete_saved_id)
        );
        cancelShareTrip();
        window.location.href = "../index.html";
        alert("삭제되었습니다.");
      }
    }
  }

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

  delete_btn.addEventListener("click", () => {

    if (localStorage.getItem("anotherLogin") !== null) {
      if (confirm("프로필 수정을 위해서는 비밀번호가 필요합니다. 비밀번호를 등록하시겠습니까?")) {
        createPwPopup();
      }
    } else {
      const val_pw = prompt("비밀번호를 입력하세요");
      if (val_pw === localStorage.getItem("pw_inUse")) {
        deleteToDo();
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    }
  });
}

//-------------------------------------------------------------------------

{
  // 수정버튼
  document.querySelector(".modify_btn").addEventListener("click", () => {
    window.location.href = "../html/write.html";
    const detail_id = localStorage.getItem("detail_id");
    localStorage.setItem("click_id", detail_id);
  });
}

//-------------------------------------------------------------------------

{
  // 공유버튼
  const share_btn = document.querySelector(".share_btn");

  // 전체 share_trips
  let share_trips = [];

  // 각 유저별 share_trips
  let user_share_trips = [];

  let val_share = [];

  let share_cnt = [];

  function shareTrip() {
    const detail_title = localStorage.getItem("detail_title");
    const detail_id = localStorage.getItem("detail_id");
    const saved_trip = JSON.parse(
      localStorage.getItem(`${ username }'s ${ detail_id }'s trip`)
    );
    const saved_expenditure = JSON.parse(
      localStorage.getItem(`${ username }'s ${ detail_id }'s expenditure`)
    );

    console.log(saved_expenditure);
    // 밑에 savedShareData는 렌더링 될 때 불러오는 것이기 때문에 새로고침이 없으면 항상 null이다
    // 그래서 함수 안에서 새로 불러서 비교해야 한다.
    const render_share_trips = localStorage.getItem("share_trips");
    const parsedShareTrips = JSON.parse(render_share_trips);

    if (parsedShareTrips === null) {
      const share_trip = {
        id: detail_id,
        username: username,
        title: detail_title,
        story: saved_trip.story,
        img: saved_trip.img,
        expenditure: saved_expenditure,
      };
      share_trips.push(share_trip);
      localStorage.setItem("share_trips", JSON.stringify(share_trips));
      val_share.push(detail_id);
      localStorage.setItem("val_share", JSON.stringify(val_share));
      user_share_trips.push(share_trip);
      localStorage.setItem(`${ username }'s share_trips`, JSON.stringify(user_share_trips));
      share_cnt.push(detail_id);
      localStorage.setItem(`${ username }'s share_cnt`, JSON.stringify(share_cnt));
      alert("공유되었습니다.");

    } else if (val_share.includes(detail_id)) {
      alert("이미 공유되었습니다.");
      return;
    } else {
      const share_trip = {
        id: detail_id,
        username: username,
        title: detail_title,
        story: saved_trip.story,
        img: saved_trip.img,
        expenditure: saved_expenditure,
      };
      share_trips.push(share_trip);
      localStorage.setItem("share_trips", JSON.stringify(share_trips));
      val_share.push(detail_id);
      localStorage.setItem("val_share", JSON.stringify(val_share));
      user_share_trips.push(share_trip);
      localStorage.setItem(`${ username }'s share_trips`, JSON.stringify(user_share_trips));
      share_cnt.push(detail_id);
      localStorage.setItem(`${ username }'s share_cnt`, JSON.stringify(share_cnt));
      alert("공유되었습니다.");
    }
  }

  const savedShareTrips = localStorage.getItem("share_trips");

  if (savedShareTrips !== null) {
    const parsedShareTrips = JSON.parse(savedShareTrips);
    share_trips = parsedShareTrips;
  }

  const savedValShare = localStorage.getItem("val_share");

  if (savedValShare !== null) {
    const parsedValShare = JSON.parse(savedValShare);
    val_share = parsedValShare;
  }

  const savedUserShareTrips = localStorage.getItem(`${ username }'s share_trips`);

  if (savedUserShareTrips !== null) {
    const parsedUserShareTrips = JSON.parse(savedUserShareTrips);
    user_share_trips = parsedUserShareTrips;
  }

  const savedUserShareCnt = localStorage.getItem(`${ username }'s share_cnt`);

  if (savedUserShareCnt !== null) {
    const parsedUserShareCnt = JSON.parse(savedUserShareCnt);
    share_cnt = parsedUserShareCnt;
  }



  share_btn.addEventListener("click", shareTrip);
}
