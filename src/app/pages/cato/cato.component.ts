import { Component, inject } from '@angular/core';
import { Icato } from '../../core/interfaces/icato';
import { Subscription } from 'rxjs';
import { CatoService } from '../../core/services/cato/cato.service';

@Component({
  selector: 'app-cato',
  imports: [],
  templateUrl: './cato.component.html',
  styleUrl: './cato.component.scss'
})
export class CatoComponent {
    private readonly _Productcato = inject(CatoService);
    catodata!: Icato[];
    catoid!: Subscription;
    ngOnInit(): void {
      this.catoid = this._Productcato.getallcato().subscribe({
        next: (res) => {
          this.catodata = res.data;
          console.log(this.catodata);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  
    }
  
    ngOnDestroy(): void {
      this.catoid?.unsubscribe;
    }
}
