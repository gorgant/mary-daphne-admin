import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { RootStoreState, UserStoreActions } from 'src/app/root-store';
import { NAME_FORM_VALIDATION_MESSAGES } from 'shared-models/forms-and-components/admin-validation-messages.model';
import { AdminUser } from 'shared-models/user/admin-user.model';

@Component({
  selector: 'app-edit-name-dialogue',
  templateUrl: './edit-name-dialogue.component.html',
  styleUrls: ['./edit-name-dialogue.component.scss']
})
export class EditNameDialogueComponent implements OnInit {

  nameForm: FormGroup;
  nameFormValidationMessages = NAME_FORM_VALIDATION_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditNameDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) private appUser: AdminUser,
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit() {
    this.nameForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.nameForm.patchValue({
      name: this.appUser.displayName
    });
  }

  onSave() {
    const updatedUser: AdminUser = {
      ...this.appUser,
      displayName: this.name.value
    };
    this.store$.dispatch(new UserStoreActions.StoreUserDataRequested({userData: updatedUser}));
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close(false);
  }

  // These getters are used for easy access in the HTML template
  get name() { return this.nameForm.get('name'); }

}