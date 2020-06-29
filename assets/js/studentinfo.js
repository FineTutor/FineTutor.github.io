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
      html +=  `<h4>學生姓名：`+doc.data().LastName+ ` ` + doc.data().FirstName +`</h4><hr>`;
      html +=  `<h4>學生性別：`+doc.data().Gender+`</h4><hr>`;
      html +=  `<h4>學生年紀：`+doc.data().Status+`</h4><hr>`;
      if (doc.data().StatusInfo != '') html +=  `<h4>學生年紀備註：`+doc.data().StatusInfo+`</h4><hr>`;
      html +=  `<h4>上課地區：`+doc.data().Location[0] +  ` ` + doc.data().Location[1] +`</h4><hr>`;
      html +=  `<h4>科目：`+doc.data().SubjectsString+`</h4><hr>`;
      html +=  `<h4>家長/學生聯絡資料：</h4>`;
      html +=  `<h5>&ensp;&ensp;&ensp;&ensp;手機號碼：`+doc.data().Contact.Tel+`</h5>`;
      html +=  `<h5>&ensp;&ensp;&ensp;&ensp;Line ID：`+doc.data().Contact.Line+`</h5>`;
      html +=  `<h5>&ensp;&ensp;&ensp;&ensp;空閒時間：`+doc.data().Contact.AvailableTime+`</h5><hr>`;
      html +=  `<h4>備註：</h4>`;
      html +=  `<h5>&ensp;&ensp;&ensp;&ensp;`+ doc.data().Biography +`</h5>`;
    }
    resume.innerHTML = html;
  })
}, 800);