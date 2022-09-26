import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

    errormsg:any;
    successmsg:any;
  ngOnInit(): void {
  }

    expenseForm = new FormGroup({
      'item_name':new FormControl('', Validators.required),
      'date':new FormControl('',Validators.required),
      'amount':new FormControl('',Validators.required)

    });

    expenseSubmit()
    {
        if(this.expenseForm.valid)
        {
          console.log(this.expenseForm.value);
          this.service.createData(this.expenseForm.value).subscribe((res)=>{
            console.log(res,'res==>')
            this.expenseForm.reset();
            this.successmsg = res.message;
          })
        }
        else 
        {
          this.errormsg = 'all field is required!';
        }

    }
}
