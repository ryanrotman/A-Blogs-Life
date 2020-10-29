$(document).ready(function() {
    $('.sidenav').sidenav(); // Materialize functionality for sidenav

    // Getting references to our form and input
    let signUpForm = $("form.signup");
    let emailInput = $("input#email-input");
    let passwordInput = $("input#password-input");
  
    // When the signup button is clicked... 
    signUpForm.on("submit", (event) => {
      event.preventDefault();
      
      const userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      // Email and password are validated to not be blank
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the dashboard page
    // Otherwise we log any errors
    function signUpUser(email, password) {
      $.post("/api/signup", {
        email: email,
        password: password
      })
        .then(function(data) {
          window.location.replace("/dashboard");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });