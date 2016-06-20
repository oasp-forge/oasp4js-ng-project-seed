export default class BookOverviewCtrl {
  constructor(private currentBooks:any) {
  }

  thereAreBooksToDisplay = function () {
    return this.currentBooks && this.currentBooks.length > 0;
  };
}
