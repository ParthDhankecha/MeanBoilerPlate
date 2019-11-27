import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSelectModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule
} from "@angular/material";

const material = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSelectModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, material],
  exports: [material]
})
export class SharedModule {}
