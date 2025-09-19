import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '@app/_services/department.service';
import { Department } from '@app/_models/department';

@Component({
  templateUrl: 'department.component.html'
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll()
      .subscribe(departments => this.departments = departments);
  }

  deleteDepartment(id: string) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.delete(id)
        .subscribe(() => this.departments = this.departments.filter(x => x.id !== id));
    }
  }
}
