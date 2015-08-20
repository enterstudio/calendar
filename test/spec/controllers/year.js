'use strict';

describe('Controller: YearCtrl', function () {

  // load the controller's module
  beforeEach(module('calendarApp', 'stateMock'));

  var YearCtrl, $q, $rootScope, scope, state, stateParams, location, anchorScroll, filter, window, timeout, utils, yearMock;

  var currentYear = new Date().getFullYear();

  var calendars = {};
  calendars[currentYear] = {year : currentYear, months : []};

  beforeEach(inject(function (_$q_, _$rootScope_, stateMock, _$filter_, _$window_, _$timeout_, _utils_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    state = stateMock;
    filter = _$filter_;
    window = _$window_;
    timeout = _$timeout_;
    utils = _utils_;
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    stateParams = {
      year : currentYear
    };

    yearMock = {
      query : function () { }
    };

    spyOn(yearMock, 'query').and.callFake(function (params) {
      return calendars[params.year];
    });

    YearCtrl = $controller('YearCtrl', {
      $scope        : scope,
      $state        : state,
      $stateParams  : stateParams,
      $location     : location,
      $anchorScroll : anchorScroll,
      $filter       : filter,
      $window       : window,
      $timeout      : timeout,
      utils         : utils,
      Year          : yearMock
    });
  }));

  describe('year models', function () {

    it('should have a current, previous and next year properties on the scope', function () {
      expect(scope.year).toBe(currentYear);
      expect(scope.previousYear).toBe(currentYear - 1);
      expect(scope.nextYear).toBe(currentYear + 1);
    });

    it('should add one to the year when next is called', function () {
      var initialYear = scope.year;
      scope.next();
      expect(scope.year).toBe(initialYear + 1);
    });

    it('should subtract one to the year when previous is called', function () {
      var initialYear = scope.year;
      scope.previous();
      expect(scope.year).toBe(initialYear - 1);
    });

    it('should have years defined on scope', function () {
      expect(scope.years).toBeDefined();
    });

    it('should have 151 items on years', function () {
      expect(scope.years.length).toBe(151);
    });

    it('should have current year return from showYear', function () {
      expect(scope.showYear()).toBe(currentYear);
    });

  });

  describe('calendar model', function () {

    it('should be defined', function () {
      expect(scope.calendar).toBeDefined();
    });

    it('should have current year\'s calendar as default', function () {
      expect(scope.calendar.year).toBe(currentYear);
    });

  });

  describe('state', function () {

    it('should transition to the updated year', function () {
      state.expectTransitionTo('year', {year: currentYear - 1});
      scope.previous();
      scope.$digest();
      state.ensureAllTransitionsHappened();
    });

  });

});