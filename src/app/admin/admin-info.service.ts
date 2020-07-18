import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminInfoService {

  adminName: string;
  theaterName: string;

  sysAdminName:string;

  constructor() { }
}
