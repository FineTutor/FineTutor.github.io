const resume = document.querySelector('.resume');

window.setTimeout(function() {
  var user = firebase.auth().currentUser
  // console.log(user);
  db.collection('users').doc(user.uid).get().then(doc => {
    var html = ``;
    var text = (doc.data().character == 'teacher') ? '老師履歷' : '學生履歷';
    html += `<h1 style="text-align: center; padding-bottom: 30px;">`+ text +`</h1>`;
    if(!doc.data().FirstName) {
      html += `<h1 style="text-align: center;">請先填寫履歷</h1>`;
    } else {
      html +=  `<h4>姓名：`+doc.data().LastName + doc.data().FirstName +`</h4>`;
      html +=  `<h4>性別：`+doc.data().Gender+`</h4>`;
      html +=  `<h4>身份：`+doc.data().Status+`</h4>`;
      html +=  `<h4>地區：`+doc.data().Location[0] +  ` ` + doc.data().Location[1] +`</h4>`;
      html +=  `<h4>對象：`+doc.data().TargetString+`</h4>`;
      html +=  `<h4>科目：`+doc.data().SubjectsString+`</h4>`;
      html +=  `<h4>聯絡資料</h4>`;
      html +=  `<h5>&ensp;&ensp;手機號碼：`+doc.data().Contact.Tel+`</h5>`;
      html +=  `<h5>&ensp;&ensp;Line ID：`+doc.data().Contact.Line+`</h5>`;
      html +=  `<h5>&ensp;&ensp;空閒時間：`+doc.data().Contact.AvailableTime+`</h5>`;
      html +=  `<h4>自我介紹</h4>`;
      html +=  `<p>&ensp;&ensp;`+ doc.data().Biography +`</p>`;
    }
    resume.innerHTML = html;
  })
}, 800);