const resume = document.querySelector('.resume');

window.setTimeout(function() {
  var user = firebase.auth().currentUser
  // console.log(user);
  db.collection('users').doc(user.uid).get().then(doc => {
    var html = ``;
    var text = (doc.data().character == 'teacher') ? '老師履歷' : '學生資料';
    html += `<h1 style="text-align: center; padding-bottom: 30px;">`+ text +`</h1>`;
    if(!doc.data().FirstName) {
      html += `<h1 style="text-align: center;">請先填寫學生資料</h1>`;
    } else {
      html +=  `<h3>學生姓名：`+doc.data().LastName+ ` ` + doc.data().FirstName +`</h3>`;
      html +=  `<h3>學生性別：`+doc.data().Gender+`</h3>`;
      html +=  `<h3>學生年紀：`+doc.data().Status+`</h3>`;
      if (doc.data().StatusInfo != '') html +=  `<h3>學生年紀備註：`+doc.data().StatusInfo+`</h3>`;
      html +=  `<h3>上課地區：`+doc.data().Location[0] +  ` ` + doc.data().Location[1] +`</h3>`;
      html +=  `<h3>科目：`+doc.data().SubjectsString+`</h3>`;
      html +=  `<h3>家長/學生聯絡資料</h3>`;
      html +=  `<h4>&ensp;&ensp;手機號碼：`+doc.data().Contact.Tel+`</h4>`;
      html +=  `<h4>&ensp;&ensp;Line ID：`+doc.data().Contact.Line+`</h4>`;
      html +=  `<h4>&ensp;&ensp;空閒時間：`+doc.data().Contact.AvailableTime+`</h4>`;
      html +=  `<h3>備註</h3>`;
      html +=  `<p>`+ doc.data().Biography +`</p>`;
    }
    resume.innerHTML = html;
  })
}, 800);