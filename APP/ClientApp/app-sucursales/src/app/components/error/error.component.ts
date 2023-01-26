import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service ';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
constructor(
  private spinnerService: SpinnerService
  ,private router: Router)
{

}

ngOnInit()
{
  this.spinnerService.show();
  this.spinnerService.hide();
}
  goToCreate() {
    this.spinnerService.show();
    this.router.navigate(['sucursal/list']);
  }

}
