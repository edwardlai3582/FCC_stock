app.directive('chart', ['$window', 
  function($window) {

    return {
      restrict: 'E',
      template: '<canvas></canvas>',
      scope: {
        chartObject: "=value"
      },
      link: function (scope, element, attrs) {
        var canvas  = element.find('canvas')[0];
        var context = canvas.getContext('2d');
        var chart;

        
        chart = new Chart(context);

        scope.$watch(function(){ return element.attr('type'); }, function(value){
          if (!value) return;
          //var chartType = "Line";
          //chart[chartType](scope.chartObject.data, scope.chartObject.options);
            chart.Line(scope.chartObject.data, scope.chartObject.options);
        });

        //Update when charts data changes
        scope.$watch(function() { return scope.chartObject; }, function(value) {
          if (!value) return;
          //var chartType = "Line";
          //chart[chartType](scope.chartObject.data, scope.chartObject.options);
            chart.Line(scope.chartObject.data, scope.chartObject.options);
          if (scope.chartInstance) scope.chartInstance.destroy();
          //scope.chartInstance = chart[chartType](scope.chartObject.data, scope.chartObject.options);
            scope.chartInstance =chart.Line(scope.chartObject.data, scope.chartObject.options);
        }, true);
      }
    }    
}])