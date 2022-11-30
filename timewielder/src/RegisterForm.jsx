import database from "./store.js";
function RegisterForm({isSubmitted, setIsSubmitted, registered, setRegister}) {
    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
  
      var { uname, pass } = document.forms[0];
      const userData = new Object((uname.value,pass.value));
      console.log(uname.value, pass.value); 
      database.push(userData);
  
      setRegister(!registered);
    };
  
    // JSX code for login form
    const renderForm = (
      <><h2>Enter a username and password to register</h2><div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div></>
    );
  
    return (
      <div className="register-form">
        {!isSubmitted && (
          <div className="title">
            {renderForm}
          </div>
        )}
      </div>
    );
  }

export default RegisterForm;