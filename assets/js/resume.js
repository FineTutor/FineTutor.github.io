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
      html +=  `<h3>性別：`+doc.data().Gender+`</h3>`;
      html +=  `<h3>身份：`+doc.data().Status+`</h3>`;
      html +=  `<h3>地區：`+doc.data().Location[0] +  ` ` + doc.data().Location[1] +`</h3>`;
      html +=  `<h3>對象：`+doc.data().TargetString+`</h3>`;
      html +=  `<h3>科目：`+doc.data().SubjectsString+`</h3>`;
      html +=  `<h3>聯絡資料</h3>`;
      html +=  `<h4>&ensp;&ensp;手機號碼：`+doc.data().Contact.Tel+`</h4>`;
      html +=  `<h4>&ensp;&ensp;Line ID：`+doc.data().Contact.Line+`</h4>`;
      html +=  `<h4>&ensp;&ensp;空閒時間：`+doc.data().Contact.AvailableTime+`</h4>`;
      html +=  `<h3>自我介紹</h3>`;
      html +=  `<p>`+ doc.data().Biography +`</p>`;
    }
    resume.innerHTML = html;
  })
}, 800);