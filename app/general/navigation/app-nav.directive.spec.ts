import 'angular';

describe('Directive: app-nav', function () {
  var element;

  beforeEach(angular.mock.module('general'));

  beforeEach(inject(function ($compile:ng.ICompileService, $rootScope:ng.IRootScopeService) {
    element = $compile('<app-nav></app-nav>')($rootScope);
    $rootScope.$digest();
  }));

  it('adds navigation items', function () {
    var navItems = element.find('li'), bookOverviewItem, bookDetailsItem;
    expect(navItems.length).toBe(2);
    bookOverviewItem = navItems[0];
    expect(bookOverviewItem.textContent).toEqual('Book Overview');
    bookDetailsItem = navItems[1];
    expect(bookDetailsItem.textContent).toEqual('New Book');
  });
});
