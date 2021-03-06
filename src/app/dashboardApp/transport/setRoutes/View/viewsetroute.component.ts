import { Component,OnInit} from '@angular/core';
import { SharedService } from '../../../../utilityApp/services/shared.service';
import { Setroute } from '../setroute';
import { RouteService } from '../route.service';
import {ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router }            from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'viewsetroute',
  templateUrl: './viewsetroute.component.html'

})
export class ViewSetRouteComponent implements OnInit {
  //title = 'app works!';
  setroute:Setroute;
  myForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private routeService:RouteService,
              private router: Router) { }
  ngOnInit():void {


    this.route.paramMap
      .switchMap((params: ParamMap) => this.routeService.getSetroute(+params.get('id')))
      .subscribe(setroute => {this.setroute = setroute; });


  }





}
