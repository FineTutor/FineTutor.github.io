// signup
const SearchedInfo = document.querySelector(".searchedInfo");
const SearchForm = document.querySelector("#SearchForm");
const CaseDetail = document.querySelector("#CaseDetail");

var character;

SearchForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    // get user info
    const county = document.querySelector("#Location").children.county;
    const district = document.querySelector("#Location").children.district;
    const age = SearchForm['age'].value;
    const subject = SearchForm['subject'].value;

    var Location = [];
    var Age = [];

    for (i = 0; i < county.length; i++) {
        if (county[i].selected == true) {
            Location.push(county[i].text);
        }
    }

    for (i = 0; i < district.length; i++) {
        if (district[i].selected == true) {
            Location.push(district[i].text);
        }
    }

    if (age == 'elem') Age.push([0]);
    if (age == 'junior') Age.push([1]);
    if (age == 'senior') Age.push([2, 3, 4]);
    if (age == 'college') Age.push([5, 6, 7, 8]);
    if (age == 'social') Age.push([9]);

    const SearchItems = [Location, Age, subject];
    // console.log(SearchItems);

    var user = firebase.auth().currentUser;
    db.collection('users').doc(user.uid).get().then(doc => {
        character = doc.data().character;
        console.log(character);
        var SearchRef;
        SearchedInfo.innerHTML = ``;
        if (character == 'teacher') {
            SearchRef = db.collection("StudentInfo");
            SearchRef.where("Location", "==", Location).where("Target", 'in', Age[0]).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    SearchRef.doc(doc.id).get().then(doc => {
                        if (doc.data().Subjects[subject] == true) {
                            SearchedInfo.innerHTML += `
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title" style="font-weight: bold;margin-bottom:20px;">
                                        ` + doc.data().LastName + ` 同學
                                    </h4>
                                    <div class="row">
                                        <div class="col-6 col-sm-3"><p> ` + doc.data().Location[0] + ` ` + doc.data().Location[1] + ` </p></div>
                                        <div class="col-8 col-sm-3"><p>` + doc.data().SubjectsString + `</p></div>
                                        <div class="col-4 col-sm-3"><p>接受薪資：` + doc.data().Salary + `/hr</p></div>
                                        <div class="col-4 col-sm-3">
                                            <button type="button" class="btn btn-dark CaseBtn" data-toggle="modal" data-target="#modal` + doc.id + `">查看更多</button> 
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                            SearchedInfo.innerHTML += `
                            <div class="modal fade" id="modal` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
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
                                            <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="sendReq(this)">傳送邀請</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                            // document.querySelector('#' + doc.id).addEventListener('click', (e) =>{
                            //     e.preventDefault();
                            //     var CaseID = e.toElement.id;

                            //     console.log(CaseID);
                            //     SearchRef.doc(CaseID).get().then(doc => {
                            //         CaseDetail.innerHTML = `
                            //         <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">`+doc.data().LastName+` 同學</h4>
                            //         <p>科目：`+doc.data().SubjectsString+`</p><br>
                            //         <p>年紀：`+doc.data().Status+`</p><br>
                            //         <p>地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                            //         <p>意願薪資：`+doc.data().Salary+`</p><br>
                            //         <p>備註：`+doc.data().StatusInfo+`</p><br>
                            //         <p id = "CaseID" style = "display: none;">`+doc.id+`</p>
                            //         `;
                            //     })
                            // });
                        }
                    })
                });
            })
        } else {
            SearchRef = db.collection("TeacherResume");
            SearchRef.where("Location", "==", Location).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    SearchRef.doc(doc.id).get().then(doc => {
                        if (doc.data().Subjects[subject] == true) {
                            var find = 0;
                            for (i = 0; i < Age[0].length; i++) {
                                if (doc.data().Target[Age[0][i]] == true) find = 1;
                            }
                            if (find == 1) {
                                SearchedInfo.innerHTML += `
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title" style="font-weight: bold;margin-bottom:20px;">
                                            ` + doc.data().LastName + ` 老師
                                        </h4>
                                        <div class="row">
                                            <div class="col-6 col-sm-3"><p> ` + doc.data().Location[0] + ` ` + doc.data().Location[1] + ` </p></div>
                                            <div class="col-8 col-sm-3"><p>` + doc.data().SubjectsString + `</p></div>
                                            <div class="col-4 col-sm-3"><p>接受薪資：` + doc.data().Salary + `/hr</p></div>
                                            <div class="col-4 col-sm-3">
                                                <button type="button" class="btn btn-dark CaseBtn" data-toggle="modal" data-target="#modal` + doc.id + `">查看更多</button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                                SearchedInfo.innerHTML += `
                                <div class="modal fade" id="modal` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
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
                                                <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="sendReq(this)">傳送邀請</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                                // document.querySelector(`#`+ doc.id).addEventListener('click', (e) =>{
                                //     e.preventDefault();
                                //     var CaseID = e.toElement.id;
                                //     SearchRef.doc(CaseID).get().then(doc => {
                                //         CaseDetail.innerHTML = `
                                //             <h4 class="card-title" style="margin-bottom:40px;font-weight: bold;">`+doc.data().LastName+` 老師</h4>
                                //             <p>所教科目：`+doc.data().SubjectsString+`</p><br>
                                //             <p>老師身分：`+doc.data().Status+`</p><br>
                                //             <p>地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                                //             <p>意願薪資：`+doc.data().Salary+`</p><br>
                                //             <p>自我介紹：`+doc.data().Biography+`</p><br>
                                //             <p id = "CaseID" style = "display: none;">`+doc.id+`</p>
                                //         `;
                                //     })
                                // });
                            }
                        }
                    })
                });
            })
        }
    
        // const SendRequest = document.querySelectorAll("#SendRequest");
        // var i = 0; len = SendRequest.length;
        // console.log(SendRequest)
        // for(i; i<len; i++){
        //     SendRequest[i].addEventListener('click', (e) =>{
        //         alert("testing button" + i);
        //         var user = firebase.auth().currentUser;
        //         db.collection('users').doc(user.uid).get().then(doc => {
        //             var CaseID = e.target.parentElement.parentElement.parentElement.getAttribute('id');
        //             console.log(CaseID);
        //             // var CaseID = document.querySelector("#CaseID");
        //             // CaseID = CaseID.innerHTML;
        //             var Selected = doc.data().Selected; 
        //             if (Selected.length > 3) CaseDetail.innerHTML = `<p style = "color: red">您已經發超過三個試教邀請，請等待回復。<br>若三天內無回復，系統將自動刪除。</p>`;
        //             else { 
        //                 Selected.push(CaseID);
        //                 db.collection('users').doc(user.uid).set({
        //                     Selected: Selected
        //                 }, { merge: true });
        //                 var caseCollection = (user.character == 'teacher') ? 'StudentInfo' : 'TeacherReseume';
        //                 db.collection(caseCollection).doc(CaseID).get().then(doc => {
        //                     var BeingSelected = doc.data().BeingSelected + 1;
        //                     db.collection(caseCollection).doc(CaseID).set({
        //                         BeingSelected: BeingSelected
        //                     }, { merge: true });
        //                 });
        //                 db.collection('users').doc(CaseID).get().then(doc => {
        //                     var Selected = doc.data().Selected + 1;
        //                     Selected.push(user.uid);
        //                     db.collection('users').doc(CaseID).set({
        //                         Selected: Selected
        //                     }, { merge: true });
        //                 });
        //                 alert("試教邀請已送出");
        //             }
        //         });
        //     });
        // }
    })

    if (SearchedInfo.innerHTML == ``) SearchedInfo.innerHTML = `沒有此結果，換個條件試試看。`;
});


function sendReq(selectElm){
    var user = firebase.auth().currentUser;
    db.collection('users').doc(user.uid).get().then(doc => {
        var CaseID = selectElm.getAttribute('id');
        var Selected = doc.data().Selected;
        if (Selected.length == 3) 
            alert("您已經發了三個試教邀請，請等待回復。若三天內沒收到回復，系統將自動刪除邀請。")
        else { 
            // A: chooser, B: person being chosen
            // add B's id to users'(A) Selected
            Selected.push(CaseID);
            db.collection('users').doc(user.uid).set({
                Selected: Selected
            }, { merge: true });
            // B's BeingSelected += 1
            console.log(character)
            if(character == 'teacher'){
                db.collection('StudentInfo').doc(CaseID).get().then(doc => {
                    console.log(CaseID)
                    var beingSelected = doc.data().BeingSelected;
                    db.collection('StudentInfo').doc(CaseID).set({
                        BeingSelected: beingSelected + 1
                    }, { merge: true });
                });
            }
            else{
                db.collection('TeacherResume').doc(CaseID).get().then(doc => {
                    console.log(CaseID)
                    var beingSelected = doc.data().BeingSelected;
                    db.collection('TeacherResume').doc(CaseID).set({
                        BeingSelected: beingSelected + 1
                    }, { merge: true });
                });
            }
            // add A's id to users'(B) BeingSelected
            db.collection('users').doc(CaseID).get().then(doc => {
                var temp = doc.data().BeingSelected;
                temp.push(user.uid);
                db.collection('users').doc(CaseID).set({
                    BeingSelected: temp
                }, { merge: true });
            });
            setTimeout(function(){
                alert("試教邀請已送出");
            }, 800);
        }
    });
}