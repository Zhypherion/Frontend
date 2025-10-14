import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PositionService } from '@app/_services/position.service';
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
    this.departmentService.getAll().subscribe(depts => this.departments = depts);
  }

  submit() {
  if (this.form.valid) {
    const payload = { ...this.form.value };

    // 👇 ensure departmentId is numeric
    payload.departmentId = Number(payload.departmentId);

    this.positionService.create(payload).subscribe(() => {
      alert('Position created!');
      this.loadPositions();
      this.form.reset({ status: 'Active', hierarchyLevel: 'Worker' }); // optional reset
    });
  }
}


  loadPositions() {
    this.positionService.getAll().subscribe((p: any[]) => this.positions = p);
  }

  updateStatus(p: any) {
  const newStatus = p.status === 'Active' ? 'Inactive' : 'Active';
  this.positionService.update(p.id, { status: newStatus }).subscribe(() => {
    alert(`Status changed to ${newStatus}`);
    this.loadPositions();
  });
}

}
