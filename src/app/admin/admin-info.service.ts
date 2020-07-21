import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminInfoService {

  adminName: string;
  theaterName: string;
  theaterID: string;
  adminID: string;

  sysAdminName:string;
  sysAdminID: string;

  constructor() { }
}
