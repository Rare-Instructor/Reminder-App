var database = firebase.database();

var account = database.ref('Accounts');
account.on("value", getData, errData);

//Listen for submit
document.getElementById('login-form').addEventListener('submit', loginForm);

//submit login-form
function loginForm(e){
    e.preventDefault();

    //Get values
    var loginName = getInput('login-name');
    var loginEmail = getInput('login-email');
    var loginPassword = getInput('login-password');
    
    saveAccount(loginName, loginEmail, loginPassword);
    
    //show alert
    document.querySelector('.alert').style.display = 'block';

    //hide alert
     setTimeout(()=>{
        document.querySelector('.alert').style.display = 'none';
     }),3000;

    //clear space
    document.getElementById('login-form').reset();

}

function getInput(id){
    return document.getElementById(id).value;
  }

function saveAccount(name, email, password){
    var newAccount = account.push();

    newAccount.set({
        loginName : name,
        loginEmail : email,
        loginPassword : password
    });
  
}

function getData(data){
    console.log("200 ok!");
}
function errData(err){
    console.log(err);
}


