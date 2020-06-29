// recommendation system
console.log("recommend");
window.setTimeout(function() {
    var user = firebase.auth().currentUser;
    var character;

    db.collection('users').doc(user.uid).get().then(doc => {
        // get user info
        character = doc.data().character;
        var SearchRef;
        var candidate = [];
        var display = [];
        const location= doc.data().Location;
        const age = doc.data().Target;
        const subject = doc.data().Subjects;

        var Age = [];
        for(let i = 0; i < age.length; i++){
            if(age[i]){
                Age.push(i);
            }
        }
        console.log("Get User");
        if(character == 'teacher'){
            SearchRef = db.collection("StudentInfo");

            candidate = [];
            SearchRef.where("Location", "==", location).where("Target", 'in', Age).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = false;
                    for(let i = 0; i < subject.length; i++){    
                        if(doc.data().Subjects[i] && subject[i]){
                            x = true;
                        }
                    }
                    if(x){
                        candidate.push(doc.id);
                    }
                })

                // randomly choose three students form candidate
                display = [];
                if(candidate.length > 3){
                    for(let i = 0; i < 3; i++){
                        let num;
                        do{
                            num = Math.floor(Math.random() * candidate.length);
                        }while(display.includes(num));
                        display.push(num);
                    }
                }
                else{
                    for(let i = 0; i < candidate.length; i++){
                        display.push(i);
                    }
                }

                console.log(candidate);
                console.log(display);

                var SearchedInfo = document.querySelector("#AdviceCard");;
                var AdviceModal = document.querySelector("#AdviceModal");
                SearchedInfo.innerHTML = ``;
                // show info of students in display
                for(let i = 0; i < 3; i++){
                    if (display[i]) {
                        SearchRef.doc(candidate[display[i]]).get().then(doc => {
                            SearchedInfo.innerHTML = `
                            <div class = "col-sm-12 col-md-4">
                                <div class="card" style="margin-bottom:50px;background: rgba(30, 48, 73, 0.656);color:white;">
                                    <div class="card-body">
                                        <h3 class="card-title">` + doc.data().LastName + ` 同學</h3>
                                        <p>科目：`+doc.data().SubjectsString+`</p><br>
                                        <p>年紀：`+doc.data().Status+`</p><br>
                                        <p>地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                                        <p>意願薪資：`+doc.data().Salary+`</p><br>
                                        <p>備註：`+doc.data().StatusInfo+`</p><br>
                                        <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="sendReq(this)">送出邀請</button>
                                        </div>
                                </div>
                            </div>
                            ` + SearchedInfo.innerHTML;
                        })
                    } else {
                        SearchedInfo = document.querySelector("." + cardClass);
                        SearchedInfo.innerHTML += `
                        <div class = "col-sm-12 col-md-4">
                            <div class="card" style="margin-bottom:50px;background: rgba(30, 48, 73, 0.656);color:white;">
                                <div class="card-body card-1">
                                    <h3 class="card-title"></h3>
                                    <p></p><br>
                                    <p></p><br>
                                    <p>請再稍後片刻，符合您的專屬配對即將登場！</p><br>
                                    <p></p><br>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        `;
                    }
                }
            })
        }
        else{
            SearchRef = db.collection("TeacherResume");

            candidate = [];
            SearchRef.where("Location", "==", location).where("Target", 'in', Age).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = false;
                    for(let i = 0; i < subject.length; i++){
                        if(doc.data().Subjects[i] && subject[i]){
                            x = true;
                        }
                    }
                    if(x){
                        candidate.push(doc.id);
                    }
                })

                //randomly choose three teachers form candidate
                display = []
                if(candidate.length > 3){
                    for(let i = 0; i < 3; i++){
                        let num;
                        do{
                            num = Math.floor(Math.random() * candidate);
                        }while(display.includes(num));
                        display.push(num);
                    }
                }
                else{
                    for(let i = 0; i < candidate.length; i++){
                        display.push(candidate[i]);
                    }
                }

                console.log(candidate);
                console.log(display);

                var SearchedInfo;

                // show info of teachers in display
                for(let i = 0; i < display.length; i++){
                    SearchRef.doc(display[i]).get().then(doc => {
                        var cardClass;
                        if(i == 0){
                            cardClass = "card-1";
                        }
                        else if(i == 1){
                            cardClass = "card-2";
                        }
                        else{
                            cardClass = "card-3";
                        }
    
                        SearchedInfo = document.querySelector("." + cardClass);
                        SearchedInfo.innerHTML = `
                        <h3 class="card-title">` + doc.data().LastName + ` 老師</h3>
                            <p>科目：` + doc.data().SubjectsString + `</p><br>
                            <p>地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                            <p>年紀：` + doc.data().Status + `</p><br>
                            <button type="button" class="btn btn-light" data-toggle="modal" data-target="#modal` + doc.id + `">查看更多</button>
                        `;
                        SearchedInfo.innerHTML += `
                        <div id="modal` + doc.id + `" tabindex="-1" role="dialog" aria-labelledby="checkmore" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content" style="color:black;">
                                    <div class="modal-header">
                                        <h2 class="modal-title" id="exampleModalLongTitle">專屬推薦</h2>
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
                    })
                }
            })
        }
    })
}, 2000);

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
            // console.log(character)
            if(character == 'teacher'){
                db.collection('StudentInfo').doc(CaseID).get().then(doc => {
                    // console.log(CaseID)
                    var beingSelected = doc.data().BeingSelected;
                    db.collection('StudentInfo').doc(CaseID).set({
                        BeingSelected: beingSelected + 1
                    }, { merge: true });
                });
            }
            else{
                db.collection('TeacherResume').doc(CaseID).get().then(doc => {
                    // console.log(CaseID)
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