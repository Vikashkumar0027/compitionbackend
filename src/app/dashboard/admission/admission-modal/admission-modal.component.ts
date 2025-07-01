import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../../services/global/global.service';
import { AdmissionService } from '../../../services/admission/admission.service';
import { ClassService } from '../../../services/class/class.service';


@Component({
  selector: 'app-admission-modal',
  templateUrl: './admission-modal.component.html',
  styleUrl: './admission-modal.component.css'
})
export class AdmissionModalComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  @Input() public user: any;
  @Input() public patchData: any;
  @Input() public admissionId: any;
  @Input() public totalClasses: any;


  constructor(private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private global: GlobalService,
    private admissionService: AdmissionService,
    private classServive: ClassService
  ) {

    this.form = this.fb.group({

      classId: ['', Validators.required],
      admissionFee: [''],
      rollNo: [''],
      section: [''],
      studentName: ['', Validators.required],
      dob: ['', Validators.required],
      // admissionDate: ['', Validators.required],
      admissionDate: [new Date().toISOString().split('T')[0]],
      gender: ['', Validators.required],
      category: ['', Validators.required],
      studentMobile: [''],
      address: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      pinCode: ['', Validators.required],
      transport: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      localGardianName: [''],
      parentAddress: [''],
      parentNumber: ['', Validators.required],
      relationStudents: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      withdrawalFileNumber: [''],
      scholarRegistrationNo: [''],
      lastSchoolName: [''],

    });

  }


  ngOnInit(): void {
    this.patchDataFunction()
    if (this.user == 'Edit') {
      this.getclass();
    }

  }
  get f() {
    return this.form.controls;
  }

  modalClose() {
    this.activeModal.close();
  }

  onSubmit() {
    this.submitted = true;
    this.user == "Add" ? this.addData() : this.editData();
  }

  addData() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }

    this.submitted = false;
    let formData: any = new FormData();

    Object.keys(this.form.value).forEach((key) => {
      if (this.form.value[key]) {
        formData.append(key, this.form.value[key]);
      }
    }

    );
    formData.append("studentImage", this.file);


    if (formData) {
      this.admissionService.AdmissionPost(formData).subscribe((res) => {
        if (res.success) {
          console.log(formData.value, "response value");
          this.global.showToast(res.response);
          this.activeModal.close('Add');
        }
      }, error => {
        console.log(error);
      })
    }
  }

  private file: any;
  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(event.target.files[0]);
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
  }



  patchDataFunction() {
    if (this.user == 'Edit') {
      this.getclass();
      if (this.patchData) {
        Object.keys(this.patchData).forEach((key) => {
          if (this.form.controls[key]) {
            this.form.controls[key].setValue(this.patchData[key]);
          }
        });
      }

    }
  }



  // editData() {
  //   if (this.form.invalid) {
  //     return;
  //   }

  //   let formData: any = new FormData();

  //   Object.keys(this.form.value).forEach((key) => {
  //     if (this.form.value[key]) {
  //       formData.append(key, this.form.value[key]);
  //     }
  //   }
  //   );

  //   (this.file == undefined) ? formData.append('studentImage', this.patchData.studentImage) : formData.append('studentImage', this.file);



  //   this.admissionService.AdmissionUpdate(this.admissionId, formData).subscribe((res) => {
  //     if (res.success) {
  //       this.global.showToast(res.response);
  //       this.activeModal.close('Edit');
  //     }

  //   }, error => {
  //     console.log(error);
  //   })


  // }

  editData() {
    if (this.form.invalid) {
      return;
    }

    let formData: any = new FormData();

    Object.keys(this.form.value).forEach((key) => {
      let value = this.form.value[key];

      // Check if classId is an object, then send only its _id
      if (key === "classId" && typeof value === "object" && value?._id) {
        formData.append(key, value._id);
      } else if (value) {
        formData.append(key, value);
      }
    });

    (this.file == undefined)
      ? formData.append('studentImage', this.patchData.studentImage)
      : formData.append('studentImage', this.file);

    this.admissionService.AdmissionUpdate(this.admissionId, formData).subscribe(
      (res) => {
        if (res.success) {
          this.global.showToast(res.response);
          this.activeModal.close('Edit');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



  getclass() {

    this.classServive.classlist().subscribe((res) => {
      if (res.success) {
        this.totalClasses = res.response;
        console.log(this.totalClasses, "totals class");
      }

      console.log(res.data, "response data class list");
    }, (error) => {
      console.log(error, "data is not patch ");
      return null
    })


  }


}
