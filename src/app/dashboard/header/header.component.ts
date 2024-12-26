import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggled = new EventEmitter<boolean>();
  menuStatus:boolean=false;
  userName: any;
  data:any={};

  constructor(
    private commonService:CommonService,
    private route:Router,
    private profileService:ProfileService
  ) { }

  ngOnInit(): void {
    
    this.profileService.profile.subscribe(res=>{
      this.data=res;
      console.log('profile details:',this.data);
    })
    this.getDecodedToken();
    this.showData();

  }

  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sidenavToggled.emit(this.menuStatus);
  }

  async getDecodedToken(){
    const tokens:any = await this.commonService.jwtToken();
    this.userName = tokens.admin.name;
  }
  
  logOut(){
    localStorage.removeItem('compytkns');
    this.route.navigate(['']);
  }

  async showData(){
    
    const jwt:any = await this.commonService.jwtToken();
          const data1 = jwt.admin.id;
  
  
    // this.profileService.showProfile(data1).subscribe(res => {
   
    //  if(res.success == true){
    //   // this.data = res.data
    //   this.profileService.getUpdateprofile(res.data);
    //  }
  
    // },
    // (err)=>{

    //   console.log('Error in Profile Api ShowList',err);
    // }
    // )
   }
   onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sucessKey-logo.jpg';
  }
}
