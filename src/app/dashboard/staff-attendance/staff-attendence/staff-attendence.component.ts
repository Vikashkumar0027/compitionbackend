import { Component } from '@angular/core';
import { StaffService } from '../../../services/staff/staff.service';

@Component({
  selector: 'app-staff-attendence',
  templateUrl: './staff-attendence.component.html',
  styleUrl: './staff-attendence.component.css'
})
export class StaffAttendenceComponent {
  staffList: any[] = [];
  attendance: any[] = [];
  checkData: any;
  attendances: any = '';
  staffAttendancesList: any[] = [];
  constructor(private staffAttendance: StaffService) {

    this.staffAttendance.staffList().subscribe({
      next: ((res) => {
        if (res.success) {
          this.staffList = res.response;
          this.attendance = this.staffList.map(value => ({ ...value, attendance: "" }))
          console.log(this.attendance, "staff list");
        }

      }), error: ((error) => {
        console.error(error)
      })
    })



  }

  onSubmit() {

  }
  staffAttendances(event: any, staffId: any) {
    const presentStaff = this.attendance.filter(((x) => x._id == staffId))
    this.staffAttendancesList.push(presentStaff[0]);

    console.log("presentStaff", this.staffAttendancesList);
  }


  searchStaff() {

    console.log(this.staffAttendances, "hello");
  }





  // (method) Observable<any>.subscribe(next?: ((value: any) => void) | null | undefined, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription (+1 overload)





}
