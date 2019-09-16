var mainApp = angular.module("mainApp", []);
         
  
mainApp.controller('DragDropController', function($scope) {
   $scope.lists = ['General Motors','Ford Motor Company','Microsoft','Infosys','Wipro'];
   $scope.draggedItem = '';

   $scope.onDragStart = function(index){
        console.log(index,'start');
         $scope.draggedItem = $scope.lists[index];
         $scope.lists[index] = '';
         $scope.$apply();
        
   }
   $scope.onDragEnd = function(index){
        console.log(index,'end');
        // if(index <= $scope.lists.length - 1){
            // $scope.lists.splice(index,0,$scope.draggedItem);
            $scope.lists[index] = $scope.draggedItem;
        // }else{
        //     $scope.lists,push($scope.draggedItem);
        // }
        
        $scope.$apply();
       
   }
   $scope.onDragOver = function(index){
        console.log(index,'over');
   }
   $scope.onDropComplete = function(data){
        console.log(data);
   }
});


mainApp.directive('ngDrag', ngDrag);
mainApp.directive('ngDrop', ngDrop);

function ngDrop() {
    var directive = {
        scope: {
            index:'=?',
            onDropSuccess:'&'
        },
        restrict: 'AE',
        link:link
    };
    return directive;
    function link(scope, element, attrs) {
        element.on('dragover', function dragover(ev) {
            // console.log("drag over");
            ev.preventDefault();
        });
        element.on('dragleavee', function dragover(ev) {
            // console.log("drag leave",element[0]);
            ev.preventDefault();
            $(element[0]).parent().find('.draggableBox').removeClass('showindicator')
        });
        element.on('drop', function drop(ev) {
            // console.log("drop",ev);
            ev.preventDefault();
            $(element[0]).find('.draggableBox').removeClass('showindicator')
            scope.onDropSuccess();
        });
    }
};

function ngDrag() {
    var directive = {
        scope: {
            index:'=',
            onDragSuccess:'&',
            onDragEnd:'&',
            onDragOver:'&?'
        },
        restrict: 'AE',
        link:link
    };
    return directive;
    function link(scope, element, attrs) {
        element.on('dragstart',function(){
            scope.onDragSuccess();
        });
        element.on('dragend',function(){
            $(element[0]).parent().find('.draggableBox').removeClass('showindicator');
            scope.onDragEnd();
        });
        element.on('dragover', function dragover(ev) {
            ev.preventDefault();
            $(element[0]).parent().find('.draggableBox').removeClass('showindicator');
            $(element[0]).addClass('showindicator');
            if(!angular.isUndefined(attrs.onDragOver)){
                scope.onDragOver();
            }
        });
        element.on('dragleavee', function dragover(ev) {
            ev.preventDefault();
            $(element[0]).parent().find('.draggableBox').removeClass('showindicator')
        });
    }
};
