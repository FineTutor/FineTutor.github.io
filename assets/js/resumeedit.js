// signup
const EditCVForm = document.querySelector("#EditCVForm");
EditCVForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    // get user info
    const lastname = EditCVForm['lastname'].value;
    const firstname = EditCVForm['firstname'].value;
    const Gender = EditCVForm['Gender'].value;
    const Status = EditCVForm['Status'].value;
    const county = document.querySelector("#Location").children.county;
    const district = document.querySelector("#Location").children.district;
    const target = document.querySelector("#Target").children;
    const subjects = document.querySelector("#Subjects").children;
    const Salary = EditCVForm['Salary'].value;
    const Biography = EditCVForm['Biography'].value;
    const Tel = EditCVForm['Tel'].value;
    const Line = EditCVForm['Line'].value;
    const AvailableTime = EditCVForm['AvailableTime'].value;

    var Location = [];
    var Target = [];
    var Subjects = [];
    var TargetString = ``;
    var SubjectsString = ``;
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
    for (i = 0; i < target.length; i++) {
        Target.push(target[i].children.interest.checked);
        if (target[i].children.interest.checked == true) {
            TargetString += target[i].innerText + ' / ';
        }
    }
    for (i = 0; i < subjects.length; i++) {
        Subjects.push(subjects[i].children.interest.checked);
        if (subjects[i].children.interest.checked == true) {
            SubjectsString += subjects[i].innerText  + ' / ';
        }
    }
    const CV = [lastname, firstname, Gender, Status, Location, Target, Subjects, Salary, Biography, Contact, TargetString, SubjectsString];
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
        Target: CV[5],
        Subjects: CV[6],
        Salary: CV[7],
        Biography: CV[8],
        Contact: CV[9],
        TargetString:CV[10],
        SubjectsString:CV[11], 
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
    db.collection('TeacherResume').doc(user.uid).set({
        uid: user.uid,
        LastName: CV[0],
        Gender: CV[2],
        Status: CV[3],
        Location: CV[4],
        Target: CV[5],
        Subjects: CV[6],
        Salary: CV[7],
        Biography: CV[8],
        TargetString:CV[10],
        SubjectsString:CV[11],
        BeingSelected: 0
    }).then(() => {
        // const modal = document.querySelector('#modal-signup');
        // M.Modal.getInstance(modal).close();
        EditCVForm.reset();
        location.replace("/resume.html");
    }).catch(err => {
        EditCVForm.querySelector('.error').innerHTML = err;
    })
});
