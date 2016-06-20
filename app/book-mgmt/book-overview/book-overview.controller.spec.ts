import 'angular';


describe('BookOverviewCtrl', function () {
  var bookOverviewCtrl, currentBooks;

  beforeEach(angular.mock.module('book-mgmt'));

  beforeEach(inject(function ($controller:any, $rootScope:any) {
    currentBooks = [{
      author: 'John Smith',
      title: 'AngularJS in a nutshell'
    }];
    bookOverviewCtrl = $controller('BookOverviewCtrl as bookOverviewCtrl', {
      $scope: $rootScope.$new(),
      currentBooks: currentBooks
    });
  }));

  it('exposes current books', function () {
    expect(bookOverviewCtrl.currentBooks).toBe(currentBooks);
  });

  it('exposes a method which checks if there are books to display', function () {
    expect(bookOverviewCtrl.thereAreBooksToDisplay()).toBeTruthy();
  });
});
