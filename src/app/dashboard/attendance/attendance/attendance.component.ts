import { Component, OnInit } from '@angular/core';
import { AdmissionService } from '../../../services/admission/admission.service';
import { AttendanceService } from '../../../services/attendance/attendance.service';
import { GlobalService } from '../../../services/global/global.service';
import { ClassService } from '../../../services/class/class.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  attendanceData: any;
  formData: any;
  isChecked: boolean = false;
  totalAttendance: any[] = [];
  totalClasses: any;
  AdmissionData: any[] = [];
  atdDatails: any;
  attendance: any = '';
  date: any;

  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  constructor(
    private attendanceService: AttendanceService,
    private globalService: GlobalService,
    private classService: ClassService,
    private admissionService: AdmissionService
  ) {
    const formData = { "className": "", "name": "", "rollNo": "", "uniqueId": "", "FatherName": "", "MobileNo": "", "section": "" };
    this.getStudent(formData);
    this.studentList();
    this.getAttendanceData();

    this.date = new Date();
    console.log('Date:-', this.date);
  }


  ngOnInit(): void {
    // function getTimestampForToday() {
    //   const today = new Date(); // Get today's date and time

    //   // Format the date as "DD/MM/YYYY"
    //   const day = String(today.getDate()).padStart(2, '0');
    //   const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    //   const year = today.getFullYear();
    //   const formattedDate = `${day}/${month}/${year}`;

    //   // Create a new Date object with the time set to 00:00:00
    //   const dateWithZeroTime = new Date(year, today.getMonth(), today.getDate());

    //   // Get the timestamp (milliseconds since epoch)
    //   const timestamp = dateWithZeroTime.getTime();

    //   return {
    //     formattedDate: formattedDate,
    //     timestamp: timestamp,
    //   };
    // }

    // const result = getTimestampForToday();
    // console.log("Formatted Date:", result.formattedDate);
    // console.log("Timestamp:", result.timestamp);
  }

  // search student list
  getStudent(formData: any) {
    console.log(formData.value)
    this.admissionService.AdmissionList(formData.value).subscribe(res => {
      this.AdmissionData = res.response;
      this.AdmissionData = this.AdmissionData.map((x: any) => ({ ...x, attendance: '' }))
      console.log('AdmissionData:-', this.AdmissionData);

    })
  }



  // Student list
  studentList() {
    this.classService.classlist().subscribe((res) => {
      if (res.success) {
        this.totalClasses = res.response;
        console.log("Total class:-", this.totalClasses);
      }
      console.log("Response class list:-", res.data);
    }, (err) => {
      console.log(err);
      return null;
    })

  }

  studentAttendance(event: any, id: any) {
    console.log(event, id);
  }

  allPresent(event: any) {
    this.isChecked = event.target.checked;
    console.log('Checkbox changed:', this.isChecked);
    if (this.isChecked) {
      this.AdmissionData = this.AdmissionData.map((x: any) => ({ ...x, attendance: 'Present' }));
      console.log('PresentData:-', this.AdmissionData);

    } else {
      this.AdmissionData = this.AdmissionData.map((x: any) => ({ ...x, attendance: '' }));

    }

  }

  newdata = [
    {
      "userId": "67b59fed8b87403c4d365172", "name": "test", "class": "10", "section": "A", "uniqueId": "12356", "year": "2024", "month": "2024",
      "attendance": [
        { "date": "01", "dateTimestamp": 1740767400, "status": "present", "entryTime": "02:30" }, { "date": "02", "dateTimestamp": 1740853800, "status": "absent", "entryTime": "02:30" }, { "date": "03", "dateTimestamp": 1740940200, "status": "absent", "entryTime": "02:30" }, { "date": "04", "dateTimestamp": 1741026600, "status": "absent", "entryTime": "02:30" }, { "date": "15", "dateTimestamp": 1741977000, "status": "absent", "entryTime": "02:30" }, { "date": "20", "dateTimestamp": 1742409000, "status": "absent", "entryTime": "02:30" }, { "date": "25", "dateTimestamp": 1742841000, "status": "absent", "entryTime": "02:30" }, { "date": "30", "dateTimestamp": 1743273000, "status": "absent", "entryTime": "02:30" }, { "date": "31", "dateTimestamp": 1743359400, "status": "absent", "entryTime": "02:30" }]
    }
  ]

  onSubmit() {
    const data = this.AdmissionData.map(x => {
      const studentAtd =
      {
        'userId': x._id,
        'name': x.studentName,
        'class': x.classId.className,
        'uniqueId': x.uniqueId,
        'year': this.date.getFullYear(),
        // 'month': this.month[this.date.getMonth()],
        'month': String(this.date.getMonth() + 1).padStart(2, '0'),
        "attendance": [
          {
            'date': String(this.date.getDate()).padStart(2, '0'),
            'dateTimeStamp': new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()).getTime(),
            'status': x.attendance, 'entryTime': this.date.toLocaleTimeString()
          }
        ]
      }
      return studentAtd;
    })
    console.log('Data:-', data);

    // this.attendanceService.attendanceAdd(data).subscribe(res => {
    //   console.log('Attendance:-', res);
    //   this.globalService.showToast(res.response);
    // }, err => {
    //   console.log(err);
    // })
  }

  getAttendanceData() {
    this.attendanceService.attendanceList().subscribe(res => {
      this.totalAttendance = res.response;
    }, err => {
      console.log(err);
    })
  }


}
