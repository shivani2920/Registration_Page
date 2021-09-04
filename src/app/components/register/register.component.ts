import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/service/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  board: any = [];
  medium: any = [];
  standard: any = [];
  confirmPassword: string = "";
  registerForm: FormGroup;
  constructor(private service: RegistrationService, private formBuilder: FormBuilder,) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      student_name: ['', Validators.required],
      board_id: ['', Validators.required],
      medium_id: ['', Validators.required],
      standard_id: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchPassword('password', 'confirmPassword') });

    this.service.getBoardList().subscribe(data => {

      this.board = data;
    });

  }

  matchPassword(psw, cpsw){

    return (control) => {
 
      const password = control.get(psw).value;
      const confirm = control.get(cpsw).value;
 
      if (password != confirm) { return { 'noMatch': true } }
 
      return null
 
    }
  }

  getMedium(id) {

    this.medium = [];
    this.standard = [];
    this.registerForm.value.medium_id = "";
    this.registerForm.value.standard_id = "";
    this.service.getMediumList(id).subscribe(data => {

      this.medium = data;
    });
  }

  getStandard(id) {

    this.standard = [];
    this.registerForm.value.standard_id = "";
    this.service.getStandardList(id).subscribe(data => {

      this.standard = data;
    });
  }

  submitStudentDetails() {
    const req = {
      "student_name": this.registerForm.value.student_name,
      "board_id": this.registerForm.value.board_id,
      "medium_id": this.registerForm.value.medium_id,
      "standard_id": this.registerForm.value.standard_id,
      "password": this.registerForm.value.password,
    };
    this.service.submitDetails(req).subscribe((resp) => { });
  }

  checkValidation() {

    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {

      alert("Password does not match");
    } else if (this.registerForm.invalid) {
      
      alert("Please fill all fields");
    } else {

      this.submitStudentDetails();
      alert("Student registerd successfully");
      this.registerForm.reset({
        "student_name": "",
        "board_id": "",
        "medium_id": "",
        "standard_id": "",
        "password": "",
      });
      return true;
    }

    return false;
  }
}

