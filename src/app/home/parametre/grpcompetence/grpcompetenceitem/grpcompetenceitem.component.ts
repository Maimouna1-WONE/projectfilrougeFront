import {Component, Input, OnInit} from '@angular/core';
import {Groupecompetence} from '../../../../models/groupecompetence';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import Swal from 'sweetalert2';
import {Competence} from '../../../../models/competence';

@Component({
  selector: 'app-grpcompetenceitem',
  templateUrl: './grpcompetenceitem.component.html',
  styleUrls: ['./grpcompetenceitem.component.css']
})
export class GrpcompetenceitemComponent implements OnInit {
@Input() grpcmp: Groupecompetence;
comp: Competence;
  constructor(private grpcompservice: GroupecompetenceService) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  deleteGrpComp(grpcmp: Groupecompetence){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.grpcompservice.deleteOnegrpcomp(grpcmp.id).subscribe();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
}
