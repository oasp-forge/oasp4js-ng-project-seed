export default class BookService {
  private books:any[] = [];
  private sequencer:number = 1;

  findOne(id:number):any {
    var originalBook = this.findById(id);
    if (originalBook) {
      return angular.copy(originalBook, {});
    }
  }

  save(bookToSave:any) {
    var originalBook;
    if (bookToSave.id) {
      originalBook = this.findById(bookToSave.id);
      if (originalBook) {
        angular.copy(bookToSave, originalBook);
      }
    } else {
      bookToSave.id = this.sequencer++;
      this.books.push(bookToSave);
    }
  }

  findAll() {
    return this.books;
  }

  private findById(id:number):any {
    var i = 0;
    for (; i < this.books.length; i++) {
      if (this.books[i].id === id) {
        return this.books[i];
      }
    }
  };
}
