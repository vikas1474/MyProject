// (function () {

//     var Book = function () {

//     };

//     Book.prototype.add = function (slots) {
//         var books = {};
//         book.push(slots);
//         localStorage.setItem('books', books);
//     }

// })();

(function (Module) {

    function Template() {
    }

  
    Template.gettemplate = function (tempname) {
        return $.ajax({
            url: '../views/templates/'+tempname,
            success: function (res) {
//                console.log(res);
            },
            error: function (err) {
//                console.log(err);
            }
        });
    }

    Module.Template = Template;

})(window.module || (window.module = {}));


(function (Module) {

    var Book = (function () {

        function Book() {
            Module.Template.call(this);
            this.bookdata=[];
    }
        Book.prototype.init = function () {            
            this.events();
        }

        Book.prototype.add = function() {
            var formdata=$('form').serializeArray();
            var obj={};
            for(var i in formdata){
                obj[formdata[i].name]=formdata[i].value;
            }            
            this.bookdata.push(obj);
            localStorage.setItem('books',this.bookdata);
        }

        Book.prototype.getBooks=function(){
            this.bookdata=[];
            try{
                if(localStorage.getItem("books")){
                    this.bookdata.push(localStorage.getItem("books"));
                }
            }catch(e){
                alert('Error when reading');
            }

            return this.bookdata;            
        }

        Book.prototype.openTemplate = function (tempname) {
            var html = Module.Template.gettemplate(tempname);            
            return html;
        }

        Book.prototype.events = function () {         

            $('.add').bind('click', function() {
                var htmldata=this.openTemplate('addtemplate.html');
                htmldata.then(function(resp){                    
                    $('.wrapper').append(resp); 
                });                
            }.bind(this));

            $('.wrapper').on('click','#add-template-form .btn-small',function(e){                
                this.add();    
            }.bind(this));


            $(document).on('click','.all_books',function(e){
                var allbooks=JSON.stringify(this.getBooks());
                var htmldata=this.openTemplate('allbook.html');
//                htmldata.then(function(resp){
                    var resp=$('#some-template').html();
                    var data={title:'vikas'};
                    var template = Handlebars.compile(resp);          
                    $('.wrapper').append(template(data)); 
  //              });                
            }.bind(this));
        }
        return Book;

    })();

    Module.Book = Book;


})(window.module || (window.module = {}));


$(document).ready(function () {
    var book = new module.Book();
    book.init();
});






