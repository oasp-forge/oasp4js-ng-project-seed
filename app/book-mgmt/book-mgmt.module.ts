import BookService from './book.service';
import BookDetailsCtrl from './book-details/book-details.controller';
import addBookDetailsStateDef from './book-details/book-details.state-def';
import BookOverviewCtrl from './book-overview/book-overview.controller';
import addBookOverviewStateDef from './book-overview/book-overview.state-def';

let bookMgmtModule:ng.IModule = angular.module('book-mgmt', ['ui.router'])
  .config(function ($stateProvider:ng.ui.IStateProvider) {
    addBookDetailsStateDef($stateProvider);
    addBookOverviewStateDef($stateProvider);
  })
  .service('bookService', BookService)
  .controller('BookDetailsCtrl', BookDetailsCtrl)
  .controller('BookOverviewCtrl', BookOverviewCtrl);

export default bookMgmtModule.name;
