ToDo=Backbone.Model.extend({initialize:function(){this.on("change",function(){})},idAttribute:"_id"}),ToDoCollection=Backbone.Collection.extend({model:ToDo,url:"http://tiny-pizza-server.herokuapp.com/collections/MD-toDoList"}),ToDoView=Backbone.View.extend({className:"all-the-tasks",template:_.template($(".to-do-list").text()),editTemplate:_.template($(".to-do-list-edit").text()),events:{"click .edit-task":"editTask","click .finished-edit":"finishedEdit","click .remove-task":"deleteTask"},initialize:function(){console.log(this),this.listenTo(this.model,"change",this.render),$(".container").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);this.$el.html(a)},editTask:function(){var a=this.editTemplate(this.model.attributes);this.$el.html(a)},finishedEdit:function(){$(".finished-edit-input").val();var a=this.template(this.model.attributes);this.$el.html(a)},deleteTask:function(){this.model.destroy(),this.remove()}});var toDoTasks=new ToDoCollection;toDoTasks.fetch().done(function(){toDoTasks.each(function(a){new ToDoView({model:a})})}),$(".submit-task").click(function(){var a=new ToDoCollection,b=$(".task-input").val();a.create({task:b}),console.log(a),new ToDoView({model:this.model})});