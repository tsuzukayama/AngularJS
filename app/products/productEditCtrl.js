/**
 * Created by tiago.tripletech on 11/01/2017.
 */
(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
        ["product", "$state", "productService",
            ProductEditCtrl]);

    function ProductEditCtrl(product, $state, productService){
        var vm = this;

        vm.product = product;
        vm.priceOption = "percent";

        vm.marginPercent = function () {
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost);
        }
        if(vm.product && vm.product.productId){
            vm.title = "Edit: " + vm.product.productName;
        }
        else{
            vm.title = "New Product"
        }

        vm.calculatePrice = function () {
            var price = 0;

            if(vm.priceOption == 'amount'){
                price = productService.calculatePriceFromAmount(vm.product.cost, vm.markupAmount);
            }

            if(vm.priceOption == 'percent'){
                price = productService.calculatePriceFromPercent(vm.product.cost,vm.markupPercent);
            }

            vm.product.price = price;
        };
        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        };

        vm.submit = function (isValid) {
            if(isValid){
                vm.product.$save(function (data) {
                    toastr.success("Save Successful");
                });
            }else{
                alert("correct errors");
            }

        }

        vm.cancel = function () {
            $state.go('productList');
        }

        vm.addTags = function (tags) {
            if(tags){
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newtags = "";
            }else{
                alert("separated by commas");
            }
        }

        vm.removeTag = function (idx) {
            vm.product.tags.splice(idx,1);
        }
    }
}());