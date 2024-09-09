import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuevousuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './nuevousuario.component.html',
  styleUrl: './nuevousuario.component.scss'
})
export class NuevousuarioComponent {

}
