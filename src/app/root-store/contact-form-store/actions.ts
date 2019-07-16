import { Action } from '@ngrx/store';
import { ContactForm } from 'src/app/core/models/user/contact-form.model';

export enum ActionTypes {
  SINGLE_CONTACT_FORM_REQUESTED = '[ContactForms] Single ContactForm Requested',
  SINGLE_CONTACT_FORM_LOADED = '[ContactForms] Single ContactForm Loaded',
  ALL_CONTACT_FORMS_REQUESTED = '[ContactForms] All ContactForms Requested',
  ALL_CONTACT_FORMS_LOADED = '[ContactForms] All ContactForms Loaded',
  SUBSCRIBER_CONTACT_FORMS_REQUESTED = '[ContactForms] Subscriber Contact Forms Requested',
  SUBSCRIBER_CONTACT_FORMS_LOADED = '[ContactForms] Subscriber Contact Forms Loaded',
  RESET_SUBSCRIBER_CONTACT_FORMS_STATUS = '[ContactForms] Reset Subscriber Contact Forms Status',
  LOAD_FAILURE = '[ContactForms] Load Failure',
}

export class SingleContactFormRequested implements Action {
  readonly type = ActionTypes.SINGLE_CONTACT_FORM_REQUESTED;
  constructor(public payload: { contactFormId: string }) {}
}

export class SingleContactFormLoaded implements Action {
  readonly type = ActionTypes.SINGLE_CONTACT_FORM_LOADED;
  constructor(public payload: { contactForm: ContactForm }) {}
}

export class AllContactFormsRequested implements Action {
  readonly type = ActionTypes.ALL_CONTACT_FORMS_REQUESTED;
}

export class AllContactFormsLoaded implements Action {
  readonly type = ActionTypes.ALL_CONTACT_FORMS_LOADED;
  constructor(public payload: { contactForms: ContactForm[] }) {}
}

export class SubscriberContactFormsRequested implements Action {
  readonly type = ActionTypes.SUBSCRIBER_CONTACT_FORMS_REQUESTED;
  constructor(public payload: { subscriberId: string }) {}
}

export class SubscriberContactFormsLoaded implements Action {
  readonly type = ActionTypes.SUBSCRIBER_CONTACT_FORMS_LOADED;
  constructor(public payload: { contactForms: ContactForm[] }) {}
}

export class ResetSubscriberContactFormsStatus implements Action {
  readonly type = ActionTypes.RESET_SUBSCRIBER_CONTACT_FORMS_STATUS;
}

export class LoadErrorDetected implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  SingleContactFormRequested |
  SingleContactFormLoaded |
  AllContactFormsRequested |
  AllContactFormsLoaded |
  SubscriberContactFormsRequested |
  SubscriberContactFormsLoaded |
  ResetSubscriberContactFormsStatus |
  LoadErrorDetected
  ;
