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
        if (character == "teacher") {
            for(let i = 0; i < age.length; i++){
                if(age[i]){
                    Age.push(i);
                }
            }
        } else {
            Age = age;
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

                var SearchedInfo = document.querySelector("#AdviceCard");;
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
                                        <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="sendReq(this)">馬上送出試教邀請</button>
                                        </div>
                                </div>
                            </div>
                            ` + SearchedInfo.innerHTML;
                        })
                    } else {
                        SearchedInfo.innerHTML += `
                        <div class = "col-sm-12 col-md-4">
                            <div class="card" style="margin-bottom:50px;background: rgba(30, 48, 73, 0.656);color:white;">
                                <div class="card-body card-1">
                                    <h3 class="card-title"></h3>
                                    <p></p><br>
                                    <p></p><br>
                                    <p>放寬限制，會有更多試教配對哦</p><br>
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
            SearchRef.where("Location", "==", location).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = false;
                    for(let i = 0; i < subject.length; i++){
                        if(doc.data().Subjects[i] && subject[i]){
                            x = true;
                        }
                    }
                    if (!doc.data().Target[Age]) x = false;
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
                            num = Math.floor(Math.random() * candidate.length);
                        }while(display.includes(num));
                        display.push(num);
                    }
                }
                else{
                    for(let i = 0; i < candidate.length; i++){
                        display.push(candidate[i]);
                    }
                }

                var SearchedInfo = document.querySelector("#AdviceCard");;
                SearchedInfo.innerHTML = ``;
                // show info of students in display
                for(let i = 0; i < 3; i++){
                    if (display[i]) {
                        SearchRef.doc(candidate[display[i]]).get().then(doc => {
                            SearchedInfo.innerHTML = `
                            <div class = "col-sm-12 col-md-4">
                                <div class="card" style="margin-bottom:50px;background: rgba(30, 48, 73, 0.656);color:white;">
                                    <div class="card-body">
                                        <h3 class="card-title">` + doc.data().LastName + ` 老師</h3>
                                        <p>所教科目：`+doc.data().SubjectsString+`</p><br>
                                        <p>學籍/身分：`+doc.data().Status+`</p><br>
                                        <p>授課地點：` + doc.data().Location[0] + ` ` + doc.data().Location[1] + `</p><br>
                                        <p>意願薪資：`+doc.data().Salary+`</p><br>
                                        <p>自我介紹：`+doc.data().Biography+`</p><br>
                                        <button type="button" class="btn btn-dark" id="` + doc.id + `" onclick="sendReq(this)">馬上送出試教邀請</button>
                                        </div>
                                </div>
                            </div>
                            ` + SearchedInfo.innerHTML;
                        })
                    } else {
                        SearchedInfo.innerHTML += `
                        <div class = "col-sm-12 col-md-4">
                            <div class="card" style="margin-bottom:50px;background: rgba(30, 48, 73, 0.656);color:white;">
                                <div class="card-body card-1">
                                    <h3 class="card-title"></h3>
                                    <p></p><br>
                                    <p></p><br>
                                    <p>放寬限制，會有更多試教配對哦</p><br>
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
    })
}, 2000);

function sendReq(selectElm){
    var user = firebase.auth().currentUser;
    db.collection('users').doc(user.uid).get().then(doc => {
        var CaseID = selectElm.getAttribute('id');
        var Selected = doc.data().Selected; 
        var character = doc.data().character;
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