// signup
const EditCVForm = document.querySelector("#EditCVForm");
EditCVForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    // get user info
    const lastname = EditCVForm['lastname'].value;
    const firstname = EditCVForm['firstname'].value;
    const Gender = EditCVForm['Gender'].value;
    const Status = EditCVForm['Status'].value;
    const StatusInfo = EditCVForm['StatusInfo'].value;
    const county = document.querySelector("#Location").children.county;
    const district = document.querySelector("#Location").children.district;
    const subjects = document.querySelector("#Subjects").children;
    const Salary = EditCVForm['Salary'].value;
    const Tel = EditCVForm['Tel'].value;
    const Line = EditCVForm['Line'].value;
    const AvailableTime = EditCVForm['AvailableTime'].value;
    const Biography = EditCVForm['Biography'].value;

    var Location = [];
    var Subjects = [];
    var SubjectsString = ``;
    var Target;
    var Contact = {
        Tel: Tel, 
        Line: Line, 
        AvailableTime: AvailableTime
    };
    
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
    for (i = 0; i < subjects.length; i++) {
        Subjects.push(subjects[i].children.interest.checked);
        if (subjects[i].children.interest.checked == true) {
            SubjectsString += subjects[i].innerText  + ' / ';
        }
    }

    if ((Status == '幼稚園')||(Status == '小一')||(Status == '小二')||(Status == '小三')||(Status == '小四')||(Status == '小五')||(Status == '小六')) {
        Target = 0;
    } else if ((Status == '國一')||(Status == '國二')||(Status == '國三')) {
        Target = 1;
    } else if (Status == '高一') {
        Target = 2;
    } else if (Status == '高二') {
        Target = 3;
    } else if (Status == '高三') {
        Target = 4;
    } else if (Status == '大一') {
        Target = 5;
    } else if (Status == '大二') {
        Target = 6;
    } else if (Status == '大三') {
        Target = 7;
    } else if (Status == '大四') {
        Target = 8;
    } else if (Status == '社會人士') {
        Target = 9;
    }  


    const CV = [lastname, firstname, Gender, Status, Location, StatusInfo, Subjects, Salary, Biography, Contact, SubjectsString, Target];
    // console.log(CV[2]);
    var user = firebase.auth().currentUser;
    // sign up the user
    db.collection('users').doc(user.uid).set({
        user: CV[0] + CV[1],
        LastName: CV[0],
        FirstName: CV[1],
        Gender: CV[2],
        Status: CV[3],
        Location: CV[4],
        StatusInfo: CV[5],
        Subjects: CV[6],
        Salary: CV[7],
        Biography: CV[8],
        Contact: CV[9],
        SubjectsString:CV[10], 
        Target: CV[11],
        Selected: [],
        BeingSelected: [],
        Success: [],
    }, { merge: true }).then(() => {
        // const modal = document.querySelector('#modal-signup');
        // M.Modal.getInstance(modal).close();
        EditCVForm.reset();
    }).catch(err => {
        EditCVForm.querySelector('.error').innerHTML = err;
    })
    db.collection('StudentInfo').doc(user.uid).set({
        uid: user.uid,
        LastName: CV[0],
        Gender: CV[2],
        Location: CV[4],
        Status: CV[3],
        StatusInfo: CV[5],
        Subjects: CV[6],
        Salary: CV[7],
        SubjectsString:CV[10],
        Target: CV[11],
        BeingSelected: 0
    }).then(() => {
        // const modal = document.querySelector('#modal-signup');
        // M.Modal.getInstance(modal).close();
        EditCVForm.reset();
        location.replace("/studentinfo.html");
    }).catch(err => {
        EditCVForm.querySelector('.error').innerHTML = err;
    })
});
