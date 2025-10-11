import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PositionService } from '../../_services/position.service';
import { DepartmentService } from '@app/_services/department.service';

@Component({
  selector: 'app-positions',
  templateUrl: './position.component.html'
})
export class PositionComponent implements OnInit {
  form!: FormGroup;
  positions: any[] = [];
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.loadPositions();
    this.departmentService.getAll().subscribe(d => this.departments = d);

    this.form = this.fb.group({
      name: ['', Validators.required],
      status: ['Active', Validators.required],
      hierarchyLevel: ['Worker', Validators.required],
      departmentId: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.positionService.create(this.form.value).subscribe(() => {
        alert('Position created!');
        this.loadPositions();
      });
    }
  }

  loadPositions() {
    this.positionService.getAll().subscribe((p: any[]) => this.positions = p);
  }
}
