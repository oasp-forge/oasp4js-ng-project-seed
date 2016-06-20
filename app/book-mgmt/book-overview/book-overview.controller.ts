export default class BookOverviewCtrl {
  /* @ngInject */
  constructor(private currentBooks:any) {
  }

  thereAreBooksToDisplay = function () {
    return this.currentBooks && this.currentBooks.length > 0;
  };
}
