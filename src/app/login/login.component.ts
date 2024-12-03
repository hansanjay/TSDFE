import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DOCUMENT } from '@angular/common';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userData: any;

  constructor(private authService: AuthService, private router: Router , private registerService:RegisterService,
    private toastr:ToastrService
  ) {


    
  }

  
 showError(element:any, message:any) {
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.textContent = message;
    element.parentElement.appendChild(errorSpan);
  }
  
 clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => error.remove());
  }
  
  async handleLogin() {
    this.clearErrors();
  
    // const username = document.getElementById("user").value;
    const username = '';
    const password = '';
    const rememberMe = '';
  
    let valid = true;
  
    if (!username) {
      this.showError(document.getElementById("user"), "Username is required");
      valid = false;
    }
  
    if (!password) {
      this.showError(document.getElementById("pass"), "Password is required");
      valid = false;
    }
  
    if (!valid) {
      return;
    }
  
    if (rememberMe) {
      localStorage.setItem("rememberedUsername", username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Logged in successfully");
      } else {
        this.showError(document.getElementById("pass"), result.message);
      }
    } catch (error) {
      this.showError(
        document.getElementById("pass"),
        "Login failed. Please try again."
      );
    }
  }
  
 loginObj = 
  {
    "username": "",
    "password": "",
    "role": "",
    "mobile": "",
    "otp": "",
    "email": ""
  }
 

  onLogin() {
    this.loginObj['mobile']=this.email;
  this.registerService.login(this.loginObj).subscribe(
    (loginData:any)=>{
      this.userData = loginData.data;
      localStorage.setItem('user',JSON.stringify(this.userData))
      if(loginData.success==true){
      setTimeout(() => {
        this.router.navigate(['/dashboard']) 
      }, 500);
    }
    else{
      this.toastr.clear();
      this.toastr.error(loginData.message)
    }
      // if(this.userData.role=="1"){
      //   this.router.navigate(['/Distributor'])
      // }
      // else if(this.userData.role=="2"){
      //   this.router.navigate(['/customersList/customer'])
      // }
      // else if(this.userData.role=="3"){
      //   this.router.navigate(['/customersList/agent'])
      // }
    }
  )
    // if (this.authService.login(this.email, this.password)) {

    //   this.router.navigate(['/dashboard']); // Redirect to dashboard or home page
    // } else {
    //   this.errorMessage = 'Invalid email or password';
    // }
  }

 checkPasswordStrength(password:any) {
    const strengthIndicator = document.getElementById("passwordStrength");
    this.updatePasswordStrength(password, strengthIndicator);
  }
  
checkPasswordStrengthRegister(password:any) {
    const strengthIndicator = document.getElementById("passwordStrengthRegister");
    this.updatePasswordStrength(password, strengthIndicator);
  }
  
  updatePasswordStrength(password:any, strengthIndicator:any) {
    // Reset indicator
    strengthIndicator.textContent = "";
  
    // Define criteria
    const minLength = 8;
    const minUpper = 1;
    const minLower = 1;
    const minNumbers = 1;
    const minSpecial = 1;
  
    let strength = 0;
  
    // Check length
    if (password.length >= minLength) {
      strength++;
    }
  
    // Check uppercase letters
    if (/[A-Z]/.test(password) && password.match(/[A-Z]/g).length >= minUpper) {
      strength++;
    }
  
    // Check lowercase letters
    if (/[a-z]/.test(password) && password.match(/[a-z]/g).length >= minLower) {
      strength++;
    }
  
    // Check numbers
    if (/\d/.test(password) && password.match(/\d/g).length >= minNumbers) {
      strength++;
    }
  
    // Check special characters
    if (
      /[^a-zA-Z0-9]/.test(password) &&
      password.match(/[^a-zA-Z0-9]/g).length >= minSpecial
    ) {
      strength++;
    }
  
    // Update strength indicator
    switch (strength) {
      case 0:
      case 1:
        strengthIndicator.textContent = "Weak";
        strengthIndicator.style.color = "red";
        break;
      case 2:
      case 3:
        strengthIndicator.textContent = "Medium";
        strengthIndicator.style.color = "orange";
        break;
      case 4:
      case 5:
        strengthIndicator.textContent = "Strong";
        strengthIndicator.style.color = "green";
        break;
      default:
        break;
    }
  }

 
  

  
}
