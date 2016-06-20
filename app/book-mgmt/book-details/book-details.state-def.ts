import BookService from '../book.service';

export default function addBookDetailsStateDef($stateProvider:ng.ui.IStateProvider) {
  let bookIdParamName = 'bookId';
  $stateProvider.state('book-details', {
    url: '/book-mgmt/book/:' + bookIdParamName,
    templateUrl: 'book-mgmt/book-details/book-details.html',
    controller: 'BookDetailsCtrl',
    controllerAs: 'bookDetailsCtrl',
    resolve: {
      /* @ngInject */
      currentBook: function ($stateParams:ng.ui.IStateParamsService, $location:ng.ILocationService,
                             bookService:BookService) {
        let bookIdParamValue:string = $stateParams[bookIdParamName];
        if (bookIdParamValue) {
          let currentBook:any = bookService.findOne(parseInt(bookIdParamValue, 10));
          if (currentBook) {
            return currentBook;
          } else {
            $location.path('/book-mgmt/book/');
          }
        } else {
          return {};
        }
      }
    }
  });
};
