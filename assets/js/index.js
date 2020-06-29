const feedList = document.querySelector('.feeds');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const titleDetails = document.querySelector('.title-details');
const adminItems = document.querySelectorAll('.admin');


const setupUI = (user) => {
  if (user) {
    
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');

    // account info
    if(user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <p>姓名 : ${doc.data().user}</p>
        <p>電子郵件 : ${user.email}</p>
        <p>身分 : ${(doc.data().character == 'teacher') ? '老師' : '學生'}</p>
      `;
      accountDetails.innerHTML = html;
      const html2 = `
        <h2 style="text-align: center; color: white;">
          ${doc.data().user}${(doc.data().character == 'teacher') ? '老師' : '學生'}，歡迎回來
        </h2>
        <h4 style="text-align: center; color: white;"> 
          您收到了 <span style = "display: inline; color: crimson; font-size: 1.5em;">${doc.data().BeingSelected.length} </span>則試教邀請！<br>
          有 <span style = "display: inline; color: crimson; font-size: 1.5em;">${doc.data().Success.length} </span>則案件待試教，<br>
          尚有 <span style = "display: inline; color: crimson; font-size: 1.5em;">${doc.data().Selected.length} </span>則案件待${(doc.data().character == 'teacher') ? '老師' : '學生'}接受。<br>
        </h4>
      `;
      titleDetails.innerHTML = html2;
    })

    //toggle UI elements

  } else {
    // account info
    // adminItems.forEach(item => item.style.display = 'none');
    // toggle UI
    loggedOutLinks.forEach(item => item.style.display = 'block');
    loggedInLinks.forEach(item => item.style.display = 'none');
    // accountDetails.innerHTML = `<h3 id="title" href="/" style='text-decoration:underline;font-style:normal;'>尚未登入</h3><br>`;
    titleDetails.innerHTML = ``;
  }
}

// setup guides
// const setupFeeds = (data) => {

//   if(data.length){
//     let html = '';
//     data.forEach(doc => {
//       const feed = doc.data();
//       //console.log(feed)
//       db.collection('users').doc(feed.author).get().then(doc => {
//         //console.log(doc.data().user)
        
//         const li = `
//         <section id="${feed.title}">
//           <div class="row">
//               <div class="3u" style="padding: 0px; text-align: right;">
//                 <img src="https://api.adorable.io/avatars/150/${doc.data().user}@adorable.io.png" style="border-radius: 10px; width: 100%; height: auto; max-width: 100px;"/>
//               </div>
//               <div class="9u" style="padding: 0px; padding-left: 10px;">
//                 <h4>${doc.data().user}&nbsp;在&nbsp;${feed.postedAt.toDate().toString().substring(4,21)}&nbsp;時說：</h4>
//                 <p style="margin-bottom: 0px; font-size: 1.35em;">${feed.content}</p>
//               </div>
//           </div>
//         </section>
//         `;
//         html += li; 
//         feedList.innerHTML = html;
//       })
//     });
//   } else {
//     feedList.innerHTML = '<h3 style = "text-align: center;">請先登入才能留言/發文</h3>';
//   }
// }