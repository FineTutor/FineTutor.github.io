

// listen for auth status changes
auth.onAuthStateChanged(user =>{
    if(user){
        //console.log('user logged in: ', user);
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        })
        // get data
        // db.collection('users').onSnapshot(snapshot => {
        //     setupFeeds(snapshot.docs);
        // }, err => {
        //     console.log(err.message)
        // })
    } else { 
        //console.log('user logged out.');
        setupUI();
        // setupFeeds([]);
    }
})

// var user = firebase.auth().currentUser;

// if (user) {
//     user.getIdTokenResult().then(idTokenResult => {
//         user.admin = idTokenResult.claims.admin;
//         setupUI(user);
//     })
//     // get data
//     db.collection('feeds').onSnapshot(snapshot => {
//         setupFeeds(snapshot.docs);
//     }, err => {
//         console.log(err.message)
//     })
// } else {
//     setupUI();
//     setupFeeds([]);
// }


// create new guides
// const createForm = document.querySelector('#create-form');
// createForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     db.collection('guides').add({
//         title: createForm['title'].value,
//         content: createForm['content'].value
//     }).then(() => {
//         // close modal and reset form
//         const modal = document.querySelector('#modal-create');
//         M.Modal.getInstance(modal).close();
//         createForm.reset();
//     }).catch(err => {
//         console.log(err.message);
//     })
// })


//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    console.log('signout')
    location.replace("/")
});

const logout2 = document.querySelector('#logout2');
logout2.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    console.log('signout')
    location.replace("/")
});


// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    var character = signupForm['teacher'].checked;
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            user: signupForm['signup-name'].value,
            character: signupForm['teacher'].checked ? 'teacher' : 'student'
        });
    }).then(() => {
        // const modal = document.querySelector('#modal-signup');
        // M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
        character ? location.replace("/resumeedit.html") : location.replace("/studentinfoedit.html")
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred.user);
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
        db.collection('users').doc(cred.user.uid).get().then(doc => {
            location.replace(`/` + doc.data().character + `.html`);
        })
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
})

// add admin
// const adminForm = document.querySelector('.admin-actions');
// adminForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const adminEmail = document.querySelector('#admin-email').value;
//   const addAdminRole = functions.httpsCallable('addAdminRole');
//   addAdminRole({ email: adminEmail }).then(result => {
//     console.log(result);
//   });
// });