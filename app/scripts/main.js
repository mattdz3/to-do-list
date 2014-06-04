ToDo = Backbone.Model.extend({

	initialize: function() {
		this.on('change', function() {
			//the future is now!
		});
	},

	idAttribute: '_id',
})

ToDoCollection = Backbone.Collection.extend({

	model: ToDo,

	url: 'http://tiny-pizza-server.herokuapp.com/collections/MD-toDoList',
})

ToDoView = Backbone.View.extend({

	template: _.template($('.to-do-list').text()),
	editTemplate: _.template($('.to-do-list-edit').text()),

	events: {
		"click .submit-task" : "addTask",
		"click .edit-task" : "editTask",
		"click .remove-task" : "deleteTask",
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render),
		$('.container').append(this.el)
		this.render();
	},

	render: function() {
		var renderTemp = this.template(this.model.attributes)
		this.$el.html(renderTemp);
	},

	addTask: function(){
		var add = $('.task-input').val();
		$('.task-input').val('');
		render(add);

	},

	editTask: function() {
		var renderTemp = this.editTemplate(this.model.attributes)
		this.$el.html(renderTemp);
	},

	deleteTask: function() {++
		this.model.destroy();
		this.remove();
	},
})

var toDoTasks = new ToDoCollection();

toDoTasks.fetch().done(function() {
	toDoTasks.each(function(task) {
		new ToDoView({model: task});
	})
});





