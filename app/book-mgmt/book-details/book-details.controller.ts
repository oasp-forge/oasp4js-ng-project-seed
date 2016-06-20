import BookService from '../book.service';

export default class BookDetailsCtrl {
  bookForm:any;

  private static createErrorMessage(errorObject:any):string {
    var errorCode;
    if (errorObject) {
      for (errorCode in errorObject) {
        if (errorObject.hasOwnProperty(errorCode)) {
          switch (errorCode) {
            case 'required':
              return 'Please provide a value';
            case 'maxlength':
              return 'The value is too long';
            default:
              return 'The value is wrong';
          }
        }
      }
    }
  };

  /* @ngInject */
  constructor(private currentBook:any, private bookService:BookService, private $state:ng.ui.IStateService) {
  }

  getErrorMessageOfField(field:any):string {
    let
      errors = field && field.$error,
      fieldIsInvalid = field && field.$invalid,
      formIsSubmitted = this.bookForm && this.bookForm.$submitted;

    if (fieldIsInvalid && (field.$touched || formIsSubmitted)) {
      return BookDetailsCtrl.createErrorMessage(errors);
    }
  }

  save():void {
    var formIsValid = this.bookForm && this.bookForm.$valid;
    if (formIsValid) {
      this.bookService.save(this.currentBook);
      this.$state.go('book-overview');
    }
  };
}
