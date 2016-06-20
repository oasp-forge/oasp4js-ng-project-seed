import 'angular';
import BookService from '../book.service';

describe('BookDetailsCtrl', function () {
  var
    bookDetailsCtrl, currentBook,
    $stateMock = {
      go: angular.noop
    };

  beforeEach(angular.mock.module('book-mgmt'));

  beforeEach(inject(function ($controller:any, $rootScope:any) {
    currentBook = {
      author: 'John Smith',
      title: 'AngularJS in a nutshell'
    };
    bookDetailsCtrl = $controller('BookDetailsCtrl as bookDetailsCtrl', {
      $scope: $rootScope.$new(),
      currentBook: currentBook,
      $state: $stateMock
    });
  }));

  it('exposes person details', function () {
    expect(bookDetailsCtrl.currentBook).toBeDefined();
  });

  it('gets an error message for an invalid and touched field', function () {
    // given
    var
      errorMessage,
      field = {
        $invalid: true,
        $touched: true,
        $error: {
          required: true
        }
      };
    // when
    errorMessage = bookDetailsCtrl.getErrorMessageOfField(field);
    // then
    expect(errorMessage).toEqual('Please provide a value');
  });

  it('gets an error message for an invalid field when a form is submitted', function () {
    // given
    var
      errorMessage,
      field = {
        $invalid: true,
        $touched: false,
        $error: {
          required: true
        }
      };
    bookDetailsCtrl.bookForm = {$submitted: true}; // form is submitted
    // when
    errorMessage = bookDetailsCtrl.getErrorMessageOfField(field);
    // then
    expect(errorMessage).toEqual('Please provide a value');
  });

  it('saves the current book and goes to the overview dialog', inject(function (bookService:BookService) {
    // given
    var book;
    spyOn($stateMock, 'go');
    bookDetailsCtrl.bookForm = {$valid: true}; // form is valid
    // when
    bookDetailsCtrl.save();
    // then
    book = bookService.findOne(currentBook.id);
    expect(book).toEqual(currentBook);
    expect($stateMock.go).toHaveBeenCalledWith('book-overview');
  }));
});
