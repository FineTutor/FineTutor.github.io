const recieved = document.querySelector('#Recieved');
const sent = document.querySelector('#Sent');
const success = document.querySelector('#Success');

window.setTimeout(function() {
  var user = firebase.auth().currentUser
  // console.log(user);
  db.collection('users').doc(user.uid).get().then(doc => {
    recieved.innerHTML = ``;
    sent.innerHTML = ``;
    success.innerHTML = ``;
    var Recieved = doc.data().BeingSelected;
    var Sent = doc.data().Selected;
    var Success = doc.data().Success;
    var character = doc.data().character;
    var decharacter = (character == 'teacher') ? 'student' : 'teacher';
    var uid;
    console.log(doc.data());
    for (var i = 0; i < Success.length; i++) {
      if (Success.length > 0) {
        uid = Success.pop();
        if (character == 'teacher') {
          db.collection('StudentInfo').doc(uid).get().then(doc => {
            success.innerHTML = `
            <div class = "row" style = "max-width: 1000px; padding: 30px; margin: 30px; box-shadow: 8px 12px 30px #b3b3b3; width: 100%;">
                <div class="col-sm-12 col-lg-5">
                    <h2>`+doc.data().LastName+` 同學</h2>
                    <p style="text-align:left">性別：`+doc.data().Gender+`</p>
                    <p style="text-align:left">科目：`+doc.data().SubjectsString+`</p>
                    <p style="text-align:left">地點：`+doc.data().Location[0] + ` ` + doc.data().Location[1] +`</p>
                    <p style="text-align:left">年紀：`+doc.data().Status+`</p>
                    <p style="text-align:left">備註：`+doc.data().StatusInfo+`</p>
                    <p style="text-align:left">意願薪資：`+doc.data().Salary+`</p>
                </div>
                <div class="col-sm-12 col-lg-3" style=" place-self: flex-end;">
                  <button class="btn btn-dark" data-toggle="modal" data-target="#V` + doc.id + `" type="button">約試教去！</button>
                </div>
                <div class="col-sm-12 col-lg-4" style="align-self: center; text-align: center;">
                    <img style="max-width: 80%;" src="/assets/img/student.png">
                </div>
            </div>
            ` + success.innerHTML;
          })
          db.collection('users').doc(uid).get().then(doc => {
            success.innerHTML += `
            <div class="modal fade" id="V` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title" id="exampleModalLongTitle">約試教！</h2>
                        </div>
                        <div class="modal-body" id="CaseDetail">
                            <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">`+doc.data().LastName+` 同學/家長資訊：</h4>
                            <p>電話：`+doc.data().Contact.Tel+`</p>
                            <p>Line ID：`+doc.data().Contact.Line+`</p>
                            <p>空閒時間：` + doc.data().Contact.AvailableTime + `</p>
                            <br>
                            <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">試教簡訊範例：</h4>
                            <p>`+doc.data().LastName+` 同學好：<br>我是_______老師，使用finetutor家教網接受了試教邀請，想跟您約試教，請問_________是否有空？<br>謝謝！</p><br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
          })
        } else {
          db.collection('TeacherResume').doc(uid).get().then(doc => {
            success.innerHTML = `
            <div class = "row" style = "max-width: 1000px; padding: 30px; margin: 30px; box-shadow: 8px 12px 30px #b3b3b3; width: 100%;">
                <div class="col-sm-12 col-lg-5">
                    <h2>`+doc.data().LastName+` 老師</h2>
                    <p style="text-align:left">教授科目：`+doc.data().SubjectsString+`</p>
                    <p style="text-align:left">地點：`+doc.data().Location[0] + ` ` + doc.data().Location[1] +`</p>
                    <p style="text-align:left">學籍/身分：`+doc.data().Status+`</p>
                    <p style="text-align:left">薪資：`+doc.data().Salary+`</p>
                </div>
                <div class="col-sm-12 col-lg-3" style=" place-self: flex-end;">
                  <button class="btn btn-dark" data-toggle="modal" data-target="#V` + doc.id + `" type="button">約試教去！</button>
                </div>
                <div class="col-sm-12 col-lg-4" style="align-self: center; text-align: center;">
                    <img style="max-width: 80%; height: 280px;" src="/assets/img/teacher.png">
                </div>
            </div>
            ` + success.innerHTML;
          })
          db.collection('users').doc(uid).get().then(doc => {
            success.innerHTML += `
            <div class="modal fade" id="V` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title" id="exampleModalLongTitle">約試教！</h2>
                        </div>
                        <div class="modal-body" id="CaseDetail">
                            <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">`+doc.data().LastName+` 老師資訊：</h4>
                            <p>電話：`+doc.data().Contact.Tel+`</p>
                            <p>Line ID：`+doc.data().Contact.Line+`</p>
                            <p>空閒時間：` + doc.data().Contact.AvailableTime + `</p>
                            <br>
                            <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">試教簡訊範例：</h4>
                            <p>`+doc.data().LastName+` 老師好：<br>我是_______同學/家長，使用finetutor家教網接受了試教邀請，想跟您約試教，請問_________是否有空？<br>謝謝！</p><br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
          })
        }
      }
    }
    for (var i = 0; i < 3; i++) {
      if (Recieved.length > 0) {
        uid = Recieved.pop();
        if (character == 'teacher') {
          db.collection('StudentInfo').doc(uid).get().then(doc => {
            recieved.innerHTML = `
            <div class = "col-sm-12 col-lg-4">
                <div class="product-card">
                    <div class="product-details">
                      <h2>`+doc.data().LastName+` 同學</h2>
                        <p style="text-align:left">科目：`+doc.data().SubjectsString+`</p>
                        <p style="text-align:left">地點：`+doc.data().Location[0] + ` ` + doc.data().Location[1] +`</p>
                        <p style="text-align:left">年紀：`+doc.data().Status+`</p>
                        <p style="text-align:left">意願薪資：`+doc.data().Salary+`</p>
                        <button class="btn btn-light" data-toggle="modal" data-target="#R` + doc.id + `" type="button"><p>查看更多</p></button>
                    </div>
                    <div class="product-image">
                        <img src="/assets/img/student.png">
                    </div>
                    <div class="modal fade" id="R` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2 class="modal-title" id="exampleModalLongTitle">案件詳情</h2>
                                </div>
                                <div class="modal-body" id="CaseDetail">
                                    <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">`+doc.data().LastName+` 同學</h4>
                                    <p>科目：`+doc.data().SubjectsString+`</p><br>
                                    <p>年紀：`+doc.data().Status+`</p><br>
                                    <p>地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                                    <p>意願薪資：`+doc.data().Salary+`</p><br>
                                    <p>備註：`+doc.data().StatusInfo+`</p><br>
                                    <p id = "CaseID" style = "display: none;">`+doc.id+`</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                                    <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="rmvReq2(this)">移除邀請</button>
                                    <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="acptReq(this)">接受邀請</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ` + recieved.innerHTML;
          })
        } else {
          db.collection('TeacherResume').doc(uid).get().then(doc => {
            recieved.innerHTML = `
            <div class = "col-sm-12 col-lg-4">
                <div class="product-card">
                    <div class="product-details">
                      <h2>`+doc.data().LastName+` 老師</h2>
                        <p style="text-align:left">教授科目：`+doc.data().SubjectsString+`</p>
                        <p style="text-align:left">地點：`+doc.data().Location[0] + ` ` + doc.data().Location[1] +`</p>
                        <p style="text-align:left">學籍/身分：`+doc.data().Status+`</p>
                        <p style="text-align:left">薪資：`+doc.data().Salary+`</p>
                        <button class="btn btn-light" data-toggle="modal" data-target="#R` + doc.id + `" type="button"><p>查看更多</p></button>
                    </div>
                    <div class="product-image">
                        <img src="/assets/img/teacher.png">
                    </div>
                    <div class="modal fade" id="R` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2 class="modal-title" id="exampleModalLongTitle">案件詳情</h2>
                                </div>
                                <div class="modal-body" id="CaseDetail">
                                    <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">`+doc.data().LastName+` 老師</h4>
                                    <p>所教科目：`+doc.data().SubjectsString+`</p><br>
                                    <p>老師身分：`+doc.data().Status+`</p><br>
                                    <p>地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                                    <p>意願薪資：`+doc.data().Salary+`</p><br>
                                    <p>自我介紹：`+doc.data().Biography+`</p><br>
                                    <p id = "CaseID" style = "display: none;">`+doc.id+`</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                                    <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="rmvReq2(this)">移除邀請</button>
                                    <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="acptReq(this)">接受邀請</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ` + recieved.innerHTML;
          })
        }
      } else {
        recieved.innerHTML += `
        <div class = "col-sm-12 col-lg-4">
            <div class="product-card">
                <div class="product-details">
                  <h3>還沒有收到試教邀請哦，趕快送出邀請吧！</h3>
                </div>
                <div class="product-image">
                    <img src="/assets/img/`+ decharacter + `.png">
                </div>
            </div>
        </div>
        `;
      }  
    }
    for (var i = 0; i < 3; i++) {
      if (Sent.length > 0) {
        uid = Sent.pop();
        if (character == 'teacher') {
          db.collection('StudentInfo').doc(uid).get().then(doc => {
            sent.innerHTML = `
            <div class = "col-sm-12 col-lg-4">
                <div class="product-card" style="color:white;background-color: #180f2cec;">
                    <div class="product-details">
                      <h2 style="color: white;">`+doc.data().LastName+` 同學</h2>
                        <p style="text-align:left">科目：`+doc.data().SubjectsString+`</p>
                        <p style="text-align:left">地點：`+doc.data().Location[0] + ` ` + doc.data().Location[1] +`</p>
                        <p style="text-align:left">年紀：`+doc.data().Status+`</p>
                        <p style="text-align:left">意願薪資：`+doc.data().Salary+`</p>
                        <button class="btn btn-light" data-toggle="modal" data-target="#S` + doc.id + `" type="button"><p>查看更多</p></button>
                    </div>
                    <div class="product-image">
                      <img src="/assets/img/student.png">
                    </div>
                    <div class="modal fade" id="S` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content" style = "background-color: #180f2cec;">
                                <div class="modal-header">
                                    <h2 class="modal-title" id="exampleModalLongTitle">案件詳情</h2>
                                </div>
                                <div class="modal-body" id="CaseDetail">
                                    <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">`+doc.data().LastName+` 同學</h4>
                                    <p>科目：`+doc.data().SubjectsString+`</p><br>
                                    <p>年紀：`+doc.data().Status+`</p><br>
                                    <p>地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                                    <p>意願薪資：`+doc.data().Salary+`</p><br>
                                    <p>備註：`+doc.data().StatusInfo+`</p><br>
                                    <p id = "CaseID" style = "display: none;">`+doc.id+`</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                                    <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="rmvReq(this)">移除邀請</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ` + sent.innerHTML;
          })
        } else {
          db.collection('TeacherResume').doc(uid).get().then(doc => {
            sent.innerHTML = `
            <div class = "col-sm-12 col-lg-4">
                <div class="product-card" style="color:white;background-color: #180f2cec;">
                    <div class="product-details">
                      <h2 style="color: white;">`+doc.data().LastName+` 老師</h2>
                        <p style="text-align:left">教授科目：`+doc.data().SubjectsString+`</p>
                        <p style="text-align:left">地點：`+doc.data().Location[0] + ` ` + doc.data().Location[1] +`</p>
                        <p style="text-align:left">學籍/身分：`+doc.data().Status+`</p>
                        <p style="text-align:left">薪資：`+doc.data().Salary+`</p>
                        <button class="btn btn-light" data-toggle="modal" data-target="#S` + doc.id + `" type="button"><p>查看更多</p></button>
                    </div>
                    <div class="product-image">
                      <img src="/assets/img/teacher.png">
                    </div>
                    <div class="modal fade" id="S` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content" style = "background-color: #180f2cec;">
                                <div class="modal-header">
                                    <h2 class="modal-title" id="exampleModalLongTitle">案件詳情</h2>
                                </div>
                                <div class="modal-body" id="CaseDetail">
                                    <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">`+doc.data().LastName+` 老師</h4>
                                    <p>所教科目：`+doc.data().SubjectsString+`</p><br>
                                    <p>老師身分：`+doc.data().Status+`</p><br>
                                    <p>地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                                    <p>意願薪資：`+doc.data().Salary+`</p><br>
                                    <p>自我介紹：`+doc.data().Biography+`</p><br>
                                    <p id = "CaseID" style = "display: none;">`+doc.id+`</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                                    <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="rmvReq(this)">移除邀請</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ` + sent.innerHTML;
          })
        }
      } else {
        sent.innerHTML += `
        <div class = "col-sm-12 col-lg-4">
            <div class="product-card" style="color:white;background-color: #180f2cec;">
                <div class="product-details">
                  <h2 style="color: white;">趕快送出邀請吧！</h2>
                </div>
                <div class="product-image">
                  <img src="/assets/img/`+ decharacter + `.png">
                </div>
            </div>
        </div>
        `;
      }  
    }
  })
}, 1000);

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function rmvReq(selectElm){
  var user = firebase.auth().currentUser;
  db.collection('users').doc(user.uid).get().then(doc => {
    var Selected = doc.data().Selected; 
    var character = doc.data().character; 
    var CaseID = selectElm.getAttribute('id');
          // A: chooser, B: person being chosen
          // remove B's id to users'(A) Selected
    console.log(Selected);
    Selected = removeItemOnce(Selected, CaseID);
    console.log(Selected);
    db.collection('users').doc(user.uid).set({
      Selected: Selected
    }, { merge: true });
    // B's BeingSelected -= 1
    console.log(character)
    if(character == 'teacher'){
      db.collection('StudentInfo').doc(CaseID).get().then(doc => {
        console.log(CaseID)
        var beingSelected = doc.data().BeingSelected;
        db.collection('StudentInfo').doc(CaseID).set({
          BeingSelected: beingSelected - 1
        }, { merge: true });
      });
    }
    else{
      db.collection('TeacherResume').doc(CaseID).get().then(doc => {
        console.log(CaseID)
        var beingSelected = doc.data().BeingSelected;
        db.collection('TeacherResume').doc(CaseID).set({
          BeingSelected: beingSelected - 1
        }, { merge: true });
      });
    }
     // remove A's id to users'(B) BeingSelected
    db.collection('users').doc(CaseID).get().then(doc => {
      var beingSelected = doc.data().BeingSelected;
      beingSelected = removeItemOnce(beingSelected, user.uid);
      db.collection('users').doc(CaseID).set({
        BeingSelected: beingSelected
      }, { merge: true });
    })
    setTimeout(function(){
      location.replace("/progress.html");
    }, 800);
  });
}

function rmvReq2(selectElm){
  var user = firebase.auth().currentUser;
  db.collection('users').doc(user.uid).get().then(doc => {
    var BeingSelected = doc.data().BeingSelected; 
    var character = doc.data().character; 
    var CaseID = selectElm.getAttribute('id');
          // A: chooser, B: person being chosen
          // remove B's id to users'(A) Selected
    console.log(BeingSelected);
    BeingSelected = removeItemOnce(BeingSelected, CaseID);
    console.log(BeingSelected);
    db.collection('users').doc(user.uid).set({
      BeingSelected: BeingSelected
    }, { merge: true });
    // B's BeingSelected -= 1
    console.log(character)
    if(character == 'student'){
      db.collection('StudentInfo').doc(CaseID).get().then(doc => {
        console.log(CaseID)
        var beingSelected = doc.data().BeingSelected;
        db.collection('StudentInfo').doc(CaseID).set({
          BeingSelected: beingSelected - 1
        }, { merge: true });
      });
    }
    else{
      db.collection('TeacherResume').doc(CaseID).get().then(doc => {
        console.log(CaseID)
        var beingSelected = doc.data().BeingSelected;
        db.collection('TeacherResume').doc(CaseID).set({
          BeingSelected: beingSelected - 1
        }, { merge: true });
      });
    }
     // remove A's id to users'(B) BeingSelected
    db.collection('users').doc(CaseID).get().then(doc => {
      var Selected = doc.data().Selected;
      Selected = removeItemOnce(Selected, user.uid);
      db.collection('users').doc(CaseID).set({
        Selected: Selected
      }, { merge: true });
    })
    setTimeout(function(){
      location.replace("/progress.html");
    }, 800);
  });
}

function acptReq(selectElm){
  var user = firebase.auth().currentUser;
  db.collection('users').doc(user.uid).get().then(doc => {
    var Success = doc.data().Success; 
    var BeingSelected = doc.data().BeingSelected; 
    var Selected = doc.data().Selected; 
    var character = doc.data().character; 
    var CaseID = selectElm.getAttribute('id');
          // A: chooser, B: person being chosen
          // remove B's id to users'(A) Selected
    console.log(Success);
    Success.push(CaseID);
    BeingSelected = removeItemOnce(BeingSelected, CaseID);
    Selected = removeItemOnce(Selected, CaseID);
    console.log(Success);
    db.collection('users').doc(user.uid).set({
      Success: Success,
      BeingSelected: BeingSelected,
      Selected: Selected
    }, { merge: true });
    // B's BeingSelected -= 1
    if(character == 'teacher'){
      db.collection('StudentInfo').doc(CaseID).get().then(doc => {
        console.log(CaseID)
        var beingSelected = doc.data().BeingSelected;
        db.collection('StudentInfo').doc(CaseID).set({
          BeingSelected: beingSelected - 1
        }, { merge: true });
      });
    }
    else{
      db.collection('TeacherResume').doc(CaseID).get().then(doc => {
        console.log(CaseID)
        var beingSelected = doc.data().BeingSelected;
        db.collection('TeacherResume').doc(CaseID).set({
          BeingSelected: beingSelected - 1
        }, { merge: true });
      });
    }
    console.log(character)
     // remove A's id to users'(B) BeingSelected
    db.collection('users').doc(CaseID).get().then(doc => {
      var Success = doc.data().Success;
      Success.push(user.uid);
      var Selected = doc.data().Selected;
      Selected = removeItemOnce(Selected, user.uid);
      var BeingSelected = doc.data().BeingSelected;
      BeingSelected = removeItemOnce(BeingSelected, user.uid);
      db.collection('users').doc(CaseID).set({
        Success: Success,
        Selected: Selected,
        BeingSelected: BeingSelected
      }, { merge: true });
    })
    setTimeout(function(){
      location.replace("/progress.html");
    }, 800);
  });
}